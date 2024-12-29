// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.4;

import "https://github.com/CryptoFamilyNFT/AlienStaking/blob/main/PROBERewards.sol";

contract BNK is Ownable {

   PROBERewards token;

    constructor(PROBERewards _token) { 
    token = _token;
  }

  function mint(address to, uint256 amount) external {
    token.mint(to, amount);
  }
}