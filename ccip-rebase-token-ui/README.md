# Cross-Chain Rebase Token — 前端 DApp

基于 **Next.js** 的 Web 前端，用于与跨链 Rebase Token 协议交互：连接钱包、存款铸造 RBT、赎回 ETH、通过 Chainlink CCIP 在 **Sepolia ↔ ZKsync Sepolia** 之间跨链转移代币。

---

## 功能

| 模块　　　　　　　　　 | 说明　　　　　　　　　　　　　　　　　　　　　　　　　　　|
| ------------------------| -----------------------------------------------------------|
| **钱包连接**　　　　　 | RainbowKit + wagmi，支持 MetaMask 等常见钱包　　　　　　　|
| **存款（Deposit）**　　| 在 Sepolia 向 Vault 存入 ETH，获得 Rebase Token（RBT）　　|
| **赎回（Redeem）**　　 | 在 Sepolia 将 RBT 换回 ETH　　　　　　　　　　　　　　　　|
| **跨链桥接（Bridge）** | 通过 CCIP 将 RBT 从 Sepolia 转至 ZKsync Sepolia（或反向） |
| **余额展示**　　　　　 | 实时读取 RBT 余额（含 Rebase 计息后的动态 `balanceOf`）　 |
| **利率横幅**　　　　　 | 展示当前全局利率与用户锁定利率　　　　　　　　　　　　　　|
| **活动记录**　　　　　 | 本地记录存款、赎回、跨链等操作历史　　　　　　　　　　　　|

---

## 技术栈

- Next.js 16、React 19、TypeScript
- wagmi + viem（链上读写）
- RainbowKit（钱包 UI）
- Tailwind CSS 4

---

## 快速开始

### 1. 安装依赖

```bash
cd ccip-rebase-token-ui
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

在 `.env.local` 中填入测试网 RPC（可从 [Alchemy](https://www.alchemy.com/) 等获取）：

```env
NEXT_PUBLIC_SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY"
NEXT_PUBLIC_ZKSYNC_SEPOLIA_RPC_URL="https://zksync-sepolia.g.alchemy.com/v2/YOUR_KEY"
```

> `NEXT_PUBLIC_` 前缀的变量会暴露到浏览器，仅用于只读 RPC 调用。若需服务端代理，可使用不带该前缀的变量（见 `.env.example` 注释）。

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

### 4. 其他命令

```bash
npm run build   # 生产构建
npm run start   # 运行构建产物
npm run lint    # ESLint 检查
```

---

## 合约地址

链 ID 与合约地址定义在 `contracts/constants.ts`。若重新部署合约，请同步更新该文件中的地址：

- **Sepolia**：Vault、RebaseToken、Pool、CCIP Router、LINK
- **ZKsync Sepolia**：RebaseToken、Pool、CCIP Router、LINK

---

## 目录结构

```
ccip-rebase-token-ui/
├── app/              # Next.js App Router（页面、布局、全局样式）
├── components/       # UI 组件（存款、赎回、跨链、余额卡片等）
├── contracts/        # ABI 与链/合约常量
├── hoos/             # 自定义 Hooks（deposit、redeem、bridge、余额等）
└── public/           # 静态资源
```

---

## 使用说明

1. 点击右上角 **Connect Wallet** 连接钱包。
2. 切换到 **Ethereum Sepolia** 网络。
3. **存款**：输入 ETH 数量，确认交易，获得 RBT。
4. **跨链**：选择源链与目标链，输入 RBT 数量，支付 CCIP 手续费（LINK）后发起跨链。
5. **赎回**（仅 Sepolia）：将 RBT 换回 ETH。

跨链进度可在 [CCIP Explorer](https://ccip.chain.link) 查看。

---

## 相关文档

- 项目总览：根目录 [`add.md`](../add.md)
- 合约协议说明：[`ccip-rebase-token/README.md`](../ccip-rebase-token/README.md)
