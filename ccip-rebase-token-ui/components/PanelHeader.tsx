import { type ReactNode } from "react";

interface PanelHeaderProps {
  title: string;
  subtitle: string;
  badge?: ReactNode;
}

/** 统一面板标题区高度，保证并排卡片对齐 */
export function PanelHeader({ title, subtitle, badge }: PanelHeaderProps) {
  return (
    <div className="mb-4 flex min-h-[52px] items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      </div>
      {badge}
    </div>
  );
}
