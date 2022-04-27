import React, { useContext, useEffect, useState } from "react";
import { CoinFlipContext } from "./../hardhat/SymfoniContext";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Button, Form } from "react-bootstrap"

interface Props { }

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
      fundFunction('5')
    };
    doAsync();
  }, [greeter]);

  const fundFunction = async (amt: string) => {
    if (!greeter.instance) throw Error("Greeter instance not ready");
    const tx = await greeter.instance.fundContract({
      value: ethers.utils.parseEther(amt)
    });
    console.log("setGreeting tx", tx);
    await tx.wait();
    const _message = await greeter.instance.getBalance();
    console.log("Contract balance: ", formatUnits(_message));
  }

  const handleSetGreeting = async () => {
    if (!greeter.instance) throw Error("Greeter instance not ready");
    if (greeter.instance) {
      // fundFunction(inputGreeting)
      const tx = await greeter.instance.flip(0, { value: ethers.utils.parseEther(inputGreeting) })
      const receipt = await tx.wait()
      console.log(receipt.events[0].args)
      setInputGreeting("");
    }
  };
  return (
    <div>
      {/* <input
      type="number"
      value={inputGreeting}
      onChange={(e) => setInputGreeting(e.target.value)}
      ></input>
    <button onClick={() => handleSetGreeting()}>Set greeting</button> */}

      <div className="flip-whole">
        <div className="flip-mid">
          <img className="avax-coin" src="https://www.avaxcoinflip.com/smolgoldt.png" />
          <div className="flip-form">
            <Form.Control value={inputGreeting} size="lg" type="text" placeholder="Bet amount" onChange={(e) => setInputGreeting(e.target.value)} />
            <button className="flip-button" onClick={() => handleSetGreeting()} >Flip</button>
          </div>
        </div>
        <div className="flip-settings">
          <div className="side-select">
            Heads
          </div>
          <div className="side-select">
            Tails
          </div>
        </div>
      </div>
    </div>
  );
};
