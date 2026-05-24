# Cross-chain Rebase Token

## English (brief)

1. A protocol that allows users to deposit into a vault and, in return, receive rebase tokens that represent their underlying balance.
2. Rebase token: `balanceOf` is dynamic to reflect the balance changing over time.
   - Balance increases linearly with time.
   - Mint (or settle) for users when they perform an action: minting, burning, transferring, or bridging.
3. Interest rate
   - Each user gets an individual rate based on the protocol’s global interest rate at the time they deposit into the vault.
   - The global interest rate can only decrease, to incentivise and reward early adopters.
   - Goal: increase token adoption.

---

## 中文说明（详细）

### 1. 协议在做什么

这是一个**跨链场景下的 Rebase 代币协议**：用户把资产**存入金库（Vault）**，作为回报，收到 **Rebase 代币**。这种代币在链上代表用户在金库里对应的**底层资产份额/债权**，而不是传统「1 个代币 = 固定数量底层」的静态映射。

**要点：** 你在做的是「**存款凭证 + 随时间增值的记账方式**」；凭证叫 Rebase 代币，其**数量或 `balanceOf` 展示**会随协议规则变化。

### 2. `balanceOf` 为什么是「动态的」

在普通 ERC-20 里，`balanceOf(用户)` 一般是固定个数（除非转账、mint、burn）。

本设计中，`balanceOf` **随时间变化**，用来反映用户应得的底层价值（或份额对应数量）在增长。

- **余额随时间大致线性增加**  
  协议用某种数学形式（例如按时间连续计息）持续把「应得数量」算进账面，因此即使一段时间内没有链上交互，**读 `balanceOf` 也可能变大**（具体实现可能是视图里按时间戳计算，或周期性写入存储，以代码为准）。

- **在用户做链上操作时铸币 / 结算**  
  在用户执行 **mint、burn、transfer 以及跨链（bridging）** 等操作时触发更新，常见目的包括：
  - 把从上次操作到本次操作之间累积的增长**结算进余额**；
  - 在跨链消息到达时**对齐**各链账面，减少仅靠纯数学视图带来的多链不一致。

**要点：** 通常不是「无交互也每秒在链上凭空 mint」，而是**把应计收益反映进余额**，并可能用「交互时落账」平衡 gas 与跨链一致性。

### 3. 利率机制

- **每个用户有各自的利率**  
  在用户**存入金库**时，根据其存入时刻的**协议全局利率**确定（或锁定）该用户的计息参数，之后按该用户规则累积。

- **全局利率只能下调、不能上调**  
  越早参与的用户，往往能锁定更有利的基准，后来者面对更低的全局利率，用于**激励早期采用者**。

- **产品目标**  
  提高代币采用率、鼓励早期存款与使用。

### 4. 一句话概括

**用 Rebase 形式表达随时间增长的存款权益，配合「只降不升的全局利率 + 用户级锁定利率」做增长激励，并在跨链场景下通过用户动作与桥接消息对齐多链余额。**
