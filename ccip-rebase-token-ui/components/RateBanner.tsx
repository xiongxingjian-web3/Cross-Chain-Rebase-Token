"use client";

import { Card } from "@/components/ui/Card";
import useRbtBalance from "@/hoos/useRbtBalance";
import { type NetworkId } from "@/contracts/constants";
import { useAccount } from "wagmi";

function Skeleton() {
  return (
    <span className="inline-block h-6 w-28 animate-pulse rounded-md bg-emerald-100" />
  );
}

interface RateBannerProps {
  network: NetworkId;
}

export function RateBanner({ network }: RateBannerProps) {
  const { isConnected } = useAccount();
  const { interestRate, userInterestRate, isLoading } = useRbtBalance(network);
  const loading = isConnected && isLoading;
  const show = (value?: string) => (isConnected ? value : undefined);
  const globalRate = show(interestRate);
  const lockedRate = show(userInterestRate);
  const hasInterestRate =
    !loading && globalRate != null && globalRate !== "";
  const hasUserInterestRate =
    !loading && lockedRate != null && lockedRate !== "";

  return (
    <Card className="!py-4">
      <div className="grid items-center gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            %
          </span>
          <div>
            <p className="text-xs text-slate-500">全局利率</p>
            <p
              className={`mt-0.5 font-mono text-lg font-semibold tabular-nums ${
                hasInterestRate ? "text-emerald-600" : "text-slate-800"
              }`}
            >
              {loading ? <Skeleton /> : globalRate ?? "—"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:justify-center">
          <div className="hidden h-8 w-px bg-[#e2efe6] sm:block" />
          <div>
            <p className="text-xs text-slate-500">您的锁定利率</p>
            <p
              className={`mt-0.5 font-mono text-lg font-semibold tabular-nums ${
                hasUserInterestRate ? "text-emerald-600" : "text-slate-800"
              }`}
            >
              {loading ? <Skeleton /> : lockedRate ?? "—"}
            </p>
          </div>
        </div>
        <p className="text-center text-[11px] leading-relaxed text-slate-400 sm:text-right">
          balanceOf 含应计利息，随区块时间更新
        </p>
      </div>
    </Card>
  );
}
