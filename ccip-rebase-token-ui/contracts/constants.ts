/** 链与合约展示用常量（对接逻辑请自行实现，参见 ccip-rebase-token/FRONTEND_API.md） */
import { CONTRACTS_ABI } from "./contractabi";

export const ABI = CONTRACTS_ABI;
export type NetworkId = "sepolia" | "zksyncSepolia";

export const NETWORKS = {
  sepolia: {
    id: "sepolia" as const,
    name: "Ethereum Sepolia",
    shortName: "Sepolia",
    chainId: 11155111,
    ccipSelector: "16015286601757825753",
    explorer: "https://sepolia.etherscan.io",
    hasVault: true,
    color: "#34d399",
  },
  zksyncSepolia: {
    id: "zksyncSepolia" as const,
    name: "ZKsync Sepolia",
    shortName: "ZKsync",
    chainId: 300,
    ccipSelector: "6898391096552792247",
    explorer: "https://sepolia.explorer.zksync.io",
    hasVault: false,
    color: "#6ee7b7",
  },
} as const;

export const CONTRACTS = {
  sepolia: {
    vault: "0x1FBA202a00b254fc85708F1a3557F15C3a3c7d95",
    rebaseToken: "0x46135fd7cb9e20E6a4D305F4084A44fA16181979",
    pool: "0x0b31a203F0B49862BA317BBcbaCC4f6107E69E86",
    ccipRouter: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
    link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  },
  zksyncSepolia: {
    rebaseToken: "0xCceb9a4A0EfB4b8017feCe759274720589AFdB5b",
    pool: "0xEe9f10B0CE4F8990382e054cf431b8D5Ba417716",
    ccipRouter: "0xA1fdA8aa9A8C4b945C45aD30647b01f07D7A0B16",
    link: "0x23A1aFD896c8c8876AF46aDc38521f4432658d1e",
  },
} as const;

export const TOKEN = {
  name: "Rebase Token",
  symbol: "RBT",
  decimals: 18,
} as const;

export const CCIP_EXPLORER = "https://ccip.chain.link";
