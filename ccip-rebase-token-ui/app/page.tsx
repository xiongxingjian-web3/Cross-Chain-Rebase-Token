"use client";

import { ActivityFeed } from "@/components/ActivityFeed";
import { BalanceCards } from "@/components/BalanceCards";
import { BridgePanel } from "@/components/BridgePanel";
import { ContractInfo } from "@/components/ContractInfo";
import { DepositPanel } from "@/components/DepositPanel";
import { Header } from "@/components/Header";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { RateBanner } from "@/components/RateBanner";
import { RedeemPanel } from "@/components/RedeemPanel";
import { NETWORKS, type NetworkId } from "@/contracts/constants";
import { useActivity } from "@/hoos/ActivityProvider";
import { useBridge } from "@/hoos/useBridge";
import useDeposit from "@/hoos/useDeposit";
import useRedeem from "@/hoos/useRedeem";
import { useSyncedNetwork } from "@/hoos/useSyncedNetwork";
import { useState } from "react";
export default function Home() {
  const { network, setNetwork } = useSyncedNetwork("sepolia");
  const [bridgeSource, setBridgeSource] = useState<NetworkId>("sepolia");
  const { handleDeposit } = useDeposit();
  const { handleRedeem } = useRedeem();
  const { items: activityItems } = useActivity();
  const { handleBridge, feeDisplay } = useBridge();
  const isSepolia = network === "sepolia";

  function handleSwapBridge() {
    setBridgeSource((s) => (s === "sepolia" ? "zksyncSepolia" : "sepolia"));
  }

  return (
    <div className="relative min-h-screen bg-[#f4faf6]">
      <Background />
      <Header />

      <main className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6">
        {/* 标题区 */}
        <section className="mb-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Sepolia ↔ ZKsync Sepolia
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            跨链 Rebase 代币
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            在 Sepolia 存入 ETH 铸造 RBT，通过 Chainlink CCIP 跨链至 ZKsync，
            余额随时间线性计息。
          </p>
        </section>

        {/* 网络切换 */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <NetworkSwitcher active={network} onChange={setNetwork} />
          <p className="text-xs text-slate-400">
            Chain ID {NETWORKS[network].chainId} · {NETWORKS[network].name}
          </p>
        </div>

        {/* 余额 + 利率 */}
        <section className="mb-6 space-y-3">
          <BalanceCards network={network} />
          <RateBanner network={network} />
        </section>

        {/* 主操作区：左 2/3 右 1/3，等高对齐 */}
        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="grid items-stretch gap-5 md:grid-cols-2">
              <div
                className={`h-full transition-opacity duration-300 ${
                  isSepolia ? "opacity-100" : "pointer-events-none opacity-45"
                }`}
              >
                <DepositPanel disabled={!isSepolia} onDeposit={handleDeposit} />
              </div>
              <div
                className={`h-full transition-opacity duration-300 ${
                  isSepolia ? "opacity-100" : "pointer-events-none opacity-45"
                }`}
              >
                <RedeemPanel disabled={!isSepolia} onRedeem={handleRedeem} />
              </div>
            </div>

            <BridgePanel
              source={bridgeSource}
              onSwapDirection={handleSwapBridge}
              onBridge={(amount) => handleBridge(amount, bridgeSource)}
              feeEstimate={feeDisplay}
            />
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-rows-[auto_1fr]">
            <ContractInfo network={network} />
            <ActivityFeed items={activityItems} />
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e2efe6] py-5 text-center text-xs text-slate-400">
        RBT · Rebase Token · CCIP Testnet
      </footer>
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-[#f4faf6]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(167,243,208,0.35),transparent)]" />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c5e8d4 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      >
        {" "}
      </div>
    </>
  );
}
