var NFTCollection = artifacts.require("./ELEN_E6883_NFT.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"","TOKEN NAME","SYMBOL");
};
