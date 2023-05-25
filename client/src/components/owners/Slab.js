import React, { useState } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import cracks from "../../images/cracks.png";
import spalls from "../../images/Spalls.png";
import Structural from "../../images/structural.png";
import structuralenlarged from "../../images/structuralenlarged.png";
import spallsenlarged from "../../images/spallsenlarged.png";
import cracksenlarged from "../../images/Cracksenlarged.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  confirmationPop: {
    position: "fixed",
    top: 0,
    left: 0,
    // top: 200,
    // left: 100,
    // width: "220px",
    // height: "280px",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Slab = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState(null);
  const [openConfirmationPop, setOpenConfirmationPop] = useState(false);

  const handleClick = (event, area) => {
    event.preventDefault();
    if (area === "cracks") {
      setSelectedArea({
        url: cracksenlarged,
        alt: "cracks",
      });
      setOpenConfirmationPop(true);
    } else if (area === "spalls") {
      setSelectedArea({
        url: spallsenlarged,
        alt: "spalls",
      });
      setOpenConfirmationPop(true);
    } else if (area === "Structural") {
      setSelectedArea({
        url: structuralenlarged,
        alt: "Structural",
      });
      setOpenConfirmationPop(true);
    }
  };

  const handleCancel = () => {
    setOpenConfirmationPop(false);
  };

  const handleBack = () => {
    navigate("/parking-garage");
  };
  const handlePopImageClick = () => {
    // setOpenConfirmationPop(false);
    if (selectedArea && selectedArea.alt === "Structural") {
      navigate("/parking-garage/slab/StructuralIssue");
    }
  };
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="mt-5 mb-4 d-flex justify-content-center align-items-center">
        <div className="card w-75 mb-4" style={{ background: "transparent" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-5">
              What kind of issue does
              <br /> your slab have?
            </h2>

            <div
              className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 w-100 justify-content-center"
              style={{ gap: "2rem", margin: "auto" }}
            >
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  <div style={{ float: "right" }}>
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(event) => handleClick(event, "cracks")}
                    />
                  </div>
                </div>
                <img
                  src={cracks}
                  style={{
                    marginTop: "4rem",
                    marginBottom: "3.8rem",
                    cursor: "pointer",
                  }}
                  alt="cracks"
                  onClick={(event) => handleClick(event, "cracks")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Cracks" />
                  </FormGroup>
                </div>
              </div>
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  <div style={{ float: "right" }}>
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(event) => handleClick(event, "spalls")}
                    />
                  </div>
                </div>
                <img
                  src={spalls}
                  style={{
                    marginTop: "4rem",
                    marginBottom: "4rem",
                    height: "5rem",
                  }}
                  alt="spalls"
                  onClick={(event) => handleClick(event, "spalls")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Spalls" />
                  </FormGroup>
                </div>
              </div>
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  <div style={{ float: "right" }}>
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(event) => handleClick(event, "Structural")}
                    />
                  </div>
                </div>
                <img
                  src={Structural}
                  style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    height: "9rem",
                    width: "8rem",
                  }}
                  alt="Structural"
                  onClick={(event) => handleClick(event, "Structural")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Structural Issues"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                style={{
                  flexGrow: 1,
                  margin: "0 5px",
                  maxWidth: "180px",
                  border: "2px solid rgb(25, 118, 210)",
                }}
                variant="outline-primary"
                type="submit"
                onClick={handleBack}
              >
                Back
              </Button>
              {/* <Button
                style={{
                  flexGrow: 1,
                  margin: "0 5px",
                  maxWidth: "180px",
                  backgroundColor: "rgb(25, 118, 210)",
                  color: "white",
                  marginLeft: "auto",
                }}
                type="submit"
                // onClick={handleSend}
              >
                Next
              </Button> */}
            </div>
          </div>
        </div>
      </div>
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
            </div>
            {selectedArea && (
              <img
                src={selectedArea.url}
                alt={selectedArea.alt}
                width="120px"
                height="180px"
                className="mb-3"
                onClick={handlePopImageClick}
              />
            )}
            <span>{selectedArea && selectedArea.alt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slab;
