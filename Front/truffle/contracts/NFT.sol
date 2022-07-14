pragma solidity ^0.8.1;
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private deedId; // 디지털 인증서의 고유번호

    constructor() ERC721("House","HouseNFT") {}

    mapping(uint => string) tokenURIs;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function mintNFT(address to, string memory tokenURI) public returns (uint256)
    {
        deedId.increment();
        uint256 newDeedId = deedId.current();
        _mint(to,newDeedId);
        tokenURIs[newDeedId] = tokenURI;
        return newDeedId;
    }

    function showTokenOwner(uint256 tokenId) public view returns(address){
        address tokenOwner = ownerOf(tokenId);
        return tokenOwner;
    }
}