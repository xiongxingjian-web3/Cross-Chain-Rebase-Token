// lib/contracts.ts（示意）
import {
  ABI,
  CONTRACTS,
  NETWORKS,
  type NetworkId,
} from "@/contracts/constants";

export function getRebaseTokenContract(network: NetworkId) {
  if (network !== "sepolia" && network !== "zksyncSepolia") {
    throw new Error(
      `Invalid network: ${String(
        network
      )}. Expected "sepolia" or "zksyncSepolia".`
    );
  }
  const contracts = CONTRACTS[network];
  const abi =
    network === "sepolia"
      ? ABI.sepoliaRebaseTokenAbi
      : ABI.zksyncRebaseTokenAbi;
  return {
    address: contracts.rebaseToken,
    abi,
    chainId: NETWORKS[network].chainId,
  } as const;
}

export function getNetworkIdFromChainId(
  chainId?: number
): NetworkId | undefined {
  if (chainId === 11155111) return "sepolia";
  if (chainId === 300) return "zksyncSepolia";
  return undefined;
}
// export function getVaultContract() {
//   return {
//     address: CONTRACTS.sepolia.vault,
//     abi: ABI.sepoliaVaultAbi,
//     chainId: NETWORKS.sepolia.chainId,
//   } as const;
// }
