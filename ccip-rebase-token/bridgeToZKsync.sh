#!/bin/bash
# Deploy RebaseToken + Pool on ZKsync & Sepolia, configure CCIP, optional bridge.
#
# Fresh deploy (both chains): in .env remove all SKIP_* and old contract addresses.
#   ./bridgeToZKsync.sh
#   # copy printed addresses into .env, then:
#   ./verify.sh
#
# Skip steps via .env: SKIP_ZKSYNC_DEPLOY, SKIP_SEPOLIA_DEPLOY, SKIP_VAULT_DEPLOY,
#   SKIP_*_POOL_CONFIG, SKIP_VAULT_DEPOSIT, SKIP_BRIDGE
set -euo pipefail

cd "$(dirname "$0")"

# 0.01 ETH：Vault 存款 msg.value；跨链为 RBT 数量（18 位小数，与存款 1:1）
AMOUNT="${BRIDGE_AMOUNT:-$(cast to-wei 0.01 ether)}"

ZKSYNC_REGISTRY_MODULE_OWNER_CUSTOM="0x3139687Ee9938422F57933C3CDB3E21EE43c4d0F"
ZKSYNC_TOKEN_ADMIN_REGISTRY="0xc7777f12258014866c677Bdb679D0b007405b7DF"
ZKSYNC_ROUTER="0xA1fdA8aa9A8C4b945C45aD30647b01f07D7A0B16"
ZKSYNC_RNM_PROXY_ADDRESS="0x3DA20FD3D8a8f8c1f1A5fD03648147143608C467"
ZKSYNC_SEPOLIA_CHAIN_SELECTOR="6898391096552792247"
ZKSYNC_LINK_ADDRESS="0x23A1aFD896c8c8876AF46aDc38521f4432658d1e"

SEPOLIA_REGISTRY_MODULE_OWNER_CUSTOM="0x62e731218d0D47305aba2BE3751E7EE9E5520790"
SEPOLIA_TOKEN_ADMIN_REGISTRY="0x95F29FEE11c5C55d26cCcf1DB6772DE953B37B82"
SEPOLIA_ROUTER="0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
SEPOLIA_RNM_PROXY_ADDRESS="0xba3f6251de62dED61Ff98590cB2fDf6871FbB991"
SEPOLIA_CHAIN_SELECTOR="16015286601757825753"
SEPOLIA_LINK_ADDRESS="0x779877A7B0D9E8603169DdbD7836e478b4624789"

CONFIGURE_POOL_SIG="run(address,uint64,address,address,bool,uint128,uint128,bool,uint128,uint128)"
BRIDGE_SIG="run(uint64,address,address,uint256,address,address)"
# --slow: wait for each tx to mine (avoids Alchemy "in-flight transaction limit")
SEPOLIA_FORGE_FLAGS="${SEPOLIA_FORGE_FLAGS:---slow}"
RPC_PAUSE_SECONDS="${RPC_PAUSE_SECONDS:-20}"

source .env

if [ -z "${PRIVATE_KEY:-}" ]; then
    echo "Error: PRIVATE_KEY not set in .env"
    exit 1
fi

require_address() {
    if [[ ! "${1:-}" =~ ^0x[a-fA-F0-9]{40}$ ]]; then
        echo "Error: $2 address is missing or invalid (got: '${1:-}')"
        exit 1
    fi
}

extract_deployed() {
    awk '/Deployed to:/ {print $3; exit}'
}

# console.log("token:", addr) or forge return line "token: contract RebaseToken"
extract_logged() {
    local label="$1"
    local output="$2"
    echo "${output}" | grep -i "${label}:" | grep -oE '0x[a-fA-F0-9]{40}' | head -1
}

# forge broadcast block: "Contract: RebaseToken" then "Contract Address: 0x..."
extract_broadcast_contract() {
    local contract_name="$1"
    local output="$2"
    echo "${output}" | awk -v name="${contract_name}" '
        $1 == "Contract:" && $2 == name { capture=1; next }
        capture && $1 == "Contract" && $2 == "Address:" { print $3; exit }
    '
}

resolve_address() {
    local label="$1"
    local log_label="$2"
    local contract_name="$3"
    local output="$4"
    local addr
    addr=$(extract_logged "${log_label}" "${output}")
    if [[ ! "${addr}" =~ ^0x[a-fA-F0-9]{40}$ ]]; then
        addr=$(extract_broadcast_contract "${contract_name}" "${output}")
    fi
    require_address "${addr}" "${label}"
    echo "${addr}"
}

