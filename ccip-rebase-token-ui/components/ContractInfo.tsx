"use client";

import { Card } from "@/components/ui/Card";
import { CONTRACTS, NETWORKS, type NetworkId } from "@/contracts/constants";
import { useState } from "react";

interface ContractInfoProps {
  network: NetworkId;
}

function shorten(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ContractInfo({ network }: ContractInfoProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const contracts = CONTRACTS[network];
  const explorer = NETWORKS[network].explorer;
  const entries = Object.entries(contracts) as [string, string][];

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Card fill>
      <h2 className="mb-3 text-sm font-semibold text-slate-800">合约地址</h2>
      <ul className="space-y-2">
        {entries.map(([key, addr]) => (
          <li
            key={key}
            className="flex items-center justify-between gap-2 rounded-lg border border-[#e2efe6] bg-[#f8fcf9] px-3 py-3 text-xs"
          >
            <span className="capitalize text-slate-500">{key}</span>
            <div className="flex items-center gap-2">
              <a
                href={`${explorer}/address/${addr}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-slate-700 transition-colors hover:text-emerald-600"
              >
                {shorten(addr)}
              </a>
              <button
                type="button"
                onClick={() => copy(key, addr)}
                className="rounded px-1.5 py-0.5 text-[10px] text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {copied === key ? "已复制" : "复制"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!NETWORKS[network].hasVault && (
        <p className="mt-3 text-[12px] text-amber-700 py-2.5 ">
          ZKsync 无 Vault，存款/赎回请在 Sepolia 完成
        </p>
      )}
    </Card>
  );
}
