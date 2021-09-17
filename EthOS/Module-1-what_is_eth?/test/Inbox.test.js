const assert = require('assert');
const ganache = require('ganache-cli');

//constructor function
const Web3 = require('web3');

//instance of web3
const web3 = new Web3(ganache.provider());

const {interface,bytecode} = require('../Compile')

let inbox;
let accounts;
beforeEach(async ()=>{

    //Get a list of all accounts 
    accounts = await web3.eth.getAccounts();
    //Use one of those account to deploy 

    //The contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:["hi there"]}).send({from:accounts[0],gas:'1000000'})
});

describe('Inbox',()=>{
    it("deploys a contract",()=>{
       
        assert.ok(inbox.options.address)
    })
    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,"hi there");
    })

    it('has a set message',async ()=>{
        await inbox.methods.setMessage('hi').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,"hi");
    })
})

/* class Car {

    park=()=>{
            return 'stopped';
    }
    drive=()=>{
            return 'vroom';
    }

}

let volvo ;

beforeEach(()=>{
     volvo = new Car();
     
})

describe('Car Class Test',()=>{
    it("parks",()=>{
        
        assert.equal(volvo.park(),'stopped');
    });
    it("drives",()=>{
        
        assert.equal(volvo.drive(),'vroom');
    });

}) */