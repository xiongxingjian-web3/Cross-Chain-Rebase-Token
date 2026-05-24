"use client";

import { Card } from "@/components/ui/Card";
import { ACTIVITY_PAGE_SIZE } from "@/hoos/activityConstants";
import { useEffect, useMemo, useState } from "react";

export type ActivityItem = {
  id: string;
  type: "deposit" | "redeem" | "bridge" | "info";
  title: string;
  detail?: string;
  time?: string;
  status?: "pending" | "success" | "failed";
};

interface ActivityFeedProps {
  items?: ActivityItem[];
}

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  failed: "bg-red-50 text-red-600 ring-1 ring-red-100",
};

const typeIcons = {
  deposit: "↓",
  redeem: "↑",
  bridge: "⇄",
  info: "·",
};

const statusLabels = {
  pending: "处理中",
  success: "成功",
  failed: "失败",
} as const;

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <li className="grid w-full max-w-full grid-cols-[2rem_minmax(0,1fr)_2.75rem] items-start gap-3 overflow-hidden rounded-xl border border-[#e2efe6] bg-[#f8fcf9] p-3 transition-colors hover:border-emerald-200">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm text-emerald-600">
        {typeIcons[item.type]}
      </span>
      <div className="min-w-0 overflow-hidden">
        <div className="flex min-w-0 items-center gap-1.5">
          <p
            className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700"
            title={item.title}
          >
            {item.title}
          </p>
          {item.status && (
            <span
              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusStyles[item.status]}`}
            >
              {statusLabels[item.status]}
            </span>
          )}
        </div>
        {item.detail && (
          <p
            className="mt-0.5 truncate font-mono text-xs text-slate-500"
            title={item.detail}
          >
            {item.detail}
          </p>
        )}
      </div>
      <span className="pt-0.5 text-right text-[10px] leading-tight text-slate-400 tabular-nums">
        {item.time ?? ""}
      </span>
    </li>
  );
}

function Pagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="mt-3 flex min-w-0 shrink-0 items-center justify-between gap-2 border-t border-[#e2efe6] pt-3">
      <p className="min-w-0 truncate text-[10px] text-slate-400">
        共 {totalItems} 条 · 第 {page}/{totalPages} 页
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-[#e2efe6] bg-white px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="上一页"
        >
          ‹
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-[#e2efe6] bg-white px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="下一页"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function ActivityFeed({ items = [] }: ActivityFeedProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / ACTIVITY_PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * ACTIVITY_PAGE_SIZE;
    return items.slice(start, start + ACTIVITY_PAGE_SIZE);
  }, [items, page]);

  // 新记录插入顶部时回到第 1 页；条数变少时避免页码越界
  useEffect(() => {
    setPage(1);
  }, [items[0]?.id]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <Card fill className="min-h-[280px] min-w-0 overflow-hidden">
      <h2 className="mb-4 shrink-0 text-sm font-semibold text-slate-800">
        活动记录
      </h2>
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#e2efe6] bg-[#f8fcf9] text-slate-400">
            ○
          </div>
          <p className="text-sm text-slate-600">暂无交易记录</p>
          <p className="mt-1 text-xs text-slate-400">
            完成操作后在此展示状态
          </p>
        </div>
      ) : (
        <>
          <ul className="min-h-0 w-full min-w-0 flex-1 space-y-2 overflow-x-hidden overflow-y-auto pr-1">
            {pageItems.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </ul>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={items.length}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </Card>
  );
}
