//SPDX-License-Identifier: MIT

var ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");
const util = require('util')

function getErrorMessage(error) {
    if (error instanceof Error) return error.message
    return String(error)
}

const createNFT = async (unique_id, name, description) => {
    try {
        const nftObject =  "data:application/json;base64," + btoa(JSON.stringify({name : name, description : description}));
        const nftContract = await ELEN_E6883_NFT.deployed();
        const txn = await nftContract.createNFT(unique_id, nftObject);
    } catch(err) {
        console.log('Doh! ', getErrorMessage(err));
    }
}

module.exports = createNFT;
