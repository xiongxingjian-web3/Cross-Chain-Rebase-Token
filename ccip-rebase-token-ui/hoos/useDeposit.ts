import { ABI, CONTRACTS } from "@/contracts/constants";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useActivity } from "./ActivityProvider";
import { formatAmount, parseAmount } from "./tokenAmount";
import { getRbtBalanceReadContracts } from "./useRbtBalance";

export default function useDeposit() {
  const { address } = useAccount();
  const { addActivity, updateActivity } = useActivity();
  const [lastAmount, setLastAmount] = useState<string | null>(null);
  const [activityId, setActivityId] = useState<string | null>(null);
  const { writeContractAsync, data: depositHash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  const {
    data: balanceData,
    isFetching,
    refetch: refetchBalance,
  } = useBalance({
    address: address,
  });

  const { refetch: refetchRbtOnChain } = useReadContracts({
    contracts: getRbtBalanceReadContracts("sepolia", address),
    query: { enabled: Boolean(address) },
  });

  useEffect(() => {
    if (isConfirmed && lastAmount && activityId) {
      void refetchBalance();
      void refetchRbtOnChain();
      const shortHash = depositHash
        ? `${depositHash.slice(0, 10)}…`
        : undefined;
      updateActivity(activityId, {
        status: "success",
        title: `存款 ${lastAmount} ETH`,
        detail: shortHash ? `已确认 · ${shortHash}` : `已存入 ${lastAmount} ETH`,
      });
      console.log(`✅ 存款成功！已存入 ${lastAmount} ETH`);
      setLastAmount(null);
      setActivityId(null);
    }
  }, [
    isConfirmed,
    lastAmount,
    activityId,
    depositHash,
    refetchBalance,
    refetchRbtOnChain,
    updateActivity,
  ]);

  const handleDeposit = async (amount: string) => {
    if (!address) {
      console.error("钱包未连接");
      return;
    }
    const displayAmount = amount.trim();
    let id: string | null = null;
    try {
      const amountWei = parseAmount(displayAmount);
      id = addActivity({
        type: "deposit",
        title: `存款 ${displayAmount} ETH`,
        detail: "等待链上确认…",
        status: "pending",
      });
      setLastAmount(displayAmount);
      setActivityId(id);
      console.log(
        `📤 已提交存款 ${displayAmount} ETH（链上 ${amountWei.toString()} wei），等待确认...`
      );
      await writeContractAsync({
        address: CONTRACTS.sepolia.vault,
        abi: ABI.sepoliaVaultAbi,
        functionName: "deposit",
        value: amountWei,
      });
    } catch (error) {
      console.error("存款失败", error);
      if (id) {
        updateActivity(id, {
          status: "failed",
          detail: "交易已取消或失败",
        });
      }
      setLastAmount(null);
      setActivityId(null);
    }
  };

  return {
    EthBalance: address ? formatAmount(balanceData?.value) : undefined,
    isLoading: Boolean(address && (isFetching || isConfirming)),
    isConfirmed,
    handleDeposit,
  };
}
