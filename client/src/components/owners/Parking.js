import React, { useState } from "react";
import first from "../../images/parking.png";
import column from "../../images/column.png";
import beam from "../../images/beam.png";
import slab from "../../images/slab.png";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  confirmationPop: {
    position: "fixed",
    // top: 300,
    // left: 200,
    // width: "220px",
    // height: "280px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  confirmationPopContent: {
    width: "220px",
    height: "280px",
    backgroundColor: "white",
    borderRadius: "3%",
    border: "1px solid gray",

    outline: "none",
    // padding: "1rem",
    // paddingRight: "1rem",
    // paddingTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Parking = () => {
  const classes = useStyles();
  const [selectedArea, setSelectedArea] = useState(null);
  const [openConfirmationPop, setOpenConfirmationPop] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    const clickedArea = event.target.alt;
    if (clickedArea === "Column") {
      setSelectedArea({
        url: column, // Replace with the actual image URL
        alt: "Column",
      });
      setOpenConfirmationPop(true);
    } else if (clickedArea === "beam") {
      setSelectedArea({
        url: beam, // Replace with the actual image URL
        alt: "Base",
      });
      setOpenConfirmationPop(true);
    } else if (clickedArea === "slab") {
      setSelectedArea({
        url: slab, // Replace with the actual image URL
        alt: "slab",
      });
      setOpenConfirmationPop(true);
    }
  };

  const handleConfirm = () => {
    // Perform the desired action on confirmation
    console.log("Confirmed!");

    // Close the confirmation pop-up
    setOpenConfirmationPop(false);
  };

  const handleCancel = () => {
    // Close the confirmation pop-up
    setOpenConfirmationPop(false);
  };

  const handleClickImage = () => {
    // Determine the route based on the selectedArea.url
    let route;
    if (selectedArea.url === column) {
      route = "/parking-garage/column"; // Replace with the desired route for the column
    } else if (selectedArea.url === beam) {
      route = "/parking-garage/beam"; // Replace with the desired route for the beam
    } else if (selectedArea.url === slab) {
      route = "/parking-garage/slab"; // Replace with the desired route for the slab
    }

    if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <Navbar />
        {/* <div className="buttonnn">
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
        </div> */}
      </div>
      <div className=" mt-2 d-flex justify-content-center align-items-center">
        <img
          className="img"
          src={first}
          width={1917}
          height={863}
          useMap="#my-map"
        />
        <map name="my-map">
          <area
            target="_self"
            alt="Column"
            title="Column"
            coords="431,223,455,223,455,795,433,794"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />

          <area
            target="_self"
            alt="beam"
            title="beam"
            coords="284,294,58,301,58,327,287,316,287,372,272,374,268,300"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="beam"
            title="beam"
            coords="60,403,280,372,279,360,53,371,58,327,72,327,75,393"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="slab"
            coords="590,701,456,712,458,795,594,777"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          <area
            target="_self"
            alt="slab"
            title="slab"
            coords="617,692,812,662,812,743,619,773"
            shape="poly"
            onClick={handleClick}
            style={{ cursor: "pointer", backgroundColor: "yellow" }}
          />
          {/* add more area elements here */}
        </map>
        {openConfirmationPop && (
          <div className={classes.confirmationPop}>
            <div className={classes.confirmationPopContent}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "-1rem",
                }}
              >
                <div style={{ float: "left" }}>
                  <CloseIcon
                    style={{ color: "#0052CC", fontSize: "1.2rem" }}
                    onClick={handleCancel}
                  />
                </div>
                <div style={{ float: "right" }}>
                  <ZoomInIcon
                    style={{ color: "#0052CC", marginRight: "0.5rem" }}
                  />
                </div>
              </div>
              {selectedArea && (
                <img
                  src={selectedArea.url}
                  alt={selectedArea.alt}
                  width="120px"
                  height="180px"
                  className="mb-3"
                  onClick={handleClickImage}
                />
              )}

              <span>{selectedArea.alt}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parking;
