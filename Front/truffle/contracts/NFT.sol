// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private deedId; // 디지털 인증서의 고유번호 , 단순정수형태

    constructor() ERC721("BearImg","Bear") {} // Apeach이름으로 ERC721 토큰배포하겠다 Apc : 심볼

    mapping(uint => string) tokenURIs; // 피나타로 배포한 URI //  key 는 deedId

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
    } // adress to 로 받은 주소를 통해  tokenURI return 
}