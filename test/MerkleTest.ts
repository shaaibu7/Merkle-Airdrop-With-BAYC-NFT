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

  async function MerkleAirdropWithNFT() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const TOKEN_ADDRESS = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
    const MERKLE_ROOT = [
      "0x0690c772cb276d8f2155fc3d9ecbd681254716a697b310f5992260397813517b",
      "0xd975aff035182e40b4edd7987a2c2155b779745b7a750040ac88e632c7b88d05"
    ];


    const MerkleAirdropWithNFTContract = await hre.ethers.getContractFactory("MerkleAirdropWithNFT");
    const MerkleAirdropWithNFT = await MerkleAirdropWithNFTContract.deploy(TOKEN_ADDRESS);

    return { MerkleAirdropWithNFT, owner };
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      
    });

    
  });

  
});

