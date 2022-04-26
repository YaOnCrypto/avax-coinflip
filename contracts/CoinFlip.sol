//SPDX-License-Identifier: unlicensed
pragma solidity >=0.4.22 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";



contract CoinFlip is Ownable {

    using SafeMath for uint8;
    using SafeMath for uint256;


    uint8 public betFee;
    uint public flipNum;

    event bet(
        address indexed user,
        uint256 indexed bet,
        bool indexed win,
        uint8 side
    );
    event funded(address owner, uint256 funding);

    // Function to simulate coin flip 50/50 randomness
    function flip(uint8 side) public payable {
        require(
            address(this).balance >= msg.value * 2,
            "The contract does not have enough funds"
        );
        require(side == 0 || side == 1, "Incorrect side input, needs to be 0 or 1");
        bool win;
        uint keccakNow = uint(keccak256(abi.encodePacked(block.timestamp)));
        if (keccakNow % 2 == side) {
            payable(msg.sender).transfer(SafeMath.div(SafeMath.mul(msg.value,betFee),100));
            win = true;
        } else {
            win = false;
        }
        emit bet(msg.sender, msg.value, win, side);
    }


    // Function to Withdraw Funds
    function withdrawContract(uint amount) public onlyOwner returns (uint256) {
        require(amount != 0);
        payable(msg.sender).transfer(amount^18);
        return address(this).balance;
    }

    // Function to get the Balance of the Contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //Function to set the fee
    function setBetFee(uint8 _percent) public{
        betFee = _percent;
    }

    // Fund the Contract
    function fundContract() public payable {
        require(msg.value != 0);
        emit funded(msg.sender, msg.value);
    }
}