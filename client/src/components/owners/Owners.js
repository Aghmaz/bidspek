import React from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
// import { useState } from "react";
import { Link } from "react-router-dom";
const Owners = () => {
  console.log("helo");
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="buttonnn">
        <Button
          style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          variant="contained"
        >
          <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Owners;
