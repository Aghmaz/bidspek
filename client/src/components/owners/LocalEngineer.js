import React, { useContext } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { multiStepContext } from "../../StepContext";
import { ToastContainer, toast } from "react-toastify";

const LocalEngineer = () => {
  const navigate = useNavigate();
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  const validateField = (fieldName) => {
    const value = userData[fieldName];

    if (!value) {
      // If the value is empty, the field is invalid
      return false;
    }

    if (fieldName === "ownerEmail") {
      // Check if the value is a valid email address
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value);
    }

    if (fieldName === "zipowner") {
      // Check if the value is a valid zip code
      const pattern = /^\d{5}(?:[-\s]\d{4})?$/;
      return pattern.test(value);
    }

    return true;
  };

  const handleCancel = () => {
    const structuralcheckbox = localStorage.getItem("structuralcheckbox");

    if (
      structuralcheckbox.includes("Corrosion") ||
      structuralcheckbox.includes("Excessive Cracking") ||
      structuralcheckbox.includes("Deflection")
    ) {
      navigate("/parking-garage/slab/StructuralIssue");
    }
  };

  const handleSend = () => {
    const isEmailValid = validateField("ownerEmail");
    const isZipValid = validateField("zipowner");

    if (isEmailValid && isZipValid) {
      navigate("/parking-garage/slab/local-engineer/repair-projects");
    } else {
      if (!isEmailValid) {
        email();
      }

      if (!isZipValid) {
        zip();
      }
    }
  };

  const email = () =>
    toast("Please Enter the correct Email address", { type: "error" });
  const zip = () => toast(" Please provide a valid zip.", { type: "error" });

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="mt-5 mb-4 d-flex justify-content-center align-items-center">
        <div className="card w-75 mb-4" style={{ background: "transparent" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Get quotes from your local engineers,
              <br /> consultants & contractors!
            </h2>
            <span
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "19px",
              }}
            >
              Enter the location of your project & your email address.
            </span>
            <div
              className="row row-cols-1 row-cols-md-8 row-cols-lg-2 g-4 w-100 justify-content-center"
              style={{ gap: "0.1rem", margin: "auto" }}
            >
              <Form.Group as={Col} md="12">
                {/* <Form.Label>Zip</Form.Label> */}
                <Form.Control
                  style={{ borderColor: "rgb(25, 118, 210)" }}
                  type="text"
                  placeholder="Zip code"
                  required
                  // onChange={handleChange}
                  value={userData["zipowner"]}
                  onChange={(e) => {
                    setUserData({ ...userData, zipowner: e.target.value });
                  }}
                  // isInvalid={!validateField("zipowner")}
                  isValid={validateField("zipowner")}
                />
                <Form.Control.Feedback type="valid">
                  Looks good.!
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="12">
                {/* <Form.Label>Zip</Form.Label> */}
                <Form.Control
                  style={{ borderColor: "rgb(25, 118, 210)" }}
                  type="email"
                  placeholder="Email Address"
                  required
                  // onChange={handleChange}
                  value={userData["ownerEmail"]}
                  onChange={(e) => {
                    setUserData({ ...userData, ownerEmail: e.target.value });
                  }}
                  // isInvalid={!validateField("ownerEmail")}
                  isValid={validateField("ownerEmail")}
                />
                <Form.Control.Feedback type="valid">
                  Looks good.!
                </Form.Control.Feedback>
                {/* <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback> */}
              </Form.Group>
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
                }}
                variant="outline-primary"
                type="submit"
                onClick={handleCancel}
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
      </div>
    </div>
  );
};

export default LocalEngineer;
