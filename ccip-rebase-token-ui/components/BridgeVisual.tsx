"use client";

import { NETWORKS, type NetworkId } from "@/contracts/constants";

interface BridgeVisualProps {
  from: NetworkId;
  to: NetworkId;
  animating?: boolean;
}

export function BridgeVisual({ from, to, animating }: BridgeVisualProps) {
  const fromNet = NETWORKS[from];
  const toNet = NETWORKS[to];

  return (
    <div className="flex h-[88px] items-center justify-center gap-4">
      <ChainNode name={fromNet.shortName} color={fromNet.color} active />
      <div className="relative flex max-w-[200px] flex-1 items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100" />
        <span
          className={`absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b98180] ${
            animating
              ? "animate-[travel_2s_ease-in-out_infinite]"
              : "opacity-50"
          }`}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
          CCIP
        </span>
      </div>
      <ChainNode
        name={toNet.shortName}
        color={toNet.color}
        active={animating}
      />
    </div>
  );
}

function ChainNode({
  name,
  color,
  active,
}: {
  name: string;
  color: string;
  active?: boolean;
}) {
  return (
    <div className="flex w-[72px] flex-col items-center gap-2">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
          active
            ? "border-emerald-300 bg-emerald-50"
            : "border-[#e2efe6] bg-[#f8fcf9]"
        }`}
        style={active ? { boxShadow: `0 4px 16px -4px ${color}40` } : undefined}
      >
        <span className="text-xs font-bold text-slate-700">
          {name.slice(0, 2)}
        </span>
      </div>
      <span className="text-xs text-slate-500">{name}</span>
    </div>
  );
}
