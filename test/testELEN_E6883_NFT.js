// const SimpleStorage = artifacts.require("./SimpleStorage.sol");
//
// contract("SimpleStorage", accounts => {
//   it("...should store the value 89.", async () => {
//     const simpleStorageInstance = await SimpleStorage.deployed();
//
//     // Set value of 89
//     await simpleStorageInstance.set(89, { from: accounts[0] });
//
//     // Get stored value
//     const storedData = await simpleStorageInstance.get.call();
//
//     assert.equal(storedData, 89, "The value 89 was not stored.");
//   });
// });

const createNFT = require("../scripts/createNFT.js");
const getURIData = require("../scripts/getURIData.js");
const ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");

contract("ELEN_E6883_NFT", accounts => {
    it("...should create a NFT with unique ID, name, and description.", async () => {
        const name = "Test NFT";
        const desc = "This is a test NFT description";

        const tokenID = await createNFT(1216, name, desc);
        const dataURI = await getURIData(1216);

        const jsonObj = atob(dataURI.substring(29));
        const result = JSON.parse(jsonObj);

        assert.equal(name, result.name, "The name was not stored.");
        assert.equal(desc, result.description, "The description was not stored.");
    });
});
