"use client";

import { PanelHeader } from "@/components/PanelHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TOKEN } from "@/contracts/constants";
import useRbtBalance from "@/hoos/useRbtBalance";
import { useState } from "react";
interface RedeemPanelProps {
  disabled?: boolean;
  onRedeem?: (amount: string, max: boolean) => void;
}

export function RedeemPanel({ disabled, onRedeem }: RedeemPanelProps) {
  const [amount, setAmount] = useState("");
  const [max, setMax] = useState(false);
  const { rbtBalance } = useRbtBalance("sepolia");
  const maxAmount = String(rbtBalance);
  return (
    <Card fill>
      <PanelHeader title="赎回 ETH" subtitle="仅 Sepolia · Vault.redeem" />

      <div className="flex flex-1 flex-col">
        <Input
          label="赎回数量"
          type="text"
          inputMode="decimal"
          placeholder="0.0"
          suffix={TOKEN.symbol}
          value={max ? maxAmount : amount}
          disabled={max}
          onChange={(e) => {
            setMax(false);
            setAmount(e.target.value);
          }}
          data-input="redeem-amount"
        />

        <div className="mt-4 flex min-h-[40px] items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={max}
              onChange={(e) => {
                setMax(e.target.checked);
                setAmount(maxAmount);
              }}
              className="h-4 w-4 rounded border-[#e2efe6] accent-emerald-500"
              data-input="redeem-max"
            />
            赎回全部余额
          </label>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-5 w-full shrink-0"
        disabled={disabled || (!max && !amount)}
        data-action="redeem"
        onClick={() => onRedeem?.(amount, max)}
      >
        赎回为 ETH
      </Button>
    </Card>
  );
}
