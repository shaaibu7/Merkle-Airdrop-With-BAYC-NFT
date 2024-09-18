// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "solmate/src/utils/MerkleProofLib.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IERC721.sol";


contract MerkleAirdrop {
    address public tokenAddress;
    bytes32 public merkleRoot;
    address public owner;

    address BoredApeYatchClubNFTContractAddress = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;

    constructor (address _tokenAddress, bytes32 _merkleRoot) {
        tokenAddress = _tokenAddress;
        merkleRoot = _merkleRoot;
        owner = msg.sender;
    }

    error addressHaveClaimedAirdropAlready();

    // map address to bool to check for addresses that have claimed token
    mapping(address => bool) claimedAirdrop;    
    // event to emit when user successfully claims tokens

    event airdropClaimedSuccessfully(address userAddress, uint256 amount);

    function claimAirdrop(address userAddress, uint256 amount, bytes32[] calldata merkleRootProof) external payable returns(bool confirm_) {
        // check if userAddress has already claimed token
        if(claimedAirdrop[userAddress]) {
            revert addressHaveClaimedAirdropAlready();
        }

        // verifying userAddress and amount to make sure it is part of the merkle tree
        bytes32 leaf = keccak256(abi.encodePacked(userAddress, amount));
        confirm_ = MerkleProofLib.verify(merkleRootProof, merkleRoot, leaf);
        uint256 userNft = IERC721(BoredApeYatchClubNFTContractAddress).balanceOf(msg.sender);

        if (confirm_) {
            if(userNft > 0) {
                claimedAirdrop[userAddress] = true;
                IERC20(tokenAddress).transfer(userAddress, amount);
                emit airdropClaimedSuccessfully(userAddress, amount);
            
            }
        }

    }

    function updateContract(bytes32 _merkleRoot) external {
        // Ensure only the owner can call this function
        if(msg.sender == owner) {
            // Updating merkleRoot
            merkleRoot = _merkleRoot;
            //Checking ERC20 token balance of the contract
            uint256 contractRemainingTokens = IERC20(tokenAddress).balanceOf(address(this));
            // transferring ERC20 token to owner account
            IERC20(tokenAddress).transfer(msg.sender, contractRemainingTokens);

        }
    }
}