# cast balance --erc20 is deprecated and may hang on some RPCs
erc20_balance() {
    local token="$1"
    local account="$2"
    local rpc_url="$3"
    local timeout_sec="${CAST_TIMEOUT:-45}"
    timeout "${timeout_sec}" cast erc20 balance "${token}" "${account}" \
        --rpc-url "${rpc_url}" 2>/dev/null \
        || echo "unavailable"
}

rpc_pause() {
    if [ "${RPC_PAUSE_SECONDS}" -gt 0 ] 2>/dev/null; then
        echo "Waiting ${RPC_PAUSE_SECONDS}s before next RPC burst..."
        sleep "${RPC_PAUSE_SECONDS}"
    fi
}

wait_sepolia_tx_pool() {
    local wallet
    wallet=$(cast wallet address --private-key "${PRIVATE_KEY}")
    echo "Checking Sepolia pending txs for ${wallet}..."
    local latest pending
    latest=$(cast nonce "${wallet}" --rpc-url "${SEPOLIA_RPC_URL}")
    pending=$(cast nonce "${wallet}" --rpc-url "${SEPOLIA_RPC_URL}" --block pending)
    while [ "${pending}" != "${latest}" ]; do
        echo "  Still pending (latest nonce=${latest}, pending=${pending}), waiting 15s..."
        sleep 15
        latest=$(cast nonce "${wallet}" --rpc-url "${SEPOLIA_RPC_URL}")
        pending=$(cast nonce "${wallet}" --rpc-url "${SEPOLIA_RPC_URL}" --block pending)
    done
    echo "Sepolia tx pool clear (nonce=${latest})."
}

configure_pool() {
    local rpc_url="$1"
    local local_pool="$2"
    local remote_selector="$3"
    local remote_pool="$4"
    local remote_token="$5"
    shift 5
  # remaining args: extra forge flags (e.g. --zksync --legacy)

    echo "Configuring pool ${local_pool} on ${rpc_url} -> chain ${remote_selector}..."
    local broadcast_flags=(--broadcast)
    if [[ "${rpc_url}" == *"sepolia"* ]] || [[ "${rpc_url}" == "${SEPOLIA_RPC_URL}" ]]; then
        # shellcheck disable=SC2206
        broadcast_flags+=( ${SEPOLIA_FORGE_FLAGS} )
    fi

    forge script script/ConfigurePool.s.sol:ConfigurePoolScript \
        --rpc-url "${rpc_url}" \
        --private-key "${PRIVATE_KEY}" \
        "${broadcast_flags[@]}" \
        "$@" \
        --sig "${CONFIGURE_POOL_SIG}" \
        "${local_pool}" "${remote_selector}" "${remote_pool}" "${remote_token}" \
        false 0 0 false 0 0
}

echo "Building contracts..."
forge build --zksync

# ---------- ZKsync ----------
if [ "${SKIP_ZKSYNC_DEPLOY:-}" = "1" ]; then
    echo "SKIP_ZKSYNC_DEPLOY=1: using addresses from .env"
    require_address "${ZKSYNC_REBASE_TOKEN_ADDRESS:-}" "ZKSYNC_REBASE_TOKEN"
    require_address "${ZKSYNC_POOL_ADDRESS:-}" "ZKSYNC_POOL"
