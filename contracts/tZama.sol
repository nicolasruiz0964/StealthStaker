// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.27;

import {ERC7984} from "@openzeppelin/confidential-contracts/token/ERC7984/ERC7984.sol";
import {FHESafeMath} from "@openzeppelin/confidential-contracts/utils/FHESafeMath.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE, euint64, externalEuint64} from "@fhevm/solidity/lib/FHE.sol";

contract TZama is ERC7984, SepoliaConfig {

    mapping(address => euint64) private _stakedBalances;
    euint64 private _totalStaked;

    event FaucetMinted(address indexed account, euint64 amount);
    event Staked(address indexed account, euint64 amount);
    event Unstaked(address indexed account, euint64 amount);

    constructor() ERC7984("tZama", "tZama", "") {}

    function faucet(address to, uint64 amount) external returns (euint64 mintedAmount) {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");

        euint64 encryptedAmount = FHE.asEuint64(amount);
        mintedAmount = _mint(to, encryptedAmount);

        FHE.allow(mintedAmount, to);
        FHE.allowThis(mintedAmount);

        emit FaucetMinted(to, mintedAmount);
    }

    function stake(
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external returns (euint64 stakedAmount) {
        euint64 amount = FHE.fromExternal(encryptedAmount, inputProof);
        euint64 transferred = _transfer(msg.sender, address(this), amount);

        euint64 previousStake = _normalizeEncrypted(_stakedBalances[msg.sender]);
        (, euint64 updatedUserStake) = FHESafeMath.tryIncrease(previousStake, transferred);
        _stakedBalances[msg.sender] = updatedUserStake;
        FHE.allowThis(updatedUserStake);
        FHE.allow(updatedUserStake, msg.sender);

        stakedAmount = FHE.sub(updatedUserStake, previousStake);
        FHE.allowThis(stakedAmount);
        FHE.allow(stakedAmount, msg.sender);

        (, euint64 updatedTotal) = FHESafeMath.tryIncrease(_normalizeEncrypted(_totalStaked), stakedAmount);
        _totalStaked = updatedTotal;
        FHE.allowThis(updatedTotal);
        FHE.allow(updatedTotal, msg.sender);

        emit Staked(msg.sender, stakedAmount);
    }

    function unstake(
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external returns (euint64 unstakedAmount) {
        euint64 requestAmount = FHE.fromExternal(encryptedAmount, inputProof);
        euint64 currentStake = _normalizeEncrypted(_stakedBalances[msg.sender]);

        (, euint64 updatedStake) = FHESafeMath.tryDecrease(currentStake, requestAmount);
        _stakedBalances[msg.sender] = updatedStake;
        FHE.allowThis(updatedStake);
        FHE.allow(updatedStake, msg.sender);

        euint64 withdrawable = FHE.sub(currentStake, updatedStake);
        FHE.allowThis(withdrawable);
        FHE.allow(withdrawable, msg.sender);

        (, euint64 updatedTotal) = FHESafeMath.tryDecrease(_normalizeEncrypted(_totalStaked), withdrawable);
        _totalStaked = updatedTotal;
        FHE.allowThis(updatedTotal);
        FHE.allow(updatedTotal, msg.sender);

        unstakedAmount = _transfer(address(this), msg.sender, withdrawable);

        FHE.allowThis(unstakedAmount);
        FHE.allow(unstakedAmount, msg.sender);

        emit Unstaked(msg.sender, unstakedAmount);
    }

    function getStakedBalance(address account) external view returns (euint64) {
        return _stakedBalances[account];
    }

    function getTotalStaked() external view returns (euint64) {
        return _totalStaked;
    }

    function _normalizeEncrypted(euint64 value) private returns (euint64) {
        if (!FHE.isInitialized(value)) {
            return FHE.asEuint64(0);
        }
        return value;
    }
}
