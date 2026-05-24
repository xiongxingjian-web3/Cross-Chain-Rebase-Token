"use client";

import { NETWORKS, type NetworkId } from "@/contracts/constants";

interface NetworkSwitcherProps {
  active: NetworkId;
  onChange?: (id: NetworkId) => void;
}

export function NetworkSwitcher({ active, onChange }: NetworkSwitcherProps) {
  const items = Object.values(NETWORKS);

  return (
    <div
      className="inline-flex rounded-xl border border-[#e2efe6] bg-white p-1 shadow-sm"
      role="tablist"
      aria-label="选择网络"
    >
      {items.map((net) => {
        const isActive = net.id === active;
        return (
          <button
            key={net.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-network={net.id}
            onClick={() => onChange?.(net.id)}
            className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "text-emerald-800"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-lg bg-emerald-50 ring-1 ring-emerald-100" />
            )}
            <span
              className="relative h-2 w-2 rounded-full"
              style={{ backgroundColor: net.color }}
            />
            <span className="relative">{net.shortName}</span>
          </button>
        );
      })}
    </div>
  );
}
