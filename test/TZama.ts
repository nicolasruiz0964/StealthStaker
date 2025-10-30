import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { TZama, TZama__factory } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

describe("TZama", function () {
  let deployer: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let contract: TZama;
  let contractAddress: string;

  before(async function () {
    const signers = await ethers.getSigners();
    [deployer, alice] = [signers[0], signers[1]];
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    const factory = (await ethers.getContractFactory("TZama")) as TZama__factory;
    contract = (await factory.deploy()) as TZama;
    contractAddress = await contract.getAddress();
  });

  async function decryptBalance(
    signer: HardhatEthersSigner,
    encrypted: string,
  ): Promise<bigint> {
    if (encrypted === ethers.ZeroHash) {
      return 0n;
    }
    return fhevm.userDecryptEuint(FhevmType.euint64, encrypted, contractAddress, signer);
  }

  it("mints, stakes, and unstakes tokens confidentially", async function () {
    const faucetAmount = 1_000;
    const stakeAmount = 400;

    const faucetTx = await contract.connect(deployer).faucet(alice.address, faucetAmount);
    await faucetTx.wait();

    const encryptedWalletAfterFaucet = await contract.confidentialBalanceOf(alice.address);
    const clearWalletAfterFaucet = await decryptBalance(alice, encryptedWalletAfterFaucet);
    expect(clearWalletAfterFaucet).to.equal(BigInt(faucetAmount));

    const stakeInput = await fhevm
      .createEncryptedInput(contractAddress, alice.address)
      .add64(stakeAmount)
      .encrypt();

    const stakeTx = await contract
      .connect(alice)
      .stake(stakeInput.handles[0], stakeInput.inputProof);
    await stakeTx.wait();

    const encryptedWalletAfterStake = await contract.confidentialBalanceOf(alice.address);
    const encryptedStaked = await contract.getStakedBalance(alice.address);
    const encryptedTotalStaked = await contract.getTotalStaked();

    const clearWalletAfterStake = await decryptBalance(alice, encryptedWalletAfterStake);
    const clearStaked = await decryptBalance(alice, encryptedStaked);
    const clearTotalStaked = await decryptBalance(alice, encryptedTotalStaked);

    expect(clearWalletAfterStake).to.equal(BigInt(faucetAmount - stakeAmount));
    expect(clearStaked).to.equal(BigInt(stakeAmount));
    expect(clearTotalStaked).to.equal(BigInt(stakeAmount));

    const unstakeInput = await fhevm
      .createEncryptedInput(contractAddress, alice.address)
      .add64(stakeAmount)
      .encrypt();

    const unstakeTx = await contract
      .connect(alice)
      .unstake(unstakeInput.handles[0], unstakeInput.inputProof);
    await unstakeTx.wait();

    const encryptedWalletAfterUnstake = await contract.confidentialBalanceOf(alice.address);
    const encryptedStakedAfterUnstake = await contract.getStakedBalance(alice.address);
    const encryptedTotalAfterUnstake = await contract.getTotalStaked();

    const clearWalletAfterUnstake = await decryptBalance(alice, encryptedWalletAfterUnstake);
    const clearStakedAfterUnstake = await decryptBalance(alice, encryptedStakedAfterUnstake);
    const clearTotalAfterUnstake = await decryptBalance(alice, encryptedTotalAfterUnstake);

    expect(clearWalletAfterUnstake).to.equal(BigInt(faucetAmount));
    expect(clearStakedAfterUnstake).to.equal(0n);
    expect(clearTotalAfterUnstake).to.equal(0n);
  });
});
