const hre = require("hardhat");

async function main() {
  // const FSToken = await hre.ethers.getContractFactory("FSToken");
  // const fstoken = await FSToken.deploy(1000, 10);

  // await fstoken.deployed();

  // console.log("FSToken deployed to:", fstoken.address); //0xd64DB5e13532838e0D7c4431B345e29eA3cC376e

  const FactStation = await hre.ethers.getContractFactory("FactStation");
  const factstation = await FactStation.deploy();

  await factstation.deployed();

  console.log("FactStation deployed to:", factstation.address); // 0x767df7702C19a6aa51BB839C2AE871e76fc83845
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
