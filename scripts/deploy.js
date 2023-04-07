// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const nftContract = "0xab3ff8b5de78502a3e70cc651b6a71e3ab52f5e3";
  const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f";
  const flowrate = "38580246913580";

  const gasFee = hre.ethers.utils.parseEther("0.01");

  const StreamClaimable = await hre.ethers.getContractFactory("Deployer");
  // const streamClaimable = await StreamClaimable.deploy(
  //   nftContract,
  //   token,
  //   flowrate,
  //   { value: gasFee }
  // );
  const deployer = await StreamClaimable.deploy({ value: gasFee });

  await deployer.deployed();

  console.log(`${deployer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