else
    echo "Deploying RebaseToken on ZKsync Sepolia..."
    ZKSYNC_REBASE_TOKEN_ADDRESS=$(forge create src/RebaseToken.sol:RebaseToken \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        --legacy --zksync --broadcast | extract_deployed)
    require_address "${ZKSYNC_REBASE_TOKEN_ADDRESS}" "ZKSYNC_REBASE_TOKEN (deploy)"
    echo "ZKsync rebase token: ${ZKSYNC_REBASE_TOKEN_ADDRESS}"

    echo "Deploying RebaseTokenPool on ZKsync Sepolia..."
    ZKSYNC_POOL_ADDRESS=$(forge create src/RebaseTokenPool.sol:RebaseTokenPool \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        --legacy --zksync --broadcast \
        --constructor-args "${ZKSYNC_REBASE_TOKEN_ADDRESS}" '[]' \
        "${ZKSYNC_RNM_PROXY_ADDRESS}" "${ZKSYNC_ROUTER}" | extract_deployed)
    require_address "${ZKSYNC_POOL_ADDRESS}" "ZKSYNC_POOL (deploy)"
    echo "ZKsync pool: ${ZKSYNC_POOL_ADDRESS}"

    cast send "${ZKSYNC_REBASE_TOKEN_ADDRESS}" \
        "grantMintAndBurnRole(address)" "${ZKSYNC_POOL_ADDRESS}" \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" --private-key "${PRIVATE_KEY}"

    cast send "${ZKSYNC_REGISTRY_MODULE_OWNER_CUSTOM}" \
        "registerAdminViaOwner(address)" "${ZKSYNC_REBASE_TOKEN_ADDRESS}" \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" --private-key "${PRIVATE_KEY}"

    cast send "${ZKSYNC_TOKEN_ADMIN_REGISTRY}" \
        "acceptAdminRole(address)" "${ZKSYNC_REBASE_TOKEN_ADDRESS}" \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" --private-key "${PRIVATE_KEY}"

    cast send "${ZKSYNC_TOKEN_ADMIN_REGISTRY}" \
        "setPool(address,address)" "${ZKSYNC_REBASE_TOKEN_ADDRESS}" "${ZKSYNC_POOL_ADDRESS}" \
        --rpc-url "${ZKSYNC_SEPOLIA_RPC_URL}" --private-key "${PRIVATE_KEY}"
fi

echo "ZKsync deploy/setup done."

rpc_pause
wait_sepolia_tx_pool

# ---------- Sepolia ----------
if [ "${SKIP_SEPOLIA_DEPLOY:-}" = "1" ]; then
    echo "SKIP_SEPOLIA_DEPLOY=1: using Sepolia addresses from .env"
    require_address "${SEPOLIA_REBASE_TOKEN_ADDRESS:-}" "SEPOLIA_REBASE_TOKEN"
    require_address "${SEPOLIA_POOL_ADDRESS:-}" "SEPOLIA_POOL"
