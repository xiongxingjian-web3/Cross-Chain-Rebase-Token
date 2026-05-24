#!/bin/bash
# Verify contracts on Sepolia (Etherscan) and ZKsync Sepolia after ./bridgeToZKsync.sh
# Usage: ./verify.sh
# Optional: SKIP_SEPOLIA_VERIFY=1 or SKIP_ZKSYNC_VERIFY=1
set -euo pipefail

cd "$(dirname "$0")"

SEPOLIA_RNM_PROXY="0xba3f6251de62dED61Ff98590cB2fDf6871FbB991"
SEPOLIA_ROUTER="0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
ZKSYNC_RNM_PROXY="0x3DA20FD3D8a8f8c1f1A5fD03648147143608C467"
ZKSYNC_ROUTER="0xA1fdA8aa9A8C4b945C45aD30647b01f07D7A0B16"
ZKSYNC_VERIFIER_URL="${ZKSYNC_VERIFIER_URL:-https://explorer.sepolia.era.zksync.dev/contract_verification}"
VERIFY_DELAY="${VERIFY_DELAY:-15}"

source .env

require_env() {
    for var in SEPOLIA_EXPLORER_API_KEY ZKSYNC_SEPOLIA_EXPLORER_API_KEY \
        SEPOLIA_REBASE_TOKEN_ADDRESS SEPOLIA_POOL_ADDRESS VAULT_ADDRESS \
        ZKSYNC_REBASE_TOKEN_ADDRESS ZKSYNC_POOL_ADDRESS; do
        if [[ -z "${!var:-}" ]]; then
            echo "Error: ${var} not set in .env (run ./bridgeToZKsync.sh first)"
            exit 1
        fi
    done
}

verify_sepolia() {
    local address="$1"
    local contract_path="$2"
    shift 2
    echo ""
    echo ">>> Sepolia: ${contract_path} @ ${address}"
    forge verify-contract "${address}" "${contract_path}" \
        --chain sepolia \
        --etherscan-api-key "${SEPOLIA_EXPLORER_API_KEY}" \
        --watch \
        "$@"
    sleep "${VERIFY_DELAY}"
}

verify_zksync() {
    local address="$1"
    local contract_path="$2"
    shift 2
    echo ""
    echo ">>> ZKsync: ${contract_path} @ ${address}"
    forge verify-contract "${address}" "${contract_path}" \
        --chain zksync-testnet \
        --zksync \
        --compiler-version 0.8.24 \
        --verifier-url "${ZKSYNC_VERIFIER_URL}" \
        --etherscan-api-key "${ZKSYNC_SEPOLIA_EXPLORER_API_KEY}" \
        --watch \
        "$@"
    sleep "${VERIFY_DELAY}"
}

require_env

echo "Building (solc 0.8.24, zksolc 1.5.15)..."
forge build --zksync

POOL_ARGS_SEPOLIA=$(cast abi-encode "constructor(address,address[],address,address)" \
    "${SEPOLIA_REBASE_TOKEN_ADDRESS}" "[]" "${SEPOLIA_RNM_PROXY}" "${SEPOLIA_ROUTER}")
POOL_ARGS_ZKSYNC=$(cast abi-encode "constructor(address,address[],address,address)" \
    "${ZKSYNC_REBASE_TOKEN_ADDRESS}" "[]" "${ZKSYNC_RNM_PROXY}" "${ZKSYNC_ROUTER}")
VAULT_ARGS=$(cast abi-encode "constructor(address)" "${SEPOLIA_REBASE_TOKEN_ADDRESS}")

if [[ "${SKIP_SEPOLIA_VERIFY:-}" != "1" ]]; then
    echo "========== Sepolia =========="
    verify_sepolia "${SEPOLIA_REBASE_TOKEN_ADDRESS}" "src/RebaseToken.sol:RebaseToken"
    verify_sepolia "${SEPOLIA_POOL_ADDRESS}" "src/RebaseTokenPool.sol:RebaseTokenPool" \
        --constructor-args "${POOL_ARGS_SEPOLIA}"
    verify_sepolia "${VAULT_ADDRESS}" "src/Vault.sol:Vault" \
        --constructor-args "${VAULT_ARGS}"
else
    echo "SKIP_SEPOLIA_VERIFY=1"
fi

if [[ "${SKIP_ZKSYNC_VERIFY:-}" != "1" ]]; then
    echo "========== ZKsync Sepolia =========="
    verify_zksync "${ZKSYNC_REBASE_TOKEN_ADDRESS}" "src/RebaseToken.sol:RebaseToken"
    verify_zksync "${ZKSYNC_POOL_ADDRESS}" "src/RebaseTokenPool.sol:RebaseTokenPool" \
        --constructor-args "${POOL_ARGS_ZKSYNC}"
else
    echo "SKIP_ZKSYNC_VERIFY=1"
fi

echo ""
echo "Done."
