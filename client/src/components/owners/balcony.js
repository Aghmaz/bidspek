import React, { useState } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import cracks from "../../images/deflection.png";
import spalls from "../../images/structural.png";
import Structural from "../../images/corrision.png";
import deflectionenlarged from "../../images/deflectionenlarged.png";
import cracksenlarge from "../../images/cracksenlarge.png";
import corrisionenlarge from "../../images/corrisionenlarge.png";
import FormGroup from "@mui/material/FormGroup";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  confirmationPop: {
    position: "fixed",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Balcony = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState(null);
  const [clickedArea, setClickedArea] = useState(null);
  const [openConfirmationPop, setOpenConfirmationPop] = useState(false);

  const [checkBox, setCheckBox] = useState(() => {
    const storedValues = JSON.parse(localStorage.getItem("structuralcheckbox"));
    return storedValues || [];
  });
  const handleClick = (event, area) => {
    event.preventDefault();
    setClickedArea(area);
    setOpenConfirmationPop(true);
  };

  const handleCancel = () => {
    setOpenConfirmationPop(false);
  };

  const handleBack = () => {
    navigate("/parking-garage/slab");
  };

  const handlePopImageClick = () => {
    if (clickedArea === "Structural") {
      navigate("/parking-garage/slab/StructuralIssue");
    }
  };

  const getPopImageUrl = () => {
    if (clickedArea === "cracks") {
      return deflectionenlarged;
    } else if (clickedArea === "spalls") {
      return cracksenlarge;
    } else if (clickedArea === "Structural") {
      return corrisionenlarge;
    }
    return null;
  };

  const getPopImageAlt = () => {
    if (clickedArea === "cracks") {
      return "Deflection enlarged";
    } else if (clickedArea === "spalls") {
      return "Excessive Cracking enlarged";
    } else if (clickedArea === "Structural") {
      return "Corrosion enlarged";
    }
    return "";
  };

  const handleCheckBox = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    let updatedCheckBox;
    if (checked) {
      updatedCheckBox = [...checkBox, value];
    } else {
      updatedCheckBox = checkBox.filter((item) => item !== value);
    }

    setCheckBox(updatedCheckBox);
    localStorage.setItem("structuralcheckbox", JSON.stringify(updatedCheckBox));
  };

  const handleSend = () => {
    if (
      checkBox.includes("Spalls/cracks") ||
      checkBox.includes("Falling/dettaching") ||
      checkBox.includes("Repair/paint") ||
      checkBox.includes("Replace")
    ) {
      navigate("/parking-garage/slab/local-engineer");
    } else {
      notify();
    }
  };
  const notify = () => toast("Please Select atleast one.", { type: "error" });
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="mt-5 mb-4 d-flex justify-content-center align-items-center">
        <div className="card w-75 mb-4" style={{ background: "transparent" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-5">
              What kind of issue does
              <br /> your balcony have?
            </h2>

            <div
              className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 w-100 justify-content-center"
              style={{ gap: "2rem", margin: "auto" }}
            >
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  {/* <div className="text-end">
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(e) => handleClick(e, "cracks")}
                    />
                  </div> */}
                </div>
                <img
                  src={cracks}
                  style={{
                    marginTop: "2rem",
                    marginBottom: "4.2rem",
                    cursor: "pointer",
                  }}
                  alt="cracks"
                  onClick={(e) => handleClick(e, "cracks")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup className="ms-2">
                    <Form.Check
                      label="Spalls/cracks"
                      value="Spalls/cracks"
                      type="checkBox"
                      checked={checkBox.includes("Spalls/cracks")}
                      onChange={handleCheckBox}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col card " style={{ background: "transparent" }}>
                <div>
                  {/* <div className="text-end">
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(e) => handleClick(e, "spalls")}
                    />
                  </div> */}
                </div>
                <img
                  src={spalls}
                  style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    height: "9rem",
                    width: "8rem",
                  }}
                  alt="spalls"
                  onClick={(e) => handleClick(e, "spalls")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup className="ms-2">
                    <Form.Check
                      label="Falling/dettaching"
                      value="Falling/dettaching"
                      type="checkBox"
                      checked={checkBox.includes("Falling/dettaching")}
                      onChange={handleCheckBox}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  {/* <div className="text-end">
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(e) => handleClick(e, "Structural")}
                    />
                  </div> */}
                </div>
                <img
                  src={Structural}
                  style={{
                    marginTop: "4rem",
                    marginBottom: "4rem",
                    height: "5rem",
                  }}
                  alt="Structural"
                  onClick={(e) => handleClick(e, "Structural")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup className="ms-2">
                    <Form.Check
                      label="Repair/paint"
                      value="Repair/paint"
                      type="checkBox"
                      checked={checkBox.includes("Repair/paint")}
                      onChange={handleCheckBox}
                    />
                  </FormGroup>
                </div>
              </div>
              {/* adding one more */}
              <div className="col card" style={{ background: "transparent" }}>
                <div>
                  {/* <div className="text-end">
                    <ZoomInIcon
                      style={{ color: "#0052CC" }}
                      onClick={(e) => handleClick(e, "Structural")}
                    />
                  </div> */}
                </div>
                <img
                  src={Structural}
                  style={{
                    marginTop: "4rem",
                    marginBottom: "4rem",
                    height: "5rem",
                  }}
                  alt="Structural"
                  onClick={(e) => handleClick(e, "Structural")}
                />
                <div
                  className="card mb-3"
                  style={{ background: "transparent" }}
                >
                  <FormGroup className="ms-2">
                    <Form.Check
                      label="Replace"
                      value="Replace"
                      type="checkBox"
                      checked={checkBox.includes("Replace")}
                      onChange={handleCheckBox}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <hr className="mt-5" />

            <div
              className="w-75 mx-auto"
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
                  color: "rgb(25, 118, 210)",
                  fontWeight: "bold",
                }}
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                style={{
                  flexGrow: 1,
                  margin: "0 5px",
                  maxWidth: "180px",
                  backgroundColor: "rgb(25, 118, 210)",
                  color: "white",
                  marginLeft: "auto",
                }}
                type="submit"
                onClick={handleSend}
              >
                Next
              </Button>
              <ToastContainer />
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
              <img
                className="mt-2 mb-2"
                src={getPopImageUrl()}
                alt={getPopImageAlt()}
                style={{ width: "200px", height: "200px" }}
                onClick={handlePopImageClick}
              />
              <span>{getPopImageAlt()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balcony;
