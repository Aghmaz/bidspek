import React from "react";
import ParkingImage from "../../images/parkinggarage.tif";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Parking = () => {
  return (
    <div>
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
      </div>

      <img
        className="img-fluid"
        src="https://res.cloudinary.com/df8fsfjad/image/upload/v1681746000/3976_1000x667_1_1_vf0yqi.png"
      />
    </div>
  );
};

export default Parking;
