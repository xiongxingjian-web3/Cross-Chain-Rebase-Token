//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {IRebaseToken} from "./interfaces/IRebaseToken.sol";
contract Vault {
    //取款失败
    error Vault_Redeem_Failed();
    //RebaseToken接口
    IRebaseToken private immutable i_rebaseToken;
    //存款成功事件
    event Deposited(address indexed user, uint256 amount);
    //取款成功事件
    event Redeemed(address indexed user, uint256 amount);

    constructor(IRebaseToken _rebaseToken) {
        i_rebaseToken = _rebaseToken;
    }

    //合约可以接受“直接转账”的 ETH。
    receive() external payable {}

    //存款
    function deposit() external payable {
        uint256 interestRate = i_rebaseToken.getInterestRate();
        i_rebaseToken.mint(msg.sender, msg.value, interestRate);
        emit Deposited(msg.sender, msg.value);
    }

    //取款
    function redeem(uint256 _amount) external {
        if (_amount == type(uint256).max) {
            _amount = i_rebaseToken.balanceOf(msg.sender);
        }
        i_rebaseToken.burn(msg.sender, _amount);

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        if (!success) {
            revert Vault_Redeem_Failed();
        }
        emit Redeemed(msg.sender, _amount);
    }

    //获取RebaseToken地址
    function getRebaseTokenAddress() external view returns (address) {
        return address(i_rebaseToken);
    }
}
