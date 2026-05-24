import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  fill?: boolean;
}

export function Card({
  children,
  className = "",
  highlight,
  fill,
}: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white p-5 shadow-sm shadow-emerald-900/[0.04] transition-shadow duration-200 hover:shadow-md hover:shadow-emerald-900/[0.06]",
        highlight
          ? "border-emerald-200 ring-1 ring-emerald-100"
          : "border-[#e2efe6]",
        fill ? "flex h-full min-h-0 flex-col" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
