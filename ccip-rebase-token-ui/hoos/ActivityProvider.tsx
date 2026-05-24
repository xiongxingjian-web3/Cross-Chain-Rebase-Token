"use client";

import type { ActivityItem } from "@/components/ActivityFeed";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAccount } from "wagmi";
import { ACTIVITY_MAX_ITEMS } from "./activityConstants";

const STORAGE_KEY = "rbt-activity";

type NewActivity = Omit<ActivityItem, "id" | "time"> & { id?: string };

type ActivityContextValue = {
  items: ActivityItem[];
  addActivity: (item: NewActivity) => string;
  updateActivity: (id: string, patch: Partial<ActivityItem>) => void;
};

const ActivityContext = createContext<ActivityContextValue | null>(null);

function formatTime(date: Date) {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function loadItems(address: string): ActivityItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}:${address.toLowerCase()}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActivityItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveItems(address: string, items: ActivityItem[]) {
  localStorage.setItem(
    `${STORAGE_KEY}:${address.toLowerCase()}`,
    JSON.stringify(items.slice(0, ACTIVITY_MAX_ITEMS))
  );
}

export function ActivityProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (address) {
      setItems(loadItems(address));
    } else {
      setItems([]);
    }
  }, [address]);

  const addActivity = useCallback(
    (item: NewActivity) => {
      const entry: ActivityItem = {
        ...item,
        id:
          item.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        time: formatTime(new Date()),
      };
      setItems((prev) => {
        const next = [entry, ...prev].slice(0, ACTIVITY_MAX_ITEMS);
        if (address) saveItems(address, next);
        return next;
      });
      return entry.id;
    },
    [address]
  );

  const updateActivity = useCallback(
    (id: string, patch: Partial<ActivityItem>) => {
      setItems((prev) => {
        const next = prev.map((row) =>
          row.id === id ? { ...row, ...patch } : row
        );
        if (address) saveItems(address, next);
        return next;
      });
    },
    [address]
  );

  return (
    <ActivityContext.Provider value={{ items, addActivity, updateActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error("useActivity 必须在 ActivityProvider 内使用");
  }
  return ctx;
}
