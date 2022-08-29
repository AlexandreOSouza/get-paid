const { expect, assert } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe("GetPaid", function() {
    it("Can Send money", async function() {
        const GetPaid = await ethers.getContractFactory("GetPaid")
        const [contractAddress, senderAddress] = await ethers.getSigners()
        const getPaid = await GetPaid.deploy(contractAddress.address)
        await getPaid.deployed()
    
        let transactionCount = await getPaid.transactionsCount()

        const result = await getPaid.send(senderAddress.address, { value: 1 })
        
        
        const tx = await result.wait()
        
        const SendedEvent = tx.events[0].args
        console.log(SendedEvent)
        // console.log(Sended)

        assert.equal(SendedEvent.to, senderAddress.address, "To address is correct")
    })
})