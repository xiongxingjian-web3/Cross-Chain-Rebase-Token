//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {
    TokenPool
} from "@chainlink/contracts-ccip/contracts/pools/TokenPool.sol";
import {Pool} from "@chainlink/contracts-ccip/contracts/libraries/Pool.sol";
import {
    IERC20
} from "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {IRebaseToken} from "./interfaces/IRebaseToken.sol";

contract RebaseTokenPool is TokenPool {
    constructor(
        IERC20 _token,
        address[] memory _allowlist,
        address _rmnProxy,
        address _router
    ) TokenPool(_token, 18, _allowlist, _rmnProxy, _router) {}

    function lockOrBurn(
        Pool.LockOrBurnInV1 calldata lockOrBurnIn
    ) public override returns (Pool.LockOrBurnOutV1 memory lockOrBurnOut) {
        _validateLockOrBurn(lockOrBurnIn);

        address originalSender = lockOrBurnIn.originalSender;
        uint256 userInterestRate = IRebaseToken(address(i_token))
            .getUserInterestRate(originalSender);

        IRebaseToken(address(i_token)).burn(address(this), lockOrBurnIn.amount);

        lockOrBurnOut = Pool.LockOrBurnOutV1({
            destTokenAddress: getRemoteToken(lockOrBurnIn.remoteChainSelector),
            destPoolData: abi.encode(userInterestRate)
        });
    }

    function releaseOrMint(
        Pool.ReleaseOrMintInV1 calldata releaseOrMintIn
    ) public override returns (Pool.ReleaseOrMintOutV1 memory) {
        uint256 userInterestRate = abi.decode(
            releaseOrMintIn.sourcePoolData,
            (uint256)
        );

        // Sepolia and Arbitrum pools both use 18 decimals; sourcePoolData carries interest rate only.
        uint256 localAmount = releaseOrMintIn.sourceDenominatedAmount;

        _validateReleaseOrMint(releaseOrMintIn, localAmount);

        IRebaseToken(address(i_token)).mint(
            releaseOrMintIn.receiver,
            localAmount,
            userInterestRate
        );

        return Pool.ReleaseOrMintOutV1({destinationAmount: localAmount});
    }
}
