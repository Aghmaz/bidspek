import React, { useState } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import BuildingExterior from "./BuildingExterior";
import ParkingGarage from "./ParkingGarage";
import { Link } from "react-router-dom";

const Parking = () => {
  const location = localStorage.getItem("location");
  const [selectedButton, setSelectedButton] = useState(
    (location === "parking garage" && "ParkingGarage") ||
      (location === "building exterior" && "BuildingExterior")
  );

  const handleClickButton = (button) => {
    setSelectedButton(button);
  };
  return (
    <div className="container-fluid">
      <div>
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
      </div>
      <div className="w-100 row mt-4 justify-content-center align-items-center text-center ">
        <div className="col-lg-2 col-sm-2">
          <Button
            style={{ textTransform: "initial" }}
            defaultValue={
              (selectedButton === "ParkingGarage" &&
                location === "parking garage") ||
              (selectedButton === "BuildingExterior" &&
                location === "building exterior")
            }
            variant={selectedButton === "ParkingGarage" ? "contained" : ""}
            color={selectedButton === "ParkingGarage" ? "primary" : "default"}
            onClick={() => handleClickButton("ParkingGarage")}
          >
            Parking Garage
          </Button>
        </div>
        <div className="col-lg-2 col-sm-2">
          <Button
            style={{ textTransform: "initial" }}
            variant={selectedButton === "BuildingExterior" ? "contained" : ""}
            color="primary"
            onClick={() => handleClickButton("BuildingExterior")}
          >
            Building Exterior
          </Button>
        </div>
        {selectedButton === "ParkingGarage" ? (
          <div style={{ marginTop: "-4rem" }} className="ms-3">
            <ParkingGarage />
          </div>
        ) : (
          <div className="mt-3">
            <BuildingExterior />
          </div>
        )}
      </div>
    </div>
  );
};

export default Parking;
