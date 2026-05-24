//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Test} from "forge-std/Test.sol";
import {RebaseToken} from "../src/RebaseToken.sol";
import {Vault} from "../src/Vault.sol";
import {IRebaseToken} from "../src/interfaces/IRebaseToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {
    IAccessControl
} from "@openzeppelin/contracts/access/IAccessControl.sol";
contract RebaseTokenTest is Test {
    RebaseToken private rebaseToken;
    Vault private vault;
    address public owner = makeAddr("owner");
    address public user = makeAddr("user");
    address public user2 = makeAddr("user2");
    function setUp() public {
        vm.startPrank(owner);
        rebaseToken = new RebaseToken();
        vault = new Vault(IRebaseToken(address(rebaseToken)));
        rebaseToken.grantMintAndBurnRole(address(vault));
        vm.stopPrank();
    }
    function addRewardsTovault(uint256 interest) public {
        (bool success, ) = payable(address(vault)).call{value: interest}("");
        require(success, "Add rewards failed");
    }
    function testDepositLinear(uint256 amount) public {
        amount = bound(amount, 1e5, type(uint96).max);
        vm.prank(user);
        vm.deal(user, amount);
        vault.deposit{value: amount}();
        // 存款已经完成，直接验证初始余额
        uint256 startBalance = rebaseToken.balanceOf(user);
        assertApproxEqAbs(startBalance, amount, 1e5);

        vm.warp(block.timestamp + 1 hours);
        uint256 middleBalance = rebaseToken.balanceOf(user);
        assertGt(middleBalance, startBalance);

        vm.warp(block.timestamp + 1 hours);
        uint256 endBalance = rebaseToken.balanceOf(user);
        assertGt(endBalance, middleBalance);
        assertApproxEqAbs(
            endBalance - middleBalance,
            middleBalance - startBalance,
            1e5
        );
    }

    function testRedeemStraightAway(uint256 amount) public {
        amount = bound(amount, 1e5, type(uint96).max);
        vm.prank(user);
        vm.deal(user, amount);
        vault.deposit{value: amount}();
        uint256 startBalance = rebaseToken.balanceOf(user);
        assertApproxEqAbs(startBalance, amount, 1e5);
        vm.prank(user);
        vault.redeem(type(uint256).max);
        assertEq(rebaseToken.balanceOf(user), 0);
        assertEq(address(user).balance, amount);
    }
    function testRedeemAfterTimePassed(
        uint256 depositAmount,
        uint256 time
    ) public {
        time = bound(time, 1 hours, type(uint96).max);
        depositAmount = bound(depositAmount, 1e5, type(uint96).max);
        vm.deal(user, depositAmount);
        vm.prank(user);
        vault.deposit{value: depositAmount}();
        vm.warp(block.timestamp + time);
        //本金+利息
        uint256 balanceAfterSomeTime = rebaseToken.balanceOf(user);

        vm.deal(owner, balanceAfterSomeTime - depositAmount);
        vm.prank(owner);
        // 利息
        addRewardsTovault(balanceAfterSomeTime - depositAmount);

        vm.prank(user);
        vault.redeem(type(uint256).max);
        // 用户eth
        uint256 ethBalance = address(user).balance;
        assertEq(ethBalance, balanceAfterSomeTime);
        assertGt(ethBalance, depositAmount);
    }
    function testTransfer(uint256 amount, uint256 amountToSend) public {
        amount = bound(amount, 1e5, type(uint96).max);
        amountToSend = bound(amountToSend, 1e5, amount);
        vm.deal(user, amount);
        vm.prank(user);
        vault.deposit{value: amount}();

        uint256 userbalance = rebaseToken.balanceOf(user);
        uint256 user2balance = rebaseToken.balanceOf(user2);
        assertEq(userbalance, amount);
        assertEq(user2balance, 0);

        vm.prank(owner);
        rebaseToken.setInterestRate(4e10);

        vm.prank(user);
        rebaseToken.transfer(user2, amountToSend);
        uint256 userBalanceAfterTransfer = rebaseToken.balanceOf(user);
        assertEq(userBalanceAfterTransfer, userbalance - amountToSend);
        assertEq(rebaseToken.balanceOf(user2), amountToSend);
        assertEq(rebaseToken.getUserInterestRate(user2), 5e10);
    }
    function testCannotSetInterestRate(uint256 newInterestRate) public {
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                user
            )
        );
        rebaseToken.setInterestRate(newInterestRate);
    }
    function testCannotCallMintAndBurn() public {
        vm.startPrank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                IAccessControl.AccessControlUnauthorizedAccount.selector,
                user,
                rebaseToken.MINT_AND_BURN_ROLE()
            )
        );
        rebaseToken.mint(user, 1e18, 5e10);
        vm.expectRevert(
            abi.encodeWithSelector(
                IAccessControl.AccessControlUnauthorizedAccount.selector,
                user,
                rebaseToken.MINT_AND_BURN_ROLE()
            )
        );
        rebaseToken.burn(user, 1e18);
        vm.stopPrank();
    }
    function testGetPrincipleAmount(uint256 amount) public {
        amount = bound(amount, 1e5, type(uint96).max);
        vm.deal(user, amount);
        vm.prank(user);
        vault.deposit{value: amount}();
        assertEq(rebaseToken.principleBalanceOf(user), amount);
        vm.warp(block.timestamp + 1 hours);
        assertEq(rebaseToken.principleBalanceOf(user), amount);
    }
    function testgetRebaseTokenAddress() public view {
        assertEq(vault.getRebaseTokenAddress(), address(rebaseToken));
    }
    function testInterestRateCanOnlyDecrease(uint256 newInterestRate) public {
        newInterestRate = bound(
            newInterestRate,
            rebaseToken.getInterestRate(),
            type(uint96).max
        );
        vm.startPrank(owner);
        vm.expectRevert(
            abi.encodeWithSelector(
                RebaseToken.RebaseToken_InterestRateCanOnlyDecrease.selector,
                rebaseToken.getInterestRate(),
                newInterestRate
            )
        );
        rebaseToken.setInterestRate(newInterestRate);
        vm.stopPrank();
    }
}
