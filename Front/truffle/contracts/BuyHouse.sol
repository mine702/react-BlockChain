// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;

contract BuyHouse {

  function buyRealEstate(address sellerAddress)public payable{
    sellerAddress.transfer(msg.value);
  }
}
