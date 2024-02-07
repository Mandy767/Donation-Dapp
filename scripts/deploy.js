const hre = require("hardhat");

async function main() {
  const Donation = await hre.ethers.deployContract("donation");

  await Donation.waitForDeployment();

  console.log("deployed to", `${Donation.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
