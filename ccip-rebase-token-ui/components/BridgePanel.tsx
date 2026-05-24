"use client";

import { BridgeVisual } from "@/components/BridgeVisual";
import { PanelHeader } from "@/components/PanelHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  CCIP_EXPLORER,
  NETWORKS,
  TOKEN,
  type NetworkId,
} from "@/contracts/constants";
import { useState } from "react";

interface BridgePanelProps {
  source: NetworkId;
  disabled?: boolean;
  feeEstimate?: string;
  messageId?: string;
  bridging?: boolean;
  onBridge?: (amount: string) => void;
  onSwapDirection?: () => void;
}

export function BridgePanel({
  source,
  disabled,
  feeEstimate,
  messageId,
  bridging,
  onBridge,
  onSwapDirection,
}: BridgePanelProps) {
  const [amount, setAmount] = useState("");
  const dest: NetworkId = source === "sepolia" ? "zksyncSepolia" : "sepolia";
  const sourceNet = NETWORKS[source];
  const destNet = NETWORKS[dest];

  return (
    <Card highlight>
      <PanelHeader
        title="跨链桥接"
        subtitle="Router.ccipSend · 手续费以 LINK 支付"
        badge={
          <button
            type="button"
            onClick={onSwapDirection}
            data-action="swap-bridge-direction"
            className="shrink-0 rounded-lg border border-[#e2efe6] bg-[#f8fcf9] px-3 py-1.5 text-xs text-slate-600 transition-all hover:border-emerald-300 hover:text-emerald-700 active:rotate-180"
            style={{ transitionDuration: "400ms" }}
          >
            切换方向 ↕
          </button>
        }
      />

      <BridgeVisual from={source} to={dest} animating={bridging} />

      <p className="mb-4 text-center text-xs text-slate-500">
        {sourceNet.shortName} → {destNet.shortName} · 预计 5–20 分钟到账
      </p>

      <div className="grid items-end gap-4 sm:grid-cols-2">
        <Input
          label="跨链数量"
          type="text"
          inputMode="decimal"
          placeholder="0.0"
          suffix={TOKEN.symbol}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          data-input="bridge-amount"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">预估手续费</p>
          <div className="flex h-11 items-center rounded-xl border border-[#e2efe6] bg-[#f8fcf9] px-4 font-mono text-sm text-emerald-700">
            {feeEstimate ?? "— LINK"}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-3 text-xs text-slate-600">
        <p>流程：getFee → approve LINK → approve RBT → ccipSend</p>
        {messageId && (
          <p className="mt-1 truncate font-mono text-emerald-700">
            messageId: {messageId}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          className="min-w-[140px] flex-1"
          disabled={disabled || !amount}
          loading={bridging}
          data-action="bridge"
          onClick={() => onBridge?.(amount)}
        >
          发起跨链
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="shrink-0"
          onClick={() => window.open(CCIP_EXPLORER, "_blank", "noopener")}
        >
          CCIP Explorer ↗
        </Button>
      </div>
    </Card>
  );
}
