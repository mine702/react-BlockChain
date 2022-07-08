// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract BuyHouse {

  struct HouseInfo{
    string locations;
    string sellerName;
    string sellerImg;
    string buyerName;    
    string houseAddress;
    uint256 housePrice;
  }

  event BuyLogText(string sellerName, string buyerName, string houseAddress, uint256 housePrice);

  HouseInfo[] public House;

  function buyRealEstate(address sellerAddress, string locations, string sellerName,string sellerImg, string buyerName, string houseAddress, uint256 housePrice )public payable{
    sellerAddress.transfer(msg.value);
    House.push(HouseInfo(locations,sellerName,sellerImg,buyerName,houseAddress,housePrice));
    emit BuyLogText(sellerName ,buyerName , houseAddress , housePrice );
  }

  function readRealEstate() public view returns(HouseInfo[] memory){
      return House;    
  }
}
