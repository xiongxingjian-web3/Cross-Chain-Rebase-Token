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
import { parseAmount } from "./tokenAmount";
import { getRbtBalanceReadContracts } from "./useRbtBalance";

export default function useRedeem() {
  const { address } = useAccount();
  const { addActivity, updateActivity } = useActivity();
  const [lastAmount, setLastAmount] = useState<string | null>(null);
  const [activityId, setActivityId] = useState<string | null>(null);

  const {
    writeContractAsync,
    data: redeemHash,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: redeemHash,
    });

  const { refetch: refetchEthBalance } = useBalance({ address });
  const { refetch: refetchRbtOnChain } = useReadContracts({
    contracts: getRbtBalanceReadContracts("sepolia", address),
    query: { enabled: Boolean(address) },
  });

  useEffect(() => {
    if (isConfirmed && lastAmount && activityId) {
      const shortHash = redeemHash ? `${redeemHash.slice(0, 10)}…` : undefined;
      updateActivity(activityId, {
        status: "success",
        title: `赎回 ${lastAmount} RBT`,
        detail: shortHash
          ? `已确认 · ETH 已退回 · ${shortHash}`
          : `已赎回 ${lastAmount} RBT`,
      });
      console.log(`✅ 赎回成功！已赎回 ${lastAmount} RBT，ETH 将回到钱包`);
      void refetchEthBalance();
      void refetchRbtOnChain();
      setLastAmount(null);
      setActivityId(null);
    }
  }, [
    isConfirmed,
    lastAmount,
    activityId,
    redeemHash,
    refetchEthBalance,
    refetchRbtOnChain,
    updateActivity,
  ]);

  const handleRedeem = async (amount: string) => {
    if (!address) {
      console.error("钱包未连接");
      return;
    }
    const displayAmount = amount.trim();
    let id: string | null = null;
    try {
      const amountWei = parseAmount(displayAmount);
      id = addActivity({
        type: "redeem",
        title: `赎回 ${displayAmount} RBT`,
        detail: "等待链上确认…",
        status: "pending",
      });
      setLastAmount(displayAmount);
      setActivityId(id);
      console.log(
        `📤 已提交赎回 ${displayAmount} RBT（链上 ${amountWei.toString()} wei），等待确认...`
      );
      await writeContractAsync({
        address: CONTRACTS.sepolia.vault,
        abi: ABI.sepoliaVaultAbi,
        functionName: "redeem",
        args: [amountWei],
      });
    } catch (error) {
      console.error("赎回失败", error);
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
    handleRedeem,
    isPending,
    isConfirming,
    isConfirmed,
  };
}
