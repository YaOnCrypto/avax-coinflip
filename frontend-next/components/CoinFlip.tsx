import React, { useContext, useEffect, useState } from "react";
import { CoinFlipContext } from "./../hardhat/SymfoniContext";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {Button, Form} from "react-bootstrap"

interface Props {}

export const CoinFlip: React.FC<Props> = () => {
  const greeter = useContext(CoinFlipContext);
  const [message, setMessage] = useState("");
  const [inputGreeting, setInputGreeting] = useState("");
  useEffect(() => {
    const doAsync = async () => {
      if (!greeter.instance) return;
      console.log("Coinflip is deployed at ", greeter.instance.address);
      console.log(greeter.instance)
      setMessage('message');
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async () => {
    if (!greeter.instance) throw Error("Greeter instance not ready");
    if (greeter.instance) {
      const tx = await greeter.instance.fundContract({
        value: ethers.utils.parseEther(inputGreeting)
    });
      console.log("setGreeting tx", tx);
      await tx.wait();
      const _message = await greeter.instance.getBalance();
      console.log("Contract balance: ", formatUnits(_message));
      setInputGreeting("");
    }
  };
  return (
    <div> 
      <img className="avac-coin" width="75%" src="https://www.avaxcoinflip.com/smolgoldt.png"/>
      {/* <input
      type="number"
        value={inputGreeting}
        onChange={(e) => setInputGreeting(e.target.value)}
      ></input>
      <button onClick={() => handleSetGreeting()}>Set greeting</button> */}
      <div className="flip-form">
      <Form.Control size="lg" type="text" placeholder="Normal text" />
      <button className="flip-button">Flip</button>
      </div>
    </div>
  );
};
