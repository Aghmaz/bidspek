import React from "react";
import Navbar from "./navbar";
import first from "../images/first.png";
import google from "../images/google.svg";
import emailPic from "../images/email.svg";
import linkedin from "../images/linkedin.svg";
import "./GoogleLogin.css";
import "./signin.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// const clientId = "711717933333-vf2d5qject036er2sdms5u9983mq3l0r.apps.googleusercontent.com";

const Signin = ({ setUser }) => {
  // For Google

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  // For Linkedin
  const linkedinAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/linkedin/callback`,
      "_self"
    );
  };

  // sign with email
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const emptyField = () =>
    toast("Please fill in all fields", { type: "error" });

  const handleSubmit = async (event) => {
    if (!email || !password) {
      emptyField();
      return;
    }

    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Add your sign-in logic here
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/engineer/login`,
        { email, password }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("engineerId", response.data.engineerId);
      navigate("/");
      setUser(response.data.token);
      setUser(response.data.engineerId);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        emailNotRegistered();
      } else if (error.response && error.response.status === 500) {
        loginFailed();
      }
    }
  };

  const emailNotRegistered = () => {
    toast("This email is not registered", { type: "error" });
  };

  const loginFailed = () => {
    toast("Login failed. Please try again.", { type: "error" });
  };

  const handleButtonClick = () => {
    setShowForm(true);
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

      <div
        className="container ms-5 mt-5 "
        id="mob"
        style={{ position: "absolute" }}
      >
        <h1
          className="FONT"
          style={{
            fontWeight: "800",
            fontSize: "60px",
            fontFamily: "Montserrat",
            color: "rgba(0, 0, 0, 1)",
          }}
        >
          Sign in
        </h1>
        {/* <span style={{ fontWeight: "400", fontSize: "16px", fontFamily: "Montserrat" }}> Don't have an account yet? Create one now!</span> */}
        <div class="col-md-12 buto mt-4">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            className="mob"
          >
            {!showForm && (
              <Button
                className=" FONT"
                style={{
                  textTransform: "initial",
                  fontSize: "1.3rem",
                  color: "#0052CC",
                  border: "2px solid rgb(25, 118, 210)",
                }}
                variant="outline"
                onClick={handleButtonClick}
              >
                Sign in via Email
                {/* <img src={emailPic} style={{ width: "2rem", height: "2rem" }} />{" "} */}
              </Button>
            )}
            {showForm && (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      // isValid={validateField('lastname')}
                      // isInvalid={!validateField('lastname')}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Email name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      // isValid={validateField('lastname')}
                      // isInvalid={!validateField('lastname')}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Password shoud have atleast one number ,special character
                      and alphabet with minimum length 6.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Button
                  className="mt-3 w-25 "
                  style={{ textTransform: "initial", fontSize: "1.2rem" }}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {/* <Link style={{ color: "white", textDecoration: "none" }} > */}
                  Log in
                  {/* </Link> */}
                </Button>
                <ToastContainer />
              </form>
            )}
            <div class="or-container ">
              <div class="line-separator"></div> <div class="or-label">or</div>
              <div class="line-separator"></div>
            </div>
            <Button
              className=" FONT"
              style={{
                textTransform: "initial",
                fontSize: "1.3rem",
                color: "#0052CC",
                border: "2px solid rgb(25, 118, 210)",
              }}
              variant="outline"
              onClick={googleAuth}
            >
              Sign in via Google{" "}
              {/* <img
                src={google}
                style={{ width: "2rem", height: "2rem" }}
              />{" "} */}
            </Button>
            <Button
              className=" FONT"
              disabled
              style={{
                textTransform: "initial",
                fontSize: "1.3rem",
                color: "#0052CC",
                border: "2px solid rgb(25, 118, 210)",
              }}
              variant="outline"
              onClick={linkedinAuth}
            >
              Sign in via Linkedin
              {/* <img src={linkedin} style={{ width: "2rem", height: "2rem" }} />{" "} */}
            </Button>
            <div>
              <span style={{ fontFamily: "Montserrat" }}>
                {" "}
                Don't have an account yet?
                <Link
                  style={{
                    marginLeft: "0.3rem",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    color: "#0052CC",
                  }}
                  to="/signup"
                >
                  Create an account
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pic">
        <img src={first} alt="Construction building" />
      </div>
    </div>
  );
};

export default Signin;
