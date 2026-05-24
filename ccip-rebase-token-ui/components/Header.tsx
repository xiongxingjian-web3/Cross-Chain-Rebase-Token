"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
interface HeaderProps {
  connected?: boolean;
  address?: string;
  onConnectClick?: () => void;
}

export function Header({ connected, address, onConnectClick }: HeaderProps) {
  const display =
    connected && address ? `${address.slice(0, 6)}…${address.slice(-4)}` : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2efe6] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/25">
            <span className="text-sm font-bold text-white">R</span>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
              RBT Bridge
            </h1>
            <p className="text-xs text-slate-500">CCIP · Rebase Token</p>
          </div>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}
