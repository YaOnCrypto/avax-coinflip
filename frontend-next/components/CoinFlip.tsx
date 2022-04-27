import React, { useContext, useEffect, useState } from "react";
import { CoinFlipContext } from "./../hardhat/SymfoniContext";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Form } from "react-bootstrap";

interface Props {}

export const CoinFlip: React.FC<Props> = () => {
  const greeter = useContext(CoinFlipContext);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("1.5");
  const [inputSide, setInputSide] = useState("0");

  useEffect(() => {
    const doAsync = async () => {
      if (!greeter.instance) return;
      console.log("Coinflip is deployed at ", greeter.instance.address);
      console.log(greeter.instance);
      setMessage("message");
      fundFunction("5");
    };
    doAsync();
  }, [greeter]);

  const fundFunction = async (amt: string) => {
    if (!greeter.instance) throw Error("Greeter instance not ready");
    const tx = await greeter.instance.fundContract({
      value: ethers.utils.parseEther(amt),
    });
    console.log("setGreeting tx", tx);
    await tx.wait();
    const _message = await greeter.instance.getBalance();
    console.log("Contract balance: ", formatUnits(_message));
  };

  const handleSetGreeting = async () => {
    if (!greeter.instance) throw Error("Greeter instance not ready");
    if (greeter.instance) {
      // fundFunction(inputGreeting)
      const tx = await greeter.instance.flip(inputSide, {
        value: ethers.utils.parseEther(inputValue),
      });
      const receipt = await tx.wait();
      console.log(receipt.events[0].args);
      setInputValue("");
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
          <img
            className="avax-coin"
            src="https://www.avaxcoinflip.com/smolgoldt.png"
          />
          <div className="flip-form">
            <Form.Control
              value={inputValue}
              size="lg"
              type="number"
              placeholder="Bet amount"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="flip-button" onClick={() => handleSetGreeting()}>
              Flip
            </button>
          </div>
        </div>
        <div className="flip-settings">
          <div
            onClick={() => setInputSide("0")}
            className={
              inputSide != '0'
                ? "side-select"
                : "side-select side-select-selected"
            }
          >
            Heads
          </div>
          <div
            onClick={() => setInputSide("1")}
            className={
              inputSide != '1'
                ? "side-select"
                : "side-select side-select-selected"
            }
          >
            Tails
          </div>
          <div className="settings-show">{inputSide == 1 ? "Tails" : "Heads"}</div>
          <div className="settings-show">{inputValue} AVAX</div>
        </div>
      </div>
    </div>
  );
};
