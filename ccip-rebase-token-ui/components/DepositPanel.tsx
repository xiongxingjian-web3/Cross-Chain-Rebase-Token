"use client";

import { PanelHeader } from "@/components/PanelHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
interface DepositPanelProps {
  disabled?: boolean;
  onDeposit?: (amount: string) => void;
}

export function DepositPanel({ disabled, onDeposit }: DepositPanelProps) {
  const [amount, setAmount] = useState("");
  return (
    <Card highlight fill>
      <PanelHeader
        title="存入 ETH"
        subtitle="仅 Sepolia · Vault.deposit"
        badge={
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            1 ETH → 1 RBT
          </span>
        }
      />

      <div className="flex flex-1 flex-col">
        <Input
          label="存入数量"
          type="text"
          inputMode="decimal"
          placeholder="0.0"
          suffix="ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          hint="存入时锁定当前全局利率"
          data-input="deposit-amount"
        />

        <div className="mt-4 flex min-h-[40px] gap-2">
          {["0.01", "0.05", "0.1"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className="flex-1 rounded-lg border border-[#e2efe6] bg-[#f8fcf9] py-2 text-xs text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <Button
        className="mt-5 w-full shrink-0"
        disabled={disabled || !amount}
        data-action="deposit"
        onClick={() => onDeposit?.(amount)}
      >
        存入并铸造 RBT
      </Button>
    </Card>
  );
}
