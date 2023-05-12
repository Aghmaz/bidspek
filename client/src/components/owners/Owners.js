import React, { useState } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Conrete from "./Conrete";
import OtherStructure from "./OtherStructure";
import "./owners.css";

const Owners = () => {
  const [selectedButton, setSelectedButton] = useState("concrete");

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="buttonnn">
        <Button
          style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          variant="contained"
        >
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              textTransform: "initial",
            }}
            to="/signup"
          >
            Sign up
          </Link>
        </Button>
      </div>

      <div
        style={{ marginTop: "100px" }}
        className="container d-flex justify-content-center align-items-center  "
      >
        <h1 className="heading">
          Get matched for your next
          <br />{" "}
          <div className=" d-flex justify-content-center align-items-center">
            <span style={{ color: "blue" }}> concrete repair </span>{" "}
            <span style={{ marginLeft: "15px", color: "black" }}>
              {" "}
              project!
            </span>
          </div>
        </h1>
      </div>
      <div className="row mt-4 justify-content-center align-items-center text-center ">
        <div className="col-lg-2 col-sm-2">
          <Button
            style={{ textTransform: "initial" }}
            defaultValue={selectedButton === "concrete"}
            variant={selectedButton === "concrete" ? "contained" : ""}
            color={selectedButton === "concrete" ? "primary" : "default"}
            onClick={() => handleClick("concrete")}
          >
            Concrete Building
          </Button>
        </div>
        <div className="col-lg-2 col-sm-2">
          <Button
            style={{ textTransform: "initial" }}
            variant={selectedButton === "other" ? "contained" : ""}
            color="primary"
            onClick={() => handleClick("other")}
          >
            Other Structure
          </Button>
        </div>
        {selectedButton === "concrete" ? (
          <div className="mt-3">
            <Conrete />
            {/* Render concrete building data */}
          </div>
        ) : (
          <div className="mt-3">
            <OtherStructure />
            {/* Render other structure data */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Owners;
