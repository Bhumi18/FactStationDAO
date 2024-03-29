require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
// import dotenv from "dotenv";

// dotenv.config({ path: "./config.env" });
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const PRIVATE_KEY = process.env.REACT_APP_PRIVATEKEY;
const infurai_url = process.env.REACT_APP_INFURIA_URL;
// console.log(infurai_url)
// console.log(require("dotenv").config())
module.exports = {
  solidity: "0.8.7",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    kovan: {
      url: infurai_url,
      accounts: [PRIVATE_KEY],
    },
  },
};
