import { NetworkId } from "@/contracts/constants";
import { useAccount, useReadContracts } from "wagmi";
import { getRebaseTokenContract } from "./contracts";
import { formatAmount } from "./tokenAmount";

const PRECISION = 10n ** 18n;

/** 链上利率系数 → 「0.000005% / 秒」（rate/1e18×100，单位：每秒百分比） */
export function formatRatePerSecondPercent(
  rate: bigint | undefined,
  opts?: { treatZeroAsEmpty?: boolean }
): string | undefined {
  if (rate === undefined) return undefined;
  if (opts?.treatZeroAsEmpty && rate === 0n) return undefined;
  const pctScaled = (rate * 100_000_000n) / PRECISION;
  if (pctScaled === 0n) return "0% / 秒";
  const pct = Number(pctScaled) / 1_000_000;
  const formatted = pct.toFixed(6).replace(/\.?0+$/, "");
  return `${formatted}% / 秒`;
}

/** 与 useRbtBalance 共用 readContracts 查询 key，供 deposit/redeem 后 refetch */
export function getRbtBalanceReadContracts(
  network: NetworkId,
  userAddress?: `0x${string}`
) {
  const rbtContract = getRebaseTokenContract(network);
  const args = userAddress ? [userAddress] : undefined;
  return [
    { ...rbtContract, functionName: "balanceOf" as const, args },
    { ...rbtContract, functionName: "principleBalanceOf" as const, args },
    { ...rbtContract, functionName: "getInterestRate" as const, args: [] },
    { ...rbtContract, functionName: "getUserInterestRate" as const, args },
  ];
}

export default function useRbtBalance(network: NetworkId) {
  const { address } = useAccount();

  const result = useReadContracts({
    contracts: getRbtBalanceReadContracts(network, address),
    query: {
      enabled: true,
    },
  });

  const rbtBalance =
    result.data?.[0]?.status === "success" ? result.data[0].result : undefined;
  const principleBalance =
    result.data?.[1]?.status === "success" ? result.data[1].result : undefined;
  const interestRate =
    result.data?.[2]?.status === "success" ? result.data[2].result : undefined;
  const userInterestRate =
    result.data?.[3]?.status === "success" ? result.data[3].result : undefined;
  return {
    rbtBalance: address ? formatAmount(rbtBalance) : undefined,
    principleBalance: address ? formatAmount(principleBalance) : undefined,
    interestRate: address
      ? formatRatePerSecondPercent(interestRate)
      : undefined,
    userInterestRate: address
      ? formatRatePerSecondPercent(userInterestRate, { treatZeroAsEmpty: true })
      : undefined,
    isLoading: Boolean(address && (result.isLoading || result.isFetching)),
  };
}
