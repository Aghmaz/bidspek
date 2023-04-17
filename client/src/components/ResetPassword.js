import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { token } = useParams();
  console.log(token, "token");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/engineer/reset-password`,
        {
          token: token,
          password: password,
        }
      );
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(error.message);
      } else {
        setMessage("An error occurred while resetting your password.");
      }
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
      <div className="container d-flex justify-content-center align-items-center ">
        <Card
          style={{
            width: "900px",

            marginTop: "100px",
            alignItems: "center",
          }}
        >
          <Card.Body>
            <h1
              style={{
                // fontFamily: "Montserrat",
                fontWeight: "800",
                fontSize: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Reset Password
            </h1>
            {/* <span style={{ fontFamily: "Montserrat" }}>
              Enter your New Password
            </span> */}

            <form onSubmit={handleSubmit} className="mt-3">
              <Form.Group as={Col} md="12">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                  placeholder="Enter your New Password"
                  style={{ background: "transparent" }}
                  required
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button
                className="FONT mt-4 w-100 mb-3"
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
            </form>
            {message && <p>{message}</p>}
          </Card.Body>
        </Card>
      </div>

      {/* ============= */}
    </div>
  );
};

export default ResetPassword;
