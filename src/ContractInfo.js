const contractAddress = '0xc144F2c28E45C74A3f8a4C3fba44B91614A65E2e'
const contractAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "bet",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bool",
                "name": "win",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "side",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "random",
                "type": "uint256"
            }
        ],
        "name": "bet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "funding",
                "type": "uint256"
            }
        ],
        "name": "funded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "betShare",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "side",
                "type": "uint8"
            }
        ],
        "name": "flip",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fundContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_percent",
                "type": "uint8"
            }
        ],
        "name": "setBetShare",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawContract",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export { contractAbi, contractAddress }