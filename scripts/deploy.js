const hre = require("hardhat");

async function main() {
  const GetPaid = await hre.ethers.getContractFactory("GetPaid");
  const getPaid = await GetPaid.deploy();
  await getPaid.deployed();
  console.log("getPiad deployed to:", getPaid.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });