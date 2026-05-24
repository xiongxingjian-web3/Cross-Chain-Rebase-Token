import { TOKEN } from "@/contracts/constants";
import { formatUnits, parseUnits } from "viem";

/** 与合约一致：RBT / ETH / LINK 测试网均为 18 位小数 */
export const TOKEN_DECIMALS = TOKEN.decimals;

/**
 * 用户输入（如 "1.5"）→ 链上 wei（bigint）
 * 用于 deposit / redeem / bridge 等写合约前
 */
export function parseAmount(
  amount: string,
  decimals: number = TOKEN_DECIMALS
): bigint {
  const trimmed = amount.trim();
  if (!trimmed) {
    throw new Error("数量不能为空");
  }
  try {
    const wei = parseUnits(trimmed, decimals);
    if (wei <= 0n) {
      throw new Error("数量必须大于 0");
    }
    return wei;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "数量必须大于 0" || error.message === "数量不能为空")
    ) {
      throw error;
    }
    throw new Error(`无效的数量：${trimmed}`);
  }
}

/**
 * 链上 wei（bigint）→ 前端展示字符串
 * 用于余额、手续费、控制台日志
 */
export function formatAmount(
  value: bigint | undefined,
  decimals: number = TOKEN_DECIMALS
): string | undefined {
  if (value === undefined) return undefined;
  const raw = formatUnits(value, decimals);
  if (!raw.includes(".")) return `${raw}.00`;
  const [whole, frac = ""] = raw.split(".");
  const trimmed = frac.padEnd(8, "0").slice(0, 8).replace(/0+$/, "");
  return trimmed ? `${whole}.${trimmed}` : whole;
}
