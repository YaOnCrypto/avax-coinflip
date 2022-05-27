import React, { useContext, useEffect, useState } from "react";
// import { CoinFlipContext } from "./../hardhat/SymfoniContext";
import { formatUnits } from "ethers/lib/utils";
import { Form, Modal, Button } from "react-bootstrap";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { contractAddress, contractAbi } from "ContractInfo"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CoinFlip = () => {
    const { Moralis, account, chainId } = useMoralis();
    const ethers = Moralis.web3Library;
    // const greeter = useContext(CoinFlipContext);
    const greeter = '';
    const [message, setMessage] = useState("");
    const [inputValue, setInputValue] = useState("1.5");
    const [inputSide, setInputSide] = useState("0");
    const [inputRandom, setInputRandom] = useState("0")
    const [isFlipping, setIsFlipping] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [flipInfo, setFlipInfo] = useState({});
    const [amtBet, setAmtBet] = useState({});
    const [flipContract, setFlipContract] = useState()


    useEffect(() => {
        const doAsync = async () => {
            let _contract = await initContract()
            setFlipContract(_contract)
        };
        doAsync();
    }, []);

    const initContract = async () => {
        const provider = await Moralis.enableWeb3();
        let signer = provider.getSigner(account);
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        return contract
    }

    const flip = async (amt, side) => {
        if (!flipContract) throw Error("Contract instance not ready");
        if (amt <= 0) {
            toast.error("Value must be above 0")
            return
        }

        try {
            setIsFlipping(true)
            var flipNum = (amt * Math.pow(10, 18)) //convert eth to wei
            const tx = await flipContract.flip(side, { value: ethers.utils.parseUnits(flipNum.toString(), "wei") })
            const rc = await tx.wait();
            const event = rc.events.find(event => event.event === 'bet');
            const betInfo = event.args

            console.log(betInfo)
            setFlipInfo(betInfo)
            setAmtBet(ethers.utils.formatEther(parseInt(betInfo[1]._hex, 16).toString()))
            setModalShow(true)
            setIsFlipping(false)
            toast.success("Success");

            setInputValue("");
        }
        catch (e) {
            console.error(e);
            toast.error(e.message);
            setIsFlipping(false)
            setInputValue("");
        }
    }


    return (
        <div className={isFlipping ? "page-disabled" : ""}>
            <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={1000}
                limit={3}
                hideProgressBar={true}
            />

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                contentClassName="flip-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You {flipInfo[2] ? "Won 🎉" : "Lost 💀"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bet: {flipInfo[3] == "1" ? "Tails" : "Heads"} <br />
                        Amount: {amtBet} AVAX
                    </p>
                </Modal.Body>
            </Modal>

            <div className="flip-whole">
                <div className="flip-mid">

                    {isFlipping ? <img
                        className="avax-coin"
                        src="https://gateway.pinata.cloud/ipfs/QmPZmgchPZUJBSzxxTifuLgJYa2v2QHj9bTmD9x3JQ5uZz"
                    /> : <img
                        className="avax-coin"
                        src="https://www.avaxcoinflip.com/smolgoldt.png"
                    />}

                    <div className="flip-form">
                        <Form.Control
                            value={inputValue}
                            size="lg"
                            type="number"
                            placeholder="Bet amount"
                            onChange={(e) => {
                                e.target.value.length < 8 && setInputValue(e.target.value)
                            }}
                        />
                        <button className="flip-button" onClick={() => { flip(inputValue, inputSide) }}>
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
                    <div className="settings-show">{inputSide == "1" ? "Tails" : "Heads"}</div>
                    <div className="settings-show">{inputValue != '' ? inputValue : 0} AVAX</div>
                </div>

            </div>
        </div>
    );
};
