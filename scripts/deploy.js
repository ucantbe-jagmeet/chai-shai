// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }
  async function consoleBalances(addresses) {
    let counter = 0;
    for (const address of addresses) {
      console.log(`Address ${counter} balance:`, await getBalances(address));
      counter++;
    }
  }
  async function consoleMemos(memos) {
    for (const memo of memos) {
      const timestamp = memo.timestamp;
      const name = memo.name;
      const from = memo.address;
      const message = memo.message;

      console.log(
        `At ${timestamp}, name ${name}, address ${from}, message ${message}`
      );
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
