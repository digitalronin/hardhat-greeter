// https://hardhat.org/tutorial/deploying-to-a-live-network.html
// Run with:
//
//     npx hardhat run scripts/deploy.js --network ropsten
//
async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Ropsten Greeter");

  console.log("Greeter address:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
