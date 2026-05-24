# Cross-Chain Rebase Token — 项目说明

Cross Chain Rebase Token 是一个利用 **Chainlink CCIP** 实现跨链转移的 **Rebase Token（重基代币）** 项目。

核心创新：当用户将 Rebase Token 从源链转移到目标链时，该用户在源链上的**利率**（影响余额自动重基的参数）也会同步到目标链，从而保证跨链后依然享受相同的利率和收益增长逻辑。

---

## 仓库结构

```
Cross-Chain-Rebase-Token/
├── ccip-rebase-token/      # 智能合约（Foundry）
│   ├── src/                # RebaseToken、Vault、RebaseTokenPool
│   ├── script/             # 部署与桥接脚本
│   ├── test/               # 单元测试与跨链测试
│   └── bridgeToZKsync.sh   # Sepolia ↔ ZKsync Sepolia 一键部署/配置
└── ccip-rebase-token-ui/   # 前端 DApp（Next.js + wagmi + RainbowKit）
    ├── app/                # 页面入口
    ├── components/         # 存款、赎回、跨链等 UI 组件
    └── contracts/          # ABI 与链上合约地址
```

---

## 功能概览

| 模块 | 说明 |
|------|------|
| **Vault** | 用户存入 ETH，获得 Rebase Token（RBT） |
| **RebaseToken** | `balanceOf` 随时间线性增长；在用户操作（mint/burn/transfer/bridge）时结算 |
| **利率机制** | 全局利率只降不升；用户存入时锁定个人利率，激励早期参与者 |
| **CCIP 跨链** | Sepolia → ZKsync Sepolia 转移 RBT，并同步用户利率 |
| **前端 DApp** | 连接钱包、存款/赎回、跨链桥接、余额与活动记录展示 |

---

## 快速开始

### 1. 智能合约

```bash
cd ccip-rebase-token
cp .env.example .env
# 填入 PRIVATE_KEY 与 RPC URL

forge install
forge test
```

部署与跨链（Sepolia + ZKsync Sepolia）：

```bash
./bridgeToZKsync.sh
# 将脚本输出的合约地址写入 .env 后
./verify.sh
```

### 2. 前端

```bash
cd ccip-rebase-token-ui
cp .env.example .env.local
# 填入 NEXT_PUBLIC_SEPOLIA_RPC_URL 等

npm install
npm run dev
```



> 若重新部署合约，请同步更新 `ccip-rebase-token-ui/contracts/constants.ts` 中的合约地址。

---

## 技术栈

- **合约**：Solidity 0.8.24、Foundry、Chainlink CCIP、OpenZeppelin
- **测试网**：Ethereum Sepolia（源链 + Vault）、ZKsync Sepolia（目标链）
- **前端**：Next.js 16、React 19、wagmi、viem、RainbowKit、Tailwind CSS

---

## 相关文档

- 合约协议详解：[`ccip-rebase-token/README.md`](ccip-rebase-token/README.md)
- 前端开发说明：[`ccip-rebase-token-ui/README.md`](ccip-rebase-token-ui/README.md)
