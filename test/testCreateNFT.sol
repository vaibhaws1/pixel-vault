pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestCreateNFT {

  function testItStoresAValue() public {
    string memory name = "My NFT";
    string memory desc = "A nice string to describe my NFT...how awesome is this?";

    uint newTokenID = _tokenIds.current();
    _tokenIds.increment();

    createNFT(newTokenID, name, desc);

    string memory nftObjectJson = string.concat("{ 'name' : ", name, ", 'description' : ", desc, " }");
    bytes memory nftObjectBytes = bytes(nftObjectJson);



  SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

    simpleStorage.set(89);

    uint expected = 89;

    Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}
