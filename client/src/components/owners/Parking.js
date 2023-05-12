import React, { useState } from "react";
import ParkingImage from "../../images/second.png";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Parking.css";
import Modal from "./Modal";

const Parking = () => {
  // const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    const clickedArea = event.target.alt;
    if (clickedArea === "Column") {
      setSelectedArea({
        url: "https://res.cloudinary.com/df8fsfjad/image/upload/v1681489902/Rectangle_pyk0rf.png",
        alt: "Column",
      });
    } else if (clickedArea === "base") {
      setSelectedArea({ url: "https://path-to-base-image.png", alt: "Base" });
    }
  };
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
      <div>
        <img
          className="img-fluid"
          src="https://res.cloudinary.com/df8fsfjad/image/upload/v1681746000/3976_1000x667_1_1_vf0yqi.png"
          width={1917}
          height={863}
          useMap="#my-map"
        />
        <map name="my-map">
          <area
            target="_self"
            alt="Column"
            title="Column"
            href=""
            coords="431,223,455,223,455,795,433,794"
            shape="poly"
            onClick={handleClick}
          />
          {/* add more area elements here */}
        </map>
        {selectedArea && (
          <Modal
            selectedArea={selectedArea}
            onClose={() => setSelectedArea(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Parking;
