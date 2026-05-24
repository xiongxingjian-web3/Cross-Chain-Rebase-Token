"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { NETWORKS, type NetworkId } from "@/contracts/constants";
import { getNetworkIdFromChainId } from "./contracts";

/**
 * 将 UI 网络 tab 与钱包链同步：
 * - 钱包切链 → tab 跟随
 * - 点击 tab → 已连接时调用 switchChain
 */
export function useSyncedNetwork(defaultNetwork: NetworkId = "sepolia") {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [network, setNetworkState] = useState<NetworkId>(defaultNetwork);

  useEffect(() => {
    if (!isConnected) return;
    const id = getNetworkIdFromChainId(chainId);
    if (id) setNetworkState(id);
  }, [chainId, isConnected]);

  const setNetwork = useCallback(
    (id: NetworkId) => {
      setNetworkState(id);
      if (!isConnected) return;
      const targetChainId = NETWORKS[id].chainId;
      if (chainId !== targetChainId) {
        switchChain({ chainId: targetChainId });
      }
    },
    [isConnected, chainId, switchChain]
  );

  return { network, setNetwork, isSwitchingChain: isPending };
}
