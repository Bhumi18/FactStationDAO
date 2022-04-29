const hre = require("hardhat");

async function main() {
  // const FSToken = await hre.ethers.getContractFactory("FSToken");
  // const fstoken = await FSToken.deploy(1000);

  // await fstoken.deployed();

  // console.log("FSToken deployed to:", fstoken.address); //0xbF0F1288b77e01113DceA826F1d8BA44e0908287

  const FactStation = await hre.ethers.getContractFactory("FactStation");
  const factstation = await FactStation.deploy();

  await factstation.deployed();

  console.log("FactStation deployed to:", factstation.address); // 0x7013DEcb7242731f352e965e4835a8019B395Ecf
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
