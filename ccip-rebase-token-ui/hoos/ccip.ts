import { CONTRACTS, NETWORKS, type NetworkId } from "@/contracts/constants";
import { concat, encodeAbiParameters, type Address, type Hex } from "viem";

/** Chainlink Client.EVM_EXTRA_ARGS_V1_TAG */
const EVM_EXTRA_ARGS_V1_TAG = "0x97a657c9" as const;

/** CCIP Router 最小 ABI（getFee / ccipSend / isChainSupported） */
export const CCIP_ROUTER_ABI = [
  {
    type: "function",
    name: "getFee",
    stateMutability: "view",
    inputs: [
      { name: "destinationChainSelector", type: "uint64" },
      {
        name: "message",
        type: "tuple",
        components: [
          { name: "receiver", type: "bytes" },
          { name: "data", type: "bytes" },
          {
            name: "tokenAmounts",
            type: "tuple[]",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
            ],
          },
          { name: "feeToken", type: "address" },
          { name: "extraArgs", type: "bytes" },
        ],
      },
    ],
    outputs: [{ name: "fee", type: "uint256" }],
  },
  {
    type: "function",
    name: "ccipSend",
    stateMutability: "payable",
    inputs: [
      { name: "destinationChainSelector", type: "uint64" },
      {
        name: "message",
        type: "tuple",
        components: [
          { name: "receiver", type: "bytes" },
          { name: "data", type: "bytes" },
          {
            name: "tokenAmounts",
            type: "tuple[]",
            components: [
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
            ],
          },
          { name: "feeToken", type: "address" },
          { name: "extraArgs", type: "bytes" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes32" }],
  },
  {
    type: "function",
    name: "isChainSupported",
    stateMutability: "view",
    inputs: [{ name: "destChainSelector", type: "uint64" }],
    outputs: [{ name: "supported", type: "bool" }],
  },
] as const;

export type Evm2AnyMessage = {
  receiver: Hex;
  data: Hex;
  tokenAmounts: readonly { token: Address; amount: bigint }[];
  feeToken: Address;
  extraArgs: Hex;
};

export type BuildBridgeMessageParams = {
  sourceNetwork: NetworkId;
  receiverAddress: Address;
  amountWei: bigint;
};

/** 源链 → 目标链 */
export function getDestinationNetwork(source: NetworkId): NetworkId {
  return source === "sepolia" ? "zksyncSepolia" : "sepolia";
}

/** 目标链 CCIP chainSelector（uint64） */
export function getDestinationChainSelector(source: NetworkId): bigint {
  const dest = getDestinationNetwork(source);
  return BigInt(NETWORKS[dest].ccipSelector);
}

/**钱包地址 abi.encode(address) — 与 Solidity BridgeTokensScript 一致 */
export function encodeReceiver(receiverAddress: Address): Hex {
  return encodeAbiParameters([{ type: "address" }], [receiverAddress]);
}

/**
 * 目标链执行 gas（写入 extraArgs）。
 * 不要用 0：浏览器钱包估算 ccipSend 时可能报 "gas limit too high"。
 */
export function getDestinationExecGasLimit(destNetwork: NetworkId): bigint {
  return destNetwork === "zksyncSepolia" ? 300_000n : 200_000n;
}

/** 源链 ccipSend 交易 gas 上限（Sepolia 实测约 253k） */
export const CCIP_SEND_GAS_LIMIT = 400_000n;

/** Client._argsToBytes(EVMExtraArgsV1({ gasLimit })) */
export function encodeExtraArgsV1(gasLimit: bigint): Hex {
  const encoded = encodeAbiParameters(
    [{ type: "uint256", name: "gasLimit" }],
    [gasLimit]
  );
  return concat([EVM_EXTRA_ARGS_V1_TAG, encoded]);
}

/**
 * 组装 ccipSend / getFee 共用的 EVM2AnyMessage。
 * 逻辑对齐 script/BridgeTokens.s.sol。
 */
export function buildBridgeMessage({
  sourceNetwork,
  receiverAddress,
  amountWei,
}: BuildBridgeMessageParams): Evm2AnyMessage {
  const { rebaseToken, link } = CONTRACTS[sourceNetwork];
  const destNetwork = getDestinationNetwork(sourceNetwork);
  const destGasLimit = getDestinationExecGasLimit(destNetwork);

  return {
    receiver: encodeReceiver(receiverAddress),
    data: "0x",
    tokenAmounts: [{ token: rebaseToken, amount: amountWei }],
    feeToken: link,
    extraArgs: encodeExtraArgsV1(destGasLimit),
  };
}

/** 源链 Router 合约配置，供 wagmi readContract / writeContract 使用 */
export function getCcipRouterContract(sourceNetwork: NetworkId) {
  return {
    address: CONTRACTS[sourceNetwork].ccipRouter,
    abi: CCIP_ROUTER_ABI,
    chainId: NETWORKS[sourceNetwork].chainId,
  } as const;
}
