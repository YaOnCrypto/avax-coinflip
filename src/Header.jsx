import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import { CoinFlip } from "components/Coinflip";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./css/style.css";
import "./css/coinflip.css"
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};


const Header = () => {
  const { isWeb3Enabled, account, enableWeb3, isAuthenticated, web3, isWeb3EnableLoading } =
    useMoralis();

  const [wrongNetwork, setWrongNetwork] = useState(false)


  useEffect(() => {
    setTimeout(() => {

      if (web3._network.chainId != 43113) setWrongNetwork(true)
      else setWrongNetwork(false)

      if (!isWeb3Enabled && !isWeb3EnableLoading)
        enableWeb3();
    }, 400)

  }, [web3]);

  const switchNetwork = () => {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0xa869",
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        chainName: "Avalanche FUJI Testnet",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18
        },
        blockExplorerUrls: ["https://testnet.explorer.avax.network/"]
      }]
    });
  }

  return (
    <>

      {/* <Modal
        size="sm"
        show={wrongNetwork}
        onHide={() => setWrongNetwork(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Wrong Network
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must be on Avalanche FUJI Testnet
          <Button>Switch to FUJI Testnet</Button></Modal.Body>
      </Modal> */}


      {wrongNetwork ? <div className="wrongNetwork-modal-back">
        <div className="wrongNetwork-modal">
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm">
              Wrong Network
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="wrongNetwork-text">You must be on Avalanche FUJI Testnet</p>
            <button onClick={() => switchNetwork()} className="wrongNetwork-button">Switch to FUJI Testnet</button></Modal.Body>
        </div>
      </div> : null}

      <Navbar className="header" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://cryptologos.cc/logos/avalanche-avax-logo.png"
              width="30"
              height="30"
              style={{ filter: "hue-rotate(260deg)", marginRight: "1rem" }}
              className="d-inline-block align-top"
            />
            Avax Coinflip
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://testnet.snowtrace.io/address/0xc144F2c28E45C74A3f8a4C3fba44B91614A65E2e">Contract</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div style={styles.headerRight}>
                <NativeBalance />
                <Account />
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <div>
          <Switch>
            <Route exact path="/">
              <CoinFlip />
            </Route>
          </Switch>
        </div> */}
    </>

  );
};


export default Header;
