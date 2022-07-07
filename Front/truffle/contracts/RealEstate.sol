// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract RealEstate {
  struct HouseInfo{
    string sellerName;
    string buyerName;
    string houseAddress;
    uint256 housePrice;
  }

  address owner;
  
  event BuyLogText(string sellerName, string buyerName, string houseAddress, uint256 housePrice);

  constructor() public{
    owner = msg.sender;
  }

  HouseInfo[] public Deajeon;
  HouseInfo[] public Seoul;

  function PrintAddress() public view returns(address){
    return owner;
  }
  
  function buyRealEstate(address sellerAddress, string locations, string sellerName, string buyerName, string houseAddress, uint256 housePrice )public payable{
    sellerAddress.transfer(msg.value);

    if(keccak256(bytes(locations)) == keccak256("대전")){
      Deajeon.push(HouseInfo(sellerName,buyerName,houseAddress,housePrice));
    }

    else if(keccak256(bytes(locations)) == keccak256("서울")){
      Seoul.push(HouseInfo(sellerName,buyerName,houseAddress,housePrice));
    }

    emit BuyLogText(sellerName ,buyerName , houseAddress , housePrice );
  }

  function readRealEstate(string locations)  public view returns(HouseInfo[] memory){
    if(keccak256(bytes(locations)) == keccak256("대전")){
      return Deajeon;
    }

    else if(keccak256(bytes(locations)) == keccak256("서울")){
      return Seoul;
    }
  }
}