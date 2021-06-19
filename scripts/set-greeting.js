const fs = require("fs");
const ethers = require("ethers");

console.log("hello");
console.log(process.env.CONTRACT_ADDRESS);

async function main() {
  try {
    const json = fs.readFileSync('./artifacts/contracts/Greeter.sol/Greeter.json', 'utf8');
    const Greeter = JSON.parse(json);
    const greeterAddress = process.env.CONTRACT_ADDRESS;
    const provider = new ethers.getDefaultProvider("http://localhost:8545");
    // const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
    const transaction = await contract.setGreeting("Something");
    await transaction.wait();
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
