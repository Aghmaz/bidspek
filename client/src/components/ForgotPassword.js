import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/engineer/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="w-100" style={{ overflow: "hidden" }}>
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

      {/* ============ */}
      <div className="container d-flex justify-content-center align-items-center  ">
        <Card
          style={{
            width: "900px",

            marginTop: "100px",
            alignItems: "center",
          }}
        >
          <Card.Body>
            <h1
              className="mb-4"
              style={{
                // fontFamily: "Montserrat",
                fontWeight: "800",
                fontSize: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Forgot Password?
            </h1>

            <span style={{ fontFamily: "Montserrat" }}>
              Enter your email address and we’ll send your recovery details
            </span>

            <form onSubmit={handleSubmit} className="mt-2">
              <Form.Group as={Col} md="12">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                  placeholder="Enter your email"
                  style={{ background: "transparent" }}
                  required
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Button
                className="FONT mt-3 w-100"
                style={{
                  textTransform: "initial",
                  fontSize: "1rem",
                  //   color: "#0052CC",
                  //   border: "2px solid rgb(25, 118, 210)",
                }}
                variant="contained"
                type="submit"
              >
                Reset Password
              </Button>
              <span style={{ margin: "auto" }}>
                Didn’t receive the code?
                <Button
                  style={{
                    textTransform: "initial",
                    textDecoration: "underline",
                  }}
                >
                  Resend
                </Button>{" "}
              </span>
            </form>
            {message && <p>{message}</p>}
          </Card.Body>
        </Card>
      </div>

      {/* ============= */}
    </div>
  );
};

export default ForgotPassword;
