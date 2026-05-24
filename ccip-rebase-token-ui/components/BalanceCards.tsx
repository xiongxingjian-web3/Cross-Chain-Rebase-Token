"use client";

import { Card } from "@/components/ui/Card";
import { CONTRACTS, NETWORKS, TOKEN, type NetworkId } from "@/contracts/constants";
import useDeposit from "@/hoos/useDeposit";
import useRbtBalance from "@/hoos/useRbtBalance";
import { formatAmount } from "@/hoos/tokenAmount";
import { useAccount, useBalance } from "wagmi";
export interface BalanceDisplay {
  EthBalance?: number;
  rbt?: string;
  principal?: string;
  userRate?: string;
  link?: string;
}

interface BalanceCardsProps {
  network: NetworkId;
  balances?: BalanceDisplay;
  loading?: boolean;
}

function Skeleton() {
  return (
    <span className="inline-block h-7 w-24 animate-pulse rounded-md bg-emerald-100" />
  );
}

function Stat({
  label,
  value,
  sub,
  loading,
}: {
  label: string;
  value?: string;
  sub?: string;
  loading?: boolean;
}) {
  const hasValue = !loading && value != null && value !== "";
  return (
    <Card fill className="!p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p
        className={`mt-2 min-h-[32px] font-mono text-2xl font-semibold tabular-nums ${
          hasValue ? "text-emerald-600" : "text-slate-800"
        }`}
      >
        {loading ? <Skeleton /> : value ?? "—"}
      </p>
      {sub && <p className="mt-auto pt-1 text-xs text-slate-400">{sub}</p>}
    </Card>
  );
}

export function BalanceCards({
  network,
  loading,
}: BalanceCardsProps) {
  const { address, isConnected } = useAccount();
  const { EthBalance, isLoading: ethLoading } = useDeposit();
  const {
    rbtBalance,
    principleBalance,
    isLoading: rbtLoading,
  } = useRbtBalance(network);
  const { data: linkBalance, isFetching: linkLoading } = useBalance({
    address,
    token: CONTRACTS[network].link as `0x${string}`,
    chainId: NETWORKS[network].chainId,
    query: { enabled: isConnected },
  });

  const show = (value?: string) => (isConnected ? value : undefined);
  const linkDisplay = show(formatAmount(linkBalance?.value));

  return (
    <div className="grid grid-cols-2 items-stretch gap-3 lg:grid-cols-4">
      <Stat
        label="ETH 余额"
        value={show(EthBalance)}
        sub="Sepolia 原生币"
        loading={isConnected && (ethLoading || !!loading)}
      />
      <Stat
        label={`${TOKEN.symbol} 余额`}
        value={show(rbtBalance)}
        sub="含应计利息"
        loading={isConnected && (rbtLoading || !!loading)}
      />
      <Stat
        label="本金"
        value={show(principleBalance)}
        sub="principleBalanceOf"
        loading={isConnected && (rbtLoading || !!loading)}
      />
      <Stat
        label="LINK 余额"
        value={linkDisplay}
        sub="当前可用于支付 CCIP 手续费"
        loading={isConnected && (linkLoading || !!loading)}
      />
    </div>
  );
}
