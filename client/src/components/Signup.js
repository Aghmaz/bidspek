import React from "react";
import Navbar from "./navbar";
import first from "../images/second.png";
import { Toast } from "react-bootstrap";

// import google from "../images/google.svg";
// import emailPic from "../images/email.svg";
// import linkedin from "../images/linkedin.svg";
import "./GoogleLogin.css";
import "./signin.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { multiStepContext } from "../StepContext";
import { ToastContainer, toast } from "react-toastify";

// const clientId = "711717933333-vf2d5qject036er2sdms5u9983mq3l0r.apps.googleusercontent.com";

const Signup = () => {
  const [toastMessage, setToastMessage] = useState("");
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

  // for email

  const [showForm, setShowForm] = useState(false);
  const { userData, setUserData } = useContext(multiStepContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // console.log("herlllllllllllllllllllllllllllllllllll");
    if (!userData["email"] || !userData["password"]) {
      emptyField();
      return;
    }

    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/engineer/emailregister`,
        {
          firstName: userData["firstName"],
          lastName: userData["lastName"],
          email: userData["email"],
          password: userData["password"],
        }
      );

      // successRegisteration();
      successRegisteration();
      setToastMessage(response.data.message);
      console.log(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        errorRegisteration();
      } else {
        console.log(error);
        registerationFailed();
      }
    }
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };
  const handleToastClose = () => {
    setToastMessage("");
  };
  const registerationFailed = () => {
    toast("Registration Failed.", { type: "error" });
  };
  const errorRegisteration = () => {
    toast("Email is already Registered", { type: "error" });
  };

  const emptyField = () =>
    toast("Please fill in all fields", { type: "error" });

  const successRegisteration = () =>
    toast("You are successfully Registered", { type: "success" });
  // =========valiation + toaster=======

  const validateField = (fieldName) => {
    const value = userData[fieldName];
    if (!value) {
      // If the value is empty, the field is invalid
      return false;
    }

    if (fieldName === "lastname" && "firstName") {
      const pattern = /^[\p{L}\p{M}'\-\s]{5,12}$/u;

      return pattern.test(value);
    }
    if (fieldName === "email") {
      // Check if the value is a valid email address
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value);
    }
    if (fieldName === "password") {
      // Check if the value is a valid email address
      const pattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$/;
      return pattern.test(value);
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
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Sign in
          </Link>
        </Button>
      </div>

      <div
        className="container ms-5 mt-5"
        id="mob"
        style={{ position: "absolute" }}
      >
        <h1
          style={{
            fontWeight: "800",
            fontSize: "60px",
            fontFamily: "Montserrat",
            color: "rgba(0, 0, 0, 1)",
          }}
        >
          {" "}
          Sign up
        </h1>
        <span
          style={{
            fontWeight: "400",
            fontSize: "16px",
            fontFamily: "Montserrat",
          }}
        >
          {" "}
          Don't have an account yet? Create one now!
        </span>
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
                Sign up via Email
                {/* <img src={emailPic} style={{ width: "2rem", height: "2rem" }} />{" "} */}
              </Button>
            )}
            {showForm && (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <Form.Group as={Col} md="6">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="text"
                      value={userData["firstName"]}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      isValid={validateField("email")}
                      // isInvalid={!validateField("email")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="text"
                      value={userData["lastName"]}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      // isValid={validateField("email")}
                      // isInvalid={!validateField("email")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="text"
                      value={userData["email"]}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      // isValid={validateField("email")}
                      // isInvalid={!validateField("email")}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      style={{ background: "transparent" }}
                      required
                      type="password"
                      value={userData["password"]}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
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
                  className="mt-2 w-25 "
                  style={{ textTransform: "initial", fontSize: "0.9rem" }}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {/* <Link style={{ color: "white", textDecoration: "none" }} > */}
                  Continue
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
              {/* {" "}
              <img
                src={google}
                style={{ width: "2rem", height: "2rem" }}
              />{" "} */}
              Sign up via Google
            </Button>
            <Button
              className=" FONT"
              // disabled
              style={{
                textTransform: "initial",
                fontSize: "1.3rem",
                color: "#0052CC",
                border: "2px solid rgb(25, 118, 210)",
              }}
              variant="outline"
              onClick={linkedinAuth}
            >
              Sign up via Linkedin
              {/* <img src={linkedin} style={{ width: "2rem", height: "2rem" }} />{" "} */}
            </Button>
            <div>
              <span style={{ fontFamily: "Montserrat" }}>
                {" "}
                If Already have an Account?
                <Link
                  style={{
                    marginLeft: "0.3rem",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    color: "#0052CC",
                  }}
                  to="/login"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pic" style={{ marginBottom: "-2rem" }}>
        <img className="img" src={first} alt="Construction building" />
      </div>
      {/* <div className="mt-3" style={{ float: "right" }}>
        {toastMessage !== "" && (
          <Toast
            onClose={handleToastClose}
            show={true}
            autohide={true}
            delay={1500}
          >
            <Toast.Header>
              <strong className="mr-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        )}
      </div> */}
    </div>
  );
};

export default Signup;
