import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { FhevmType } from "@fhevm/hardhat-plugin";

task("task:address", "Prints the TZama address").setAction(async function (_taskArguments: TaskArguments, hre) {
  const { deployments } = hre;

  const token = await deployments.get("TZama");
  console.log("TZama address is " + token.address);
});

task("task:faucet", "Mints tZama test tokens for an account")
  .addOptionalParam("address", "Optional TZama contract address")
  .addOptionalParam("to", "Recipient address (defaults to first signer)")
  .addOptionalParam("amount", "Token amount to mint (defaults to 1000)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers } = hre;
    const amount = taskArguments.amount ? BigInt(taskArguments.amount) : 1000n;

    if (amount <= 0n) {
      throw new Error("Amount must be greater than zero");
    }

    const tokenDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("TZama");

    const [signer] = await ethers.getSigners();
    const recipient = taskArguments.to ?? signer.address;

    const token = await ethers.getContractAt("TZama", tokenDeployment.address);

    const tx = await token.faucet(recipient, Number(amount));
    console.log(`Waiting for faucet transaction ${tx.hash}...`);
    await tx.wait();
    console.log(`Minted ${amount} tZama to ${recipient}`);
  });

task("task:stake", "Stakes tZama tokens using encrypted input")
  .addParam("value", "Amount to stake")
  .addOptionalParam("address", "Optional TZama contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;
    const value = parseInt(taskArguments.value, 10);
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("Argument --value must be a positive integer");
    }

    await fhevm.initializeCLIApi();

    const tokenDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("TZama");
    const [signer] = await ethers.getSigners();
    const token = await ethers.getContractAt("TZama", tokenDeployment.address);

    const encryptedValue = await fhevm
      .createEncryptedInput(tokenDeployment.address, signer.address)
      .add64(value)
      .encrypt();

    const tx = await token.connect(signer).stake(encryptedValue.handles[0], encryptedValue.inputProof);
    console.log(`Waiting for stake transaction ${tx.hash}...`);
    await tx.wait();
    console.log(`Staked ${value} tZama`);
  });

task("task:unstake", "Unstakes tZama tokens using encrypted input")
  .addParam("value", "Amount to unstake")
  .addOptionalParam("address", "Optional TZama contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;
    const value = parseInt(taskArguments.value, 10);
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("Argument --value must be a positive integer");
    }

    await fhevm.initializeCLIApi();

    const tokenDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("TZama");
    const [signer] = await ethers.getSigners();
    const token = await ethers.getContractAt("TZama", tokenDeployment.address);

    const encryptedValue = await fhevm
      .createEncryptedInput(tokenDeployment.address, signer.address)
      .add64(value)
      .encrypt();

    const tx = await token.connect(signer).unstake(encryptedValue.handles[0], encryptedValue.inputProof);
    console.log(`Waiting for unstake transaction ${tx.hash}...`);
    await tx.wait();
    console.log(`Unstaked ${value} tZama`);
  });

task("task:balances", "Decrypts wallet and staking balances for the first signer")
  .addOptionalParam("address", "Optional TZama contract address")
  .addOptionalParam("user", "Specific user address to inspect")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const tokenDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("TZama");
    const token = await ethers.getContractAt("TZama", tokenDeployment.address);

    const [defaultSigner] = await ethers.getSigners();
    const userAddress = taskArguments.user ?? defaultSigner.address;

    const encryptedWalletBalance = await token.confidentialBalanceOf(userAddress);
    const encryptedStakedBalance = await token.getStakedBalance(userAddress);
    const encryptedTotalStaked = await token.getTotalStaked();

    const walletBalance =
      encryptedWalletBalance === ethers.ZeroHash
        ? 0n
        : await fhevm.userDecryptEuint(
            FhevmType.euint64,
            encryptedWalletBalance,
            tokenDeployment.address,
            defaultSigner,
          );
    const stakedBalance =
      encryptedStakedBalance === ethers.ZeroHash
        ? 0n
        : await fhevm.userDecryptEuint(
            FhevmType.euint64,
            encryptedStakedBalance,
            tokenDeployment.address,
            defaultSigner,
          );
    const totalStaked =
      encryptedTotalStaked === ethers.ZeroHash
        ? 0n
        : await fhevm.userDecryptEuint(
            FhevmType.euint64,
            encryptedTotalStaked,
            tokenDeployment.address,
            defaultSigner,
          );

    console.log(`Balances for ${userAddress}`);
    console.log(`  Wallet balance : ${walletBalance.toString()} tZama`);
    console.log(`  Staked balance : ${stakedBalance.toString()} tZama`);
    console.log(`  Total staked   : ${totalStaked.toString()} tZama`);
  });
