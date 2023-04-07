import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "./navbar.css";

const navbar = () => {
  return (
    <div className="contianer mt-2">
      <Navbar expand="lg">
        <Navbar.Brand className="ms-4" as={Link} to="http://localhost:3000/">
          {" "}
          <img src={logo} style={{ width: "100px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="ms-4 nav_tabs" as={Link} to="/owners" active>
              {" "}
              For Owners
            </Nav.Link>
            <NavDropdown
              className="ms-4"
              title="For Service Provider"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="http://bidspek.com/?page_id=45">
                Engineer
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://bidspek.com/?page_id=54">
                Contractor
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="http://bidspek.com/?page_id=64">
                Consultant
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="ms-4" href="#link">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navbar;
