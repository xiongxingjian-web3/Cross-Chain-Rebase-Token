"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ActivityProvider } from "@/hoos/ActivityProvider";
import config from "../rainbowKit";
const queryClient = new QueryClient();

/** 与 globals.css / Button 组件一致的 RBT 配色 */
const rbtTheme = (() => {
  const base = lightTheme({
    accentColor: "#10b981", // emerald-500，主按钮 / 强调色
    accentColorForeground: "#ffffff",
    borderRadius: "large", // 对齐 rounded-xl
  });
  return {
    ...base,
    colors: {
      ...base.colors,
      connectButtonText: "#1e293b", // slate-800
      generalBorder: "#e2efe6",
      modalText: "#1e293b",
      modalTextSecondary: "#64748b", // --muted
      menuItemBackground: "rgba(16, 185, 129, 0.1)",
      profileForeground: "#ecfdf5", // emerald-50，账户弹层背景
      actionButtonSecondaryBackground: "#ecfdf5",
      connectionIndicator: "#10b981",
      selectedOptionBorder: "rgba(16, 185, 129, 0.28)",
    },
  };
})();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rbtTheme}>
          <ActivityProvider>{children}</ActivityProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
