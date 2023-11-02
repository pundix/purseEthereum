// npx hardhat run scripts/deploy.js --network sepolia
// npx hardhat verify --constructor-args arguments.js --network goerli 0xContractAddress...
// npx hardhat verify --network sepolia 0xc26465Bccc88eeF6bb3af0376f918f6C7A4548A8

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

function tokens(n) {
  return hre.ethers.parseEther(n);
}

async function main() {

  const owner = "0x43aC6015A08dE388B94fd5406A6Ea71fA880b4b0"

  /*********************************************************************
   ***************** Deploy PURSETOKEN *********************************
   *********************************************************************/

  const PurseToken = await ethers.getContractFactory("PurseToken");
  // const multiCall = await upgrades.upgradeProxy(multiCal, MultiCall, {kind: "uups", timeout: '0', pollingInterval: '1000'});
  const purseToken = await upgrades.deployProxy(PurseToken, [owner, owner, owner, owner], {kind: "uups", timeout: '0', pollingInterval: '1000'});
  await purseToken.waitForDeployment();
  
  console.log("Contract address:", await purseToken.getAddress(), purseToken.target);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