else
    echo "Deploying token + pool on Sepolia..."
    output=$(forge script script/Deployer.s.sol:TokenAndPoolDeployer \
        --rpc-url "${SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        ${SEPOLIA_FORGE_FLAGS} --broadcast)
    SEPOLIA_REBASE_TOKEN_ADDRESS=$(resolve_address \
        "SEPOLIA_REBASE_TOKEN (deploy)" "token" "RebaseToken" "${output}")
    SEPOLIA_POOL_ADDRESS=$(resolve_address \
        "SEPOLIA_POOL (deploy)" "pool" "RebaseTokenPool" "${output}")
fi

echo "Sepolia rebase token: ${SEPOLIA_REBASE_TOKEN_ADDRESS}"
echo "Sepolia pool: ${SEPOLIA_POOL_ADDRESS}"

if [ -n "${VAULT_ADDRESS:-}" ]; then
    echo "Using existing vault: ${VAULT_ADDRESS}"
elif [ "${SKIP_VAULT_DEPLOY:-}" = "1" ]; then
    echo "Error: SKIP_VAULT_DEPLOY=1 but VAULT_ADDRESS is not set in .env"
    exit 1
else
    echo "Deploying vault on Sepolia..."
    output_vault=$(forge script script/Deployer.s.sol:VaultDeployer \
        --rpc-url "${SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        ${SEPOLIA_FORGE_FLAGS} --broadcast \
        --sig "run(address)" "${SEPOLIA_REBASE_TOKEN_ADDRESS}")
    VAULT_ADDRESS=$(resolve_address \
        "VAULT (deploy)" "vault" "Vault" "${output_vault}")
fi
echo "Vault: ${VAULT_ADDRESS}"

if [ "${SKIP_SEPOLIA_POOL_CONFIG:-}" != "1" ]; then
    configure_pool "${SEPOLIA_RPC_URL}" \
        "${SEPOLIA_POOL_ADDRESS}" \
        "${ZKSYNC_SEPOLIA_CHAIN_SELECTOR}" \
        "${ZKSYNC_POOL_ADDRESS}" \
        "${ZKSYNC_REBASE_TOKEN_ADDRESS}"
else
    echo "SKIP_SEPOLIA_POOL_CONFIG=1: skipping Sepolia pool configuration"
fi

if [ "${SKIP_VAULT_DEPOSIT:-}" != "1" ]; then
    echo "Depositing 0.01 ETH (${AMOUNT} wei) to vault..."
    cast send "${VAULT_ADDRESS}" \
        --value "${AMOUNT}" \
        --rpc-url "${SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        "deposit()"
else
    echo "SKIP_VAULT_DEPOSIT=1: skipping vault deposit"
fi

if [ "${SKIP_ZKSYNC_POOL_CONFIG:-}" != "1" ]; then
    configure_pool "${ZKSYNC_SEPOLIA_RPC_URL}" \
        "${ZKSYNC_POOL_ADDRESS}" \
        "${SEPOLIA_CHAIN_SELECTOR}" \
        "${SEPOLIA_POOL_ADDRESS}" \
        "${SEPOLIA_REBASE_TOKEN_ADDRESS}" \
        --legacy --zksync
else
    echo "SKIP_ZKSYNC_POOL_CONFIG=1: skipping ZKsync pool configuration"
fi

WALLET_ADDRESS=$(cast wallet address --private-key "${PRIVATE_KEY}")

if [ "${SKIP_BRIDGE:-}" != "1" ]; then
    echo "Bridging 0.01 RBT (${AMOUNT} wei) to ZKsync (receiver: ${WALLET_ADDRESS})..."
    SEPOLIA_BALANCE_BEFORE=$(erc20_balance \
        "${SEPOLIA_REBASE_TOKEN_ADDRESS}" "${WALLET_ADDRESS}" "${SEPOLIA_RPC_URL}")
    echo "Sepolia RBT balance before: ${SEPOLIA_BALANCE_BEFORE}"

    forge script script/BridgeTokens.s.sol:BridgeTokensScript \
        --rpc-url "${SEPOLIA_RPC_URL}" \
        --private-key "${PRIVATE_KEY}" \
        ${SEPOLIA_FORGE_FLAGS} --broadcast \
        --sig "${BRIDGE_SIG}" \
        "${ZKSYNC_SEPOLIA_CHAIN_SELECTOR}" \
        "${WALLET_ADDRESS}" \
        "${SEPOLIA_REBASE_TOKEN_ADDRESS}" \
        "${AMOUNT}" \
        "${SEPOLIA_LINK_ADDRESS}" \
        "${SEPOLIA_ROUTER}"

    echo "CCIP message sent (tx above). Mint on ZKsync usually takes 5–20 minutes."
    echo "Fetching post-bridge balances (${CAST_TIMEOUT:-45}s RPC timeout)..."
    SEPOLIA_BALANCE_AFTER=$(erc20_balance \
        "${SEPOLIA_REBASE_TOKEN_ADDRESS}" "${WALLET_ADDRESS}" "${SEPOLIA_RPC_URL}")
    ZKSYNC_BALANCE=$(erc20_balance \
        "${ZKSYNC_REBASE_TOKEN_ADDRESS}" "${WALLET_ADDRESS}" "${ZKSYNC_SEPOLIA_RPC_URL}")
    echo "Sepolia RBT balance after:  ${SEPOLIA_BALANCE_AFTER}"
    echo "ZKsync RBT balance (now):   ${ZKSYNC_BALANCE}"
else
    echo "SKIP_BRIDGE=1: skipping CCIP bridge"
fi

echo ""
echo "=== Summary — copy into .env ==="
echo "ZKSYNC_REBASE_TOKEN_ADDRESS=${ZKSYNC_REBASE_TOKEN_ADDRESS}"
echo "ZKSYNC_POOL_ADDRESS=${ZKSYNC_POOL_ADDRESS}"
echo "SEPOLIA_REBASE_TOKEN_ADDRESS=${SEPOLIA_REBASE_TOKEN_ADDRESS}"
echo "SEPOLIA_POOL_ADDRESS=${SEPOLIA_POOL_ADDRESS}"
echo "VAULT_ADDRESS=${VAULT_ADDRESS}"
echo "Wallet: ${WALLET_ADDRESS:-$(cast wallet address --private-key "${PRIVATE_KEY}" 2>/dev/null || echo n/a)}"
echo ""
echo "Next: ./verify.sh"
