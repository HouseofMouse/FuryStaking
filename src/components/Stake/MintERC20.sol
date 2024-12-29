// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.4;

import "https://github.com/CryptoFamilyNFT/contractoken/blob/main/PLNTRewards.sol";
import "@openzeppelin/contracts/token/ERC721/ERC20Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC20Enumerable.sol";

contract BNK is Ownable, IERC721Receiver {

    PLNTRewards token;

    constructor(PLNTRewards _token) { 
    token = _token;
  }

  function mint(address to, uint256 amount) external {
    _balances[to] = _balances[to].add(amount);
    _mint(to, amount);
  }
}