const hre = require("hardhat");

async function main() {
  const Donation = await hre.ethers.getContractFactory("donation");
  const donation = await Donation.deploy();

  await donation.deployed();

  console.log("Deployed contract address:", `${donation.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x985b683123FF62ee826AfEeCCE09e2dd3F3091aE
