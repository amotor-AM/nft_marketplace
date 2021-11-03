require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

const privateKey = process.env.WALLET_PRIVATE_KEY

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.MATIC_TESTNET_URL,
      accounts: [privateKey]
    },
    mainnet: {
      url: process.env.MATIC_MAINNET_URL,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};
