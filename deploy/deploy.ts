import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedToken = await deploy("TZama", {
    from: deployer,
    log: true,
  });

  console.log(`TZama contract: `, deployedToken.address);
};
export default func;
func.id = "deploy_tzama"; // id required to prevent reexecution
func.tags = ["TZama"];
