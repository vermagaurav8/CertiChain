import hre from "hardhat";
import fs from "fs";

async function main() {
  const Certichain = await hre.ethers.getContractFactory("CertificateStore");
  const certichain = await Certichain.deploy();

  await certichain.deployed();

  console.log(`Certichain Contract deployed to `, certichain.address);
  fs.writeFileSync(
    "./config.js",
    `export const certichainAddress = "${certichain.address}"`
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
