import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import GetPaid from '../../artifacts/contracts/GetPaid.sol/GetPaid.json'

import { contractAddress } from '../../.config';

const Paid = () => {

    const [ address, setAddress ] = useState('')
    const [contract, setContract ] = useState()
    const [transactionCount, setTransactionCount] = useState(0)

    const connect = async () => {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)

        const signer = provider.getSigner()

        const address = await signer.getAddress()
        setAddress(address)

        const contract = new ethers.Contract(contractAddress, GetPaid.abi, signer)
        setContract(contract)
        const count = await contract.transactionsCount()
        setTransactionCount(count.toNumber())
    }

    useEffect(() => {
        connect()
    }, [])
    
    const handlePay = async (e) => {
        e.preventDefault()
        const value = e.target.amout.value
        const to = e.target.address.value

        const sendValue = ethers.utils.parseUnits(value, 'ether')

        const tx = await contract.send(to, {value: sendValue})
        const wait = await tx.wait()
        
        const event = {
            to: wait.events[0].args.to,
            from: wait.events[0].args.from,
            value: wait.events[0].args.value
        }
        console.log(event)
        

    }

    return (
        <>
            <h1>Pay</h1>
            {address ? (<h2>{address}</h2>) : (<button onClick={connect}>Connect</button>)}
            {transactionCount && <p>Number of transactions {transactionCount}</p>}
            <form onSubmit={handlePay}>
                <input id={'amout'} type={'text'} placeholder={'amout'} />
                <input id={'address'} type={'text'} placeholder={'Pay for (address)'} />
                <button type={'submit'} >Pay</button>
            </form>
            
        </>
    )
}

export default Paid
