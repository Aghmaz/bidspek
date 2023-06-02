import React from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const LocalEngineer = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    const checkbox = localStorage.getItem("checkbox");
    const structuralcheckbox = localStorage.getItem("structuralcheckbox");

    if (checkbox == "Cracks" || checkbox == "Spalls") {
      navigate("/parking-garage/slab");
    } else if (
      (checkbox == "Structural Issues" && structuralcheckbox == "Corrosion") ||
      (checkbox == "Structural Issues" &&
        structuralcheckbox == "Excessive Cracking") ||
      (checkbox == "Structural Issues" && structuralcheckbox == "Deflection")
    ) {
      navigate("/parking-garage/slab/StructuralIssue");
    }
  };
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
                  type="number"
                  placeholder="Zip code"
                  required
                  // onChange={handleChange}
                  // value={userData["zip"]}
                  onChange={(e) => {}}
                  // isInvalid={!validateField("zip")}
                />
                {/* <Form.Control.Feedback type="valid">
                Looks good.!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
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
                  // value={userData["zip"]}
                  onChange={(e) => {}}
                  // isInvalid={!validateField("zip")}
                />
                {/* <Form.Control.Feedback type="valid">
                Looks good.!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
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
                // onClick={handleSend}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalEngineer;
