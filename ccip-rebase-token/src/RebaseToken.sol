//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
contract RebaseToken is ERC20, Ownable, AccessControl {
    //利率只能降低错误
    error RebaseToken_InterestRateCanOnlyDecrease(
        uint256 oldInterestRate,
        uint256 newInterestRate
    );
    //全局利率 0.000005%
    // uint256 private s_interestRate = 5e10;
    uint256 private s_interestRate = (5 * PRECISION_FACTOR) / 1e8;
    //精度因子
    uint256 private constant PRECISION_FACTOR = 1e18;
    //铸币和销毁角色
    bytes32 public constant MINT_AND_BURN_ROLE =
        keccak256("MINT_AND_BURN_ROLE");
    //查询用户利率
    mapping(address user => uint256 interestRate) private s_userInterestRate;
    //查询用户上次更新利息时间
    mapping(address user => uint256 lastUpdateTimestamp)
        private s_userLastUpdateTimestamp;
    //利息更新事件
    event InterestRateSet(uint256 newInterestRate);
    constructor() ERC20("Rebase Token", "RBT") Ownable(msg.sender) {}

    //授予铸币和销毁角色
    function grantMintAndBurnRole(address _account) external onlyOwner {
        _grantRole(MINT_AND_BURN_ROLE, _account);
    }
    //设置全局新利率
    function setInterestRate(uint256 _newInterestRate) external onlyOwner {
        if (_newInterestRate >= s_interestRate) {
            revert RebaseToken_InterestRateCanOnlyDecrease(
                s_interestRate,
                _newInterestRate
            );
        }
        s_interestRate = _newInterestRate;
        emit InterestRateSet(s_interestRate);
    }

    //查询用户本金余额
    function principleBalanceOf(address _user) external view returns (uint256) {
        return super.balanceOf(_user);
    }

    //铸币
    function mint(
        address _to,
        uint256 _amount,
        uint256 _userInterestRate
    ) external onlyRole(MINT_AND_BURN_ROLE) {
        _mintAccruedInterest(_to);
        s_userInterestRate[_to] = _userInterestRate;
        _mint(_to, _amount);
    }

    //销毁（
    function burn(
        address _from,
        uint256 _amount
    ) external onlyRole(MINT_AND_BURN_ROLE) {
        _mintAccruedInterest(_from);
        if (_amount == type(uint256).max) {
            _amount = balanceOf(_from);
        }
        _burn(_from, _amount);
    }

    //s转账（转账前结算双方利息）
    function transfer(
        address _recipient,
        uint256 _amount
    ) public override returns (bool) {
        _mintAccruedInterest(msg.sender);
        _mintAccruedInterest(_recipient);
        if (_amount == type(uint256).max) {
            _amount = balanceOf(msg.sender);
        }
        if (super.balanceOf(_recipient) == 0) {
            s_userInterestRate[_recipient] = s_userInterestRate[msg.sender];
        }
        return super.transfer(_recipient, _amount);
    }

    //转账（转账前结算双方利息）
    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) public override returns (bool) {
        _mintAccruedInterest(_sender);
        _mintAccruedInterest(_recipient);
        if (_amount == type(uint256).max) {
            _amount = balanceOf(_sender);
        }
        if (super.balanceOf(_recipient) == 0) {
            s_userInterestRate[_recipient] = s_userInterestRate[_sender];
        }
        return super.transferFrom(_sender, _recipient, _amount);
    }

    //计算用户利息并铸币
    function _mintAccruedInterest(address _user) internal {
        //本金余额
        uint256 previousPrincipalBalance = super.balanceOf(_user);
        //当前余额（含利息的余额）
        uint256 currentBalance = balanceOf(_user);
        //利息增加量
        uint256 balanceIncrease = currentBalance - previousPrincipalBalance;
        s_userLastUpdateTimestamp[_user] = block.timestamp;
        _mint(_user, balanceIncrease);
    }

    //计算用户余额（本金+利息） 计算公式 余额 = 本金 * (1+利率*时间)
    function balanceOf(address _user) public view override returns (uint256) {
        return
            (super.balanceOf(_user) *
                _calculateUserAccumulatedInterestSinceLastUpdate(_user)) /
            PRECISION_FACTOR;
    }

    //用户利息计算公式（1+利率*时间）
    function _calculateUserAccumulatedInterestSinceLastUpdate(
        address _user
    ) internal view returns (uint256) {
        uint256 timeElapsed = block.timestamp -
            s_userLastUpdateTimestamp[_user];
        uint256 linearInterest = PRECISION_FACTOR +
            (s_userInterestRate[_user] * timeElapsed);
        return linearInterest;
    }

    //获取初始全局利率
    function getInterestRate() external view returns (uint256) {
        return s_interestRate;
    }

    //获取用户利率
    function getUserInterestRate(
        address _user
    ) external view returns (uint256) {
        return s_userInterestRate[_user];
    }
}
