import React from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/logo.png";

function navigation() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            style={{ width: "300px" }}
            className="logo"
            src={Logo}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav className="me-auto">
              <Nav.Link href={"/upload"}>Upload</Nav.Link>
              <Nav.Link href={"/Member"}>Become a Member</Nav.Link>
              <Nav.Link href={"/dash"}>Dashboard</Nav.Link>

              <Nav.Link href={"/"}>Connect Wallet</Nav.Link>
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navigation;
