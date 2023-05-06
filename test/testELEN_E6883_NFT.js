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
    
    //*** VK added code #3 ***
    it("TC2: transfer ownership.", async () => {

        const currOwner = await getOwner(1216);
        await setOwner(1218, msg.sender);
        const newOwner = await getOwner(1218);

        assert.notEqual(currOwner, newOwner, "The owners are not distinct.");
    });
    
    it("TC3: List NFT.", async () => {
        await createSale (1216, 110)
        const price = await getPrice(1216);
        assert.equal(price, 1216, "The price does not match.");
    });
    
    it("TC4: delist NFT.", async () => {
        await delistNFT (1216)
        const aOwner = await getOwner(1216);
        assert.equal(aOwner, NaN, "Delist NFT was not done.");
    });
    
    it("TC5: Sell NFT.", async () => {
        const currOwner = await getOwner(1216);
        await sellNFT (1216);
        const newOwner = await getOwner(1216);
        assert.notEqual(currOwner, newOwner, "Sell unsucessful.");
    });

    it("TC6: Unsuccessful Sell NFT.", async () => {
        const currOwner = await getOwner(1216);
        await cancelSale (1216);
        const newOwner = await getOwner(1216);
        assert.equal(currOwner, newOwner, "Sell Cancel order failed.");
    });
    //*** VK end code #3 ***   
});
