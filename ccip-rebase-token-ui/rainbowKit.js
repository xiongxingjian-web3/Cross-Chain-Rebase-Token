"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, zksyncSepoliaTestnet } from "wagmi/chains";
import { http } from "wagmi";
const config = getDefaultConfig({
  appName: "ccip-rebase-token",
  projectId: "e0c65b19672223606b27112de79fab53",
  chains: [sepolia, zksyncSepoliaTestnet],
  ssr: true,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [zksyncSepoliaTestnet.id]: http(process.env.NEXT_PUBLIC_ZKSYNC_SEPOLIA_RPC_URL),
  },
});
export default config;
