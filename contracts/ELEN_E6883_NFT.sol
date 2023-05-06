//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ELEN_E6883_NFT is ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    // The max number of NFTs in the collection
    uint public constant MAX_SUPPLY = 10;
    // The mint price for the collection
    uint public constant PRICE = 0.00001 ether;
    // The max number of mints per wallet
    uint public constant MAX_PER_MINT = 5;

    string public baseTokenURI;
    
    //*** VK added code #1***
    struct Sale {
        address seller;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    address public _contractOwner;
    uint256 public _price;
    IERC721 public nftContract;
    mapping (uint256 => Sale) public tokenIdToSale;
    event SaleCreated(address seller, uint256 tokenId, uint256 price);
    event SaleCancelled(address seller, uint256 tokenId);
    event SaleSuccessful(address buyer, uint256 tokenId, uint256 price);
    event nftdetails(address nftAddress, uint256 tokenId);
    //*** VK end code #1 ***

    constructor(string memory baseURI, string memory name, string memory symbol) ERC721(name, symbol) {
        setBaseURI(baseURI);
    }


    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "This collection is sold out!");
        require(_count >0 && _count <= MAX_PER_MINT, "You have received the maximum amount of NFTs allowed.");
        require(msg.value >= PRICE.mul(_count), "Not enough ether to purchase NFTs.");

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    function createNFT(uint256 newTokenID, string memory data) public {
        _safeMint(msg.sender, newTokenID);
        _setTokenURI(newTokenID, data);
    }

    // Withdraw the ether in the contract
    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    // Reserve NFTs only for owner to mint for free
    function reserveNFTs(uint _count) public onlyOwner {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) < MAX_SUPPLY, "Not enough NFTs left to reserve");

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }
}

