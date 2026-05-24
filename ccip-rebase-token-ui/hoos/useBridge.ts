import {
  CCIP_EXPLORER,
  CONTRACTS,
  NETWORKS,
  TOKEN,
  type NetworkId,
} from "@/contracts/constants";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { erc20Abi } from "viem";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import config from "../rainbowKit";
import {
  buildBridgeMessage,
  CCIP_SEND_GAS_LIMIT,
  getCcipRouterContract,
  getDestinationChainSelector,
  getDestinationNetwork,
} from "./ccip";
import { useState } from "react";
import { useActivity } from "./ActivityProvider";
import { formatAmount, parseAmount } from "./tokenAmount";

/** CCIP OnRamp 发出的消息事件（与 Sepolia 实测日志一致） */
const CCIP_MSG_SENT_TOPIC =
  "0x192442a2b2adb6a7948f097023cb6b57d29d3a7a5dd33e6666d33c39cc456f32";

function tryParseCcipMessageId(
  logs: { topics: readonly `0x${string}`[]; data?: `0x${string}` }[]
): `0x${string}` | undefined {
  const hit = logs.find((l) => l.topics[0] === CCIP_MSG_SENT_TOPIC);
  if (!hit?.data || hit.data.length < 130) return undefined;
  return `0x${hit.data.slice(66, 130)}`;
}

export function useBridge() {
  const [feeEstimate, setFeeEstimate] = useState<string | undefined>();
  const { addActivity, updateActivity } = useActivity();
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const handleBridge = async (amount: string, network: NetworkId) => {
    if (!address) {
      console.error("钱包未连接");
      return;
    }

    const displayAmount = amount.trim();
    const destNetwork = getDestinationNetwork(network);
    const sourceName = NETWORKS[network].shortName;
    const destName = NETWORKS[destNetwork].shortName;
    let activityId: string | null = null;

    try {
      activityId = addActivity({
        type: "bridge",
        title: `跨链 ${displayAmount} ${TOKEN.symbol}`,
        detail: `${sourceName} → ${destName} · 处理中…`,
        status: "pending",
      });
      const targetChainId = NETWORKS[network].chainId;

      if (chainId !== targetChainId) {
        console.log(`切换网络至 ${sourceName}（chainId ${targetChainId}）...`);
        await switchChainAsync({ chainId: targetChainId });
      }

      const amountWei = parseAmount(displayAmount);
      const router = getCcipRouterContract(network);
      const routerAddress = router.address;

      const evm2AnyMessage = buildBridgeMessage({
        sourceNetwork: network,
        receiverAddress: address,
        amountWei,
      });
      const destChainSelector = getDestinationChainSelector(network);

      console.log(
        `📤 开始跨链：${displayAmount} ${
          TOKEN.symbol
        }（${amountWei.toString()} wei）` + `，${sourceName} → ${destName}`
      );

      const fee = await readContract(config, {
        chainId: targetChainId,
        address: routerAddress,
        abi: router.abi,
        functionName: "getFee",
        args: [destChainSelector, evm2AnyMessage],
      });
      const feeDisplay = formatAmount(fee) ?? "0";
      setFeeEstimate(`${feeDisplay} LINK`);
      console.log(
        `预估手续费：${feeDisplay} LINK（链上 ${fee.toString()} wei）`
      );

      const { rebaseToken: rebaseTokenAddress, link: linkTokenAddress } =
        CONTRACTS[network];

      // 每笔交易必须等链上确认后再发下一笔，否则 ccipSend 时 allowance 可能还未生效
      console.log(`⏳ 请在钱包确认：授权 LINK ${feeDisplay}...`);
      const linkApproveHash = await writeContractAsync({
        chainId: targetChainId,
        address: linkTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [routerAddress, fee],
      });
      await waitForTransactionReceipt(config, {
        hash: linkApproveHash,
        chainId: targetChainId,
      });
      console.log(`✅ LINK 授权已确认：${feeDisplay} LINK`);

      console.log(`⏳ 请在钱包确认：授权 RBT ${displayAmount}...`);
      const rbtApproveHash = await writeContractAsync({
        chainId: targetChainId,
        address: rebaseTokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [routerAddress, amountWei],
      });
      await waitForTransactionReceipt(config, {
        hash: rbtApproveHash,
        chainId: targetChainId,
      });
      console.log(`✅ RBT 授权已确认：${displayAmount} ${TOKEN.symbol}`);

      console.log(`⏳ 请在钱包确认：发起跨链 ccipSend...`);
      const hash = await writeContractAsync({
        chainId: targetChainId,
        address: routerAddress,
        abi: router.abi,
        functionName: "ccipSend",
        args: [destChainSelector, evm2AnyMessage],
        // 避免 RPC/钱包把 gas 估得过高而拒绝提交
        gas: CCIP_SEND_GAS_LIMIT,
      });
      const receipt = await waitForTransactionReceipt(config, {
        hash,
        chainId: targetChainId,
      });
      const messageId = tryParseCcipMessageId(receipt.logs);

      console.log(
        `✅ 源链交易已确认：${displayAmount} ${TOKEN.symbol} 已从 ${sourceName} 发出`
      );
      console.log(
        `ℹ️ 源链 RBT 减少是正常销毁（不是丢失），到账需 CCIP 在 ${destName} 铸造，通常 5–20 分钟`
      );
      console.log(`   交易哈希：${hash}`);
      if (messageId) {
        console.log(`   messageId：${messageId}`);
        console.log(`   CCIP Explorer：${CCIP_EXPLORER}/msg/${messageId}`);
      } else {
        console.log(`   CCIP Explorer：${CCIP_EXPLORER}（用源链 tx 搜索）`);
      }

      const destChainId = NETWORKS[destNetwork].chainId;
      if (chainId !== destChainId) {
        console.log(`↪ 正在切换钱包至 ${destName}，便于查看目标链 RBT 余额...`);
        await switchChainAsync({ chainId: destChainId });
      }
      console.log(
        `⏳ 请在页面顶部选择「${destName}」并刷新余额；若仍为 0，请等待 CCIP 完成后再查`
      );

      if (activityId) {
        const detail = messageId
          ? `${sourceName}→${destName} · 源链已确认 · CCIP 约 5–20 分钟 · ${messageId.slice(0, 10)}…`
          : `${sourceName}→${destName} · 源链已确认 · ${hash.slice(0, 10)}…`;
        updateActivity(activityId, {
          status: "success",
          title: `跨链 ${displayAmount} ${TOKEN.symbol}`,
          detail,
        });
      }
      setFeeEstimate(undefined);
    } catch (error) {
      console.error(
        `跨链失败（${displayAmount} ${TOKEN.symbol}，${sourceName} → ${destName}）`,
        error
      );
      if (activityId) {
        updateActivity(activityId, {
          status: "failed",
          detail: `${sourceName} → ${destName} · 已取消或失败`,
        });
      }
    }
  };

  return { handleBridge, feeDisplay: feeEstimate };
}
