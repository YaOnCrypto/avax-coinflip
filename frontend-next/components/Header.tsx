import React, { useContext, useEffect, useState } from "react";
import { CoinFlipContext } from "./../hardhat/SymfoniContext";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <Navbar className="header" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://cryptologos.cc/logos/avalanche-avax-logo.png"
            width="30"
            height="30"
            style={{filter:"hue-rotate(260deg)"}}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/flip">Flip</Nav.Link>
        </Nav>
      </Container>
      <Button className="connect-button"></Button>
    </Navbar>
  );
};
