const path = require('path');
const fs = require('fs');
const HDWallet = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} =  require('./Compile')

const provider = new HDWallet('remind merit citizen artefact make crack until high depart swing enemy north','https://rinkeby.infura.io/v3/ff48d0e4997449d1811dda126cb51fde')
const web3 = new Web3(provider)

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['hi there']}).send({gas:'1000000',from:accounts[0],gasPrice: '5000000000',})
    console.log(result.options.address)
}
deploy();