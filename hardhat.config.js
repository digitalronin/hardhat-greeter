require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

const fs = require("fs");

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async taskArgs => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("get-greeting", "Outputs the Greeter.greeting string")
  .setAction(async ({ string }) => {
    const json = fs.readFileSync('./artifacts/contracts/Greeter.sol/Greeter.json', 'utf8');
    const Greeter = JSON.parse(json);
    const greeterAddress = process.env.CONTRACT_ADDRESS;
    const greeter = await ethers.getContractAt(Greeter.abi, greeterAddress);

    const message =  await greeter.greet();
    console.log({ message });
  });

task("set-greeting", "Outputs the Greeter.greeting string")
  .addParam("string", "The new greeting string")
  .setAction(async ({ string }) => {
    const json = fs.readFileSync('./artifacts/contracts/Greeter.sol/Greeter.json', 'utf8');
    const greeterAddress = process.env.CONTRACT_ADDRESS;
    const Greeter = JSON.parse(json);
    const [signer] = await ethers.getSigners();
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

    const transaction = await contract.setGreeting(string);
    await transaction.wait();

    console.log(`Set greeting to ${string}`);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};

