export const CONTRACTS_ABI = {
  zksyncRebaseTokenAbi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32",
        },
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "oldInterestRate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "newInterestRate",
          type: "uint256",
        },
      ],
      name: "RebaseToken_InterestRateCanOnlyDecrease",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newInterestRate",
          type: "uint256",
        },
      ],
      name: "InterestRateSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MINT_AND_BURN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getInterestRate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getUserInterestRate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "grantMintAndBurnRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_userInterestRate",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "principleBalanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newInterestRate",
          type: "uint256",
        },
      ],
      name: "setInterestRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "_recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  zksyncPoolAbi: [
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "_token",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "_allowlist",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "_rmnProxy",
          type: "address",
        },
        {
          internalType: "address",
          name: "_router",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "AllowListNotEnabled",
      type: "error",
    },
    {
      inputs: [],
      name: "BucketOverfilled",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "caller",
          type: "address",
        },
      ],
      name: "CallerIsNotARampOnRouter",
      type: "error",
    },
    {
      inputs: [],
      name: "CannotTransferToSelf",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "chainSelector",
          type: "uint64",
        },
      ],
      name: "ChainAlreadyExists",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "ChainNotAllowed",
      type: "error",
    },
    {
      inputs: [],
      name: "CursedByRMN",
      type: "error",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config",
          name: "config",
          type: "tuple",
        },
      ],
      name: "DisabledNonZeroRateLimit",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "expected",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "actual",
          type: "uint8",
        },
      ],
      name: "InvalidDecimalArgs",
      type: "error",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config",
          name: "rateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "InvalidRateLimitRate",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "sourcePoolData",
          type: "bytes",
        },
      ],
      name: "InvalidRemoteChainDecimals",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "InvalidRemotePoolForChain",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "sourcePoolAddress",
          type: "bytes",
        },
      ],
      name: "InvalidSourcePoolAddress",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "InvalidToken",
      type: "error",
    },
    {
      inputs: [],
      name: "MismatchedArrayLengths",
      type: "error",
    },
    {
      inputs: [],
      name: "MustBeProposedOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "NonExistentChain",
      type: "error",
    },
    {
      inputs: [],
      name: "OnlyCallableByOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "remoteDecimals",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "localDecimals",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "remoteAmount",
          type: "uint256",
        },
      ],
      name: "OverflowDetected",
      type: "error",
    },
    {
      inputs: [],
      name: "OwnerCannotBeZero",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "PoolAlreadyAdded",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "SenderNotAllowed",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "capacity",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requested",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
      ],
      name: "TokenMaxCapacityExceeded",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "minWaitInSeconds",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "available",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
      ],
      name: "TokenRateLimitReached",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "caller",
          type: "address",
        },
      ],
      name: "Unauthorized",
      type: "error",
    },
    {
      inputs: [],
      name: "ZeroAddressNotAllowed",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "AllowListAdd",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "AllowListRemove",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remoteToken",
          type: "bytes",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "outboundRateLimiterConfig",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "inboundRateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "ChainAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "outboundRateLimiterConfig",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "inboundRateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "ChainConfigured",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "ChainRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "config",
          type: "tuple",
        },
      ],
      name: "ConfigChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "InboundRateLimitConsumed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "LockedOrBurned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "OutboundRateLimitConsumed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "rateLimitAdmin",
          type: "address",
        },
      ],
      name: "RateLimitAdminSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ReleasedOrMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "RemotePoolAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "RemotePoolRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldRouter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newRouter",
          type: "address",
        },
      ],
      name: "RouterUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "addRemotePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "removes",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "adds",
          type: "address[]",
        },
      ],
      name: "applyAllowListUpdates",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64[]",
          name: "remoteChainSelectorsToRemove",
          type: "uint64[]",
        },
        {
          components: [
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            {
              internalType: "bytes[]",
              name: "remotePoolAddresses",
              type: "bytes[]",
            },
            {
              internalType: "bytes",
              name: "remoteTokenAddress",
              type: "bytes",
            },
            {
              components: [
                {
                  internalType: "bool",
                  name: "isEnabled",
                  type: "bool",
                },
                {
                  internalType: "uint128",
                  name: "capacity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "rate",
                  type: "uint128",
                },
              ],
              internalType: "struct RateLimiter.Config",
              name: "outboundRateLimiterConfig",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "bool",
                  name: "isEnabled",
                  type: "bool",
                },
                {
                  internalType: "uint128",
                  name: "capacity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "rate",
                  type: "uint128",
                },
              ],
              internalType: "struct RateLimiter.Config",
              name: "inboundRateLimiterConfig",
              type: "tuple",
            },
          ],
          internalType: "struct TokenPool.ChainUpdate[]",
          name: "chainsToAdd",
          type: "tuple[]",
        },
      ],
      name: "applyChainUpdates",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllowList",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllowListEnabled",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "getCurrentInboundRateLimiterState",
      outputs: [
        {
          components: [
            {
              internalType: "uint128",
              name: "tokens",
              type: "uint128",
            },
            {
              internalType: "uint32",
              name: "lastUpdated",
              type: "uint32",
            },
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.TokenBucket",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "getCurrentOutboundRateLimiterState",
      outputs: [
        {
          components: [
            {
              internalType: "uint128",
              name: "tokens",
              type: "uint128",
            },
            {
              internalType: "uint32",
              name: "lastUpdated",
              type: "uint32",
            },
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.TokenBucket",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRateLimitAdmin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "getRemotePools",
      outputs: [
        {
          internalType: "bytes[]",
          name: "",
          type: "bytes[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "getRemoteToken",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRmnProxy",
      outputs: [
        {
          internalType: "address",
          name: "rmnProxy",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRouter",
      outputs: [
        {
          internalType: "address",
          name: "router",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSupportedChains",
      outputs: [
        {
          internalType: "uint64[]",
          name: "",
          type: "uint64[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "token",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTokenDecimals",
      outputs: [
        {
          internalType: "uint8",
          name: "decimals",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "isRemotePool",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "isSupportedChain",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "isSupportedToken",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "receiver",
              type: "bytes",
            },
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "originalSender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "localToken",
              type: "address",
            },
          ],
          internalType: "struct Pool.LockOrBurnInV1",
          name: "lockOrBurnIn",
          type: "tuple",
        },
      ],
      name: "lockOrBurn",
      outputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "destTokenAddress",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "destPoolData",
              type: "bytes",
            },
          ],
          internalType: "struct Pool.LockOrBurnOutV1",
          name: "lockOrBurnOut",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "originalSender",
              type: "bytes",
            },
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "sourceDenominatedAmount",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "localToken",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "sourcePoolAddress",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "sourcePoolData",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "offchainTokenData",
              type: "bytes",
            },
          ],
          internalType: "struct Pool.ReleaseOrMintInV1",
          name: "releaseOrMintIn",
          type: "tuple",
        },
      ],
      name: "releaseOrMint",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "destinationAmount",
              type: "uint256",
            },
          ],
          internalType: "struct Pool.ReleaseOrMintOutV1",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "removeRemotePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config",
          name: "outboundConfig",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config",
          name: "inboundConfig",
          type: "tuple",
        },
      ],
      name: "setChainRateLimiterConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64[]",
          name: "remoteChainSelectors",
          type: "uint64[]",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config[]",
          name: "outboundConfigs",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "isEnabled",
              type: "bool",
            },
            {
              internalType: "uint128",
              name: "capacity",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rate",
              type: "uint128",
            },
          ],
          internalType: "struct RateLimiter.Config[]",
          name: "inboundConfigs",
          type: "tuple[]",
        },
      ],
      name: "setChainRateLimiterConfigs",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "rateLimitAdmin",
          type: "address",
        },
      ],
      name: "setRateLimitAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newRouter",
          type: "address",
        },
      ],
      name: "setRouter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  sepoliaRebaseTokenAbi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "bytes32", name: "neededRole", type: "bytes32" },
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "allowance", type: "uint256" },
        { internalType: "uint256", name: "needed", type: "uint256" },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "uint256", name: "balance", type: "uint256" },
        { internalType: "uint256", name: "needed", type: "uint256" },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "approver", type: "address" }],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "sender", type: "address" }],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "spender", type: "address" }],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint256", name: "oldInterestRate", type: "uint256" },
        { internalType: "uint256", name: "newInterestRate", type: "uint256" },
      ],
      name: "RebaseToken_InterestRateCanOnlyDecrease",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newInterestRate",
          type: "uint256",
        },
      ],
      name: "InterestRateSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MINT_AND_BURN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_from", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getInterestRate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleAdmin",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getUserInterestRate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_account", type: "address" }],
      name: "grantMintAndBurnRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "uint256", name: "_userInterestRate", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "principleBalanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_newInterestRate", type: "uint256" },
      ],
      name: "setInterestRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_recipient", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_sender", type: "address" },
        { internalType: "address", name: "_recipient", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  sepoliaPoolAbi: [
    {
      inputs: [
        { internalType: "contract IERC20", name: "_token", type: "address" },
        { internalType: "address[]", name: "_allowlist", type: "address[]" },
        { internalType: "address", name: "_rmnProxy", type: "address" },
        { internalType: "address", name: "_router", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "AllowListNotEnabled", type: "error" },
    { inputs: [], name: "BucketOverfilled", type: "error" },
    {
      inputs: [{ internalType: "address", name: "caller", type: "address" }],
      name: "CallerIsNotARampOnRouter",
      type: "error",
    },
    { inputs: [], name: "CannotTransferToSelf", type: "error" },
    {
      inputs: [
        { internalType: "uint64", name: "chainSelector", type: "uint64" },
      ],
      name: "ChainAlreadyExists",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "ChainNotAllowed",
      type: "error",
    },
    { inputs: [], name: "CursedByRMN", type: "error" },
    {
      inputs: [
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config",
          name: "config",
          type: "tuple",
        },
      ],
      name: "DisabledNonZeroRateLimit",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint8", name: "expected", type: "uint8" },
        { internalType: "uint8", name: "actual", type: "uint8" },
      ],
      name: "InvalidDecimalArgs",
      type: "error",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config",
          name: "rateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "InvalidRateLimitRate",
      type: "error",
    },
    {
      inputs: [
        { internalType: "bytes", name: "sourcePoolData", type: "bytes" },
      ],
      name: "InvalidRemoteChainDecimals",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        { internalType: "bytes", name: "remotePoolAddress", type: "bytes" },
      ],
      name: "InvalidRemotePoolForChain",
      type: "error",
    },
    {
      inputs: [
        { internalType: "bytes", name: "sourcePoolAddress", type: "bytes" },
      ],
      name: "InvalidSourcePoolAddress",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "InvalidToken",
      type: "error",
    },
    { inputs: [], name: "MismatchedArrayLengths", type: "error" },
    { inputs: [], name: "MustBeProposedOwner", type: "error" },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "NonExistentChain",
      type: "error",
    },
    { inputs: [], name: "OnlyCallableByOwner", type: "error" },
    {
      inputs: [
        { internalType: "uint8", name: "remoteDecimals", type: "uint8" },
        { internalType: "uint8", name: "localDecimals", type: "uint8" },
        { internalType: "uint256", name: "remoteAmount", type: "uint256" },
      ],
      name: "OverflowDetected",
      type: "error",
    },
    { inputs: [], name: "OwnerCannotBeZero", type: "error" },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        { internalType: "bytes", name: "remotePoolAddress", type: "bytes" },
      ],
      name: "PoolAlreadyAdded",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "sender", type: "address" }],
      name: "SenderNotAllowed",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint256", name: "capacity", type: "uint256" },
        { internalType: "uint256", name: "requested", type: "uint256" },
        { internalType: "address", name: "tokenAddress", type: "address" },
      ],
      name: "TokenMaxCapacityExceeded",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint256", name: "minWaitInSeconds", type: "uint256" },
        { internalType: "uint256", name: "available", type: "uint256" },
        { internalType: "address", name: "tokenAddress", type: "address" },
      ],
      name: "TokenRateLimitReached",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "caller", type: "address" }],
      name: "Unauthorized",
      type: "error",
    },
    { inputs: [], name: "ZeroAddressNotAllowed", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "AllowListAdd",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "AllowListRemove",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remoteToken",
          type: "bytes",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "outboundRateLimiterConfig",
          type: "tuple",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "inboundRateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "ChainAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "outboundRateLimiterConfig",
          type: "tuple",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "inboundRateLimiterConfig",
          type: "tuple",
        },
      ],
      name: "ChainConfigured",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
      ],
      name: "ChainRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          indexed: false,
          internalType: "struct RateLimiter.Config",
          name: "config",
          type: "tuple",
        },
      ],
      name: "ConfigChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "InboundRateLimitConsumed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "LockedOrBurned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "OutboundRateLimitConsumed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "OwnershipTransferRequested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "rateLimitAdmin",
          type: "address",
        },
      ],
      name: "RateLimitAdminSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ReleasedOrMinted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "RemotePoolAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "remoteChainSelector",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "remotePoolAddress",
          type: "bytes",
        },
      ],
      name: "RemotePoolRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldRouter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newRouter",
          type: "address",
        },
      ],
      name: "RouterUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        { internalType: "bytes", name: "remotePoolAddress", type: "bytes" },
      ],
      name: "addRemotePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "removes", type: "address[]" },
        { internalType: "address[]", name: "adds", type: "address[]" },
      ],
      name: "applyAllowListUpdates",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64[]",
          name: "remoteChainSelectorsToRemove",
          type: "uint64[]",
        },
        {
          components: [
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            {
              internalType: "bytes[]",
              name: "remotePoolAddresses",
              type: "bytes[]",
            },
            {
              internalType: "bytes",
              name: "remoteTokenAddress",
              type: "bytes",
            },
            {
              components: [
                { internalType: "bool", name: "isEnabled", type: "bool" },
                { internalType: "uint128", name: "capacity", type: "uint128" },
                { internalType: "uint128", name: "rate", type: "uint128" },
              ],
              internalType: "struct RateLimiter.Config",
              name: "outboundRateLimiterConfig",
              type: "tuple",
            },
            {
              components: [
                { internalType: "bool", name: "isEnabled", type: "bool" },
                { internalType: "uint128", name: "capacity", type: "uint128" },
                { internalType: "uint128", name: "rate", type: "uint128" },
              ],
              internalType: "struct RateLimiter.Config",
              name: "inboundRateLimiterConfig",
              type: "tuple",
            },
          ],
          internalType: "struct TokenPool.ChainUpdate[]",
          name: "chainsToAdd",
          type: "tuple[]",
        },
      ],
      name: "applyChainUpdates",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllowList",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllowListEnabled",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "getCurrentInboundRateLimiterState",
      outputs: [
        {
          components: [
            { internalType: "uint128", name: "tokens", type: "uint128" },
            { internalType: "uint32", name: "lastUpdated", type: "uint32" },
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.TokenBucket",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "getCurrentOutboundRateLimiterState",
      outputs: [
        {
          components: [
            { internalType: "uint128", name: "tokens", type: "uint128" },
            { internalType: "uint32", name: "lastUpdated", type: "uint32" },
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.TokenBucket",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRateLimitAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "getRemotePools",
      outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "getRemoteToken",
      outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRmnProxy",
      outputs: [{ internalType: "address", name: "rmnProxy", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRouter",
      outputs: [{ internalType: "address", name: "router", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSupportedChains",
      outputs: [{ internalType: "uint64[]", name: "", type: "uint64[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getToken",
      outputs: [
        { internalType: "contract IERC20", name: "token", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTokenDecimals",
      outputs: [{ internalType: "uint8", name: "decimals", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        { internalType: "bytes", name: "remotePoolAddress", type: "bytes" },
      ],
      name: "isRemotePool",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
      ],
      name: "isSupportedChain",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "isSupportedToken",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bytes", name: "receiver", type: "bytes" },
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "originalSender",
              type: "address",
            },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "address", name: "localToken", type: "address" },
          ],
          internalType: "struct Pool.LockOrBurnInV1",
          name: "lockOrBurnIn",
          type: "tuple",
        },
      ],
      name: "lockOrBurn",
      outputs: [
        {
          components: [
            { internalType: "bytes", name: "destTokenAddress", type: "bytes" },
            { internalType: "bytes", name: "destPoolData", type: "bytes" },
          ],
          internalType: "struct Pool.LockOrBurnOutV1",
          name: "lockOrBurnOut",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bytes", name: "originalSender", type: "bytes" },
            {
              internalType: "uint64",
              name: "remoteChainSelector",
              type: "uint64",
            },
            { internalType: "address", name: "receiver", type: "address" },
            {
              internalType: "uint256",
              name: "sourceDenominatedAmount",
              type: "uint256",
            },
            { internalType: "address", name: "localToken", type: "address" },
            { internalType: "bytes", name: "sourcePoolAddress", type: "bytes" },
            { internalType: "bytes", name: "sourcePoolData", type: "bytes" },
            { internalType: "bytes", name: "offchainTokenData", type: "bytes" },
          ],
          internalType: "struct Pool.ReleaseOrMintInV1",
          name: "releaseOrMintIn",
          type: "tuple",
        },
      ],
      name: "releaseOrMint",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "destinationAmount",
              type: "uint256",
            },
          ],
          internalType: "struct Pool.ReleaseOrMintOutV1",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        { internalType: "bytes", name: "remotePoolAddress", type: "bytes" },
      ],
      name: "removeRemotePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint64", name: "remoteChainSelector", type: "uint64" },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config",
          name: "outboundConfig",
          type: "tuple",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config",
          name: "inboundConfig",
          type: "tuple",
        },
      ],
      name: "setChainRateLimiterConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64[]",
          name: "remoteChainSelectors",
          type: "uint64[]",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config[]",
          name: "outboundConfigs",
          type: "tuple[]",
        },
        {
          components: [
            { internalType: "bool", name: "isEnabled", type: "bool" },
            { internalType: "uint128", name: "capacity", type: "uint128" },
            { internalType: "uint128", name: "rate", type: "uint128" },
          ],
          internalType: "struct RateLimiter.Config[]",
          name: "inboundConfigs",
          type: "tuple[]",
        },
      ],
      name: "setChainRateLimiterConfigs",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "rateLimitAdmin", type: "address" },
      ],
      name: "setRateLimitAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newRouter", type: "address" }],
      name: "setRouter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "to", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  sepoliaVaultAbi: [
    {
      inputs: [
        {
          internalType: "contract IRebaseToken",
          name: "_rebaseToken",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "Vault_Redeem_Failed", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposited",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Redeemed",
      type: "event",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getRebaseTokenAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "redeem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
} as const;
