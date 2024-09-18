import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("MerkleAirdropWithNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  // async function deployToken() {
  //   // Contracts are deployed using the first signer/account by default
  //   const [owner, otherAccount] = await hre.ethers.getSigners();

  //   const erc20Token = await hre.ethers.getContractFactory("Web3CXI");
  //   const token = await erc20Token.deploy();

  //   return { token };
  // }

  async function deployMerkleAirdropWithNFT() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const TOKEN_ADDRESS = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
    const MERKLE_ROOT = "0x7f131dc43ab381310ccf5bc48d21adc8a814e10c7d3b6c19780a05a21ab41a2c";

    const merkleBytes32 = ethers.hexlify(ethers.randomBytes(32));


    const MerkleAirdropWithNFTContract = await hre.ethers.getContractFactory("MerkleAirdropWithNFT");
    const MerkleAirdropWithNFT = await MerkleAirdropWithNFTContract.deploy(TOKEN_ADDRESS, MERKLE_ROOT);

    return { MerkleAirdropWithNFT, owner };
  }

  describe("Tsting Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { MerkleAirdropWithNFT, owner } = await loadFixture(deployMerkleAirdropWithNFT);

      expect(await MerkleAirdropWithNFT.owner()).to.eq(owner);
    });

    
  });

  
});

