import React, { useEffect } from "react";
import Navbar from "./navbar";
import first from "../images/first.png";
import "./GoogleLogin.css";
import "./signin.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader.js";

// const clientId = "711717933333-vf2d5qject036er2sdms5u9983mq3l0r.apps.googleusercontent.com";

const OnwerLogin = ({ setUser }) => {
  const tokenDel = localStorage.getItem("token");

  // sign with email
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/engineer/owner-login`,
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setUser({ token: response.data.token });
      navigate("/owner-dashboard");
      // localStorage.removeItem("hasReloadedOnce");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        emailNotRegistered();
      }
      // new line
      else if (error.response && error.response.status === 401) {
        passwordMatch();
      } else if (error.response && error.response.status === 500) {
        loginFailed();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const alreadySubmitted = () => {
    toast("Form already Submitted", { type: "error" });
  };

  const emailNotRegistered = () => {
    toast("Invalid Credentials", { type: "error" });
  };
  const passwordMatch = () => {
    toast("Password does not match! please Enter Valid", { type: "error" });
  };

  const loginFailed = () => {
    toast("Login failed. Please try again.", { type: "error" });
  };

  const reloadKey = "hasReloadedOnce";

  const handleButtonClick = () => {
    localStorage.setItem(reloadKey, "true");
    setShowForm(true);
  };
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-100" style={{ overflow: "hidden" }}>
      <Navbar />

      {/* <div className="buttonnn">
        <Button
          style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          variant="contained"
        >
          <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
            Sign up
          </Link>
        </Button>
      </div> */}

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
                {/* <Link
                  style={{ textDecoration: "none" }}
                  to="/login/forgot-password"
                >
                  <h6
                    className="mt-2"
                    style={{
                      float: "right",
                      fontFamily: "Montserrat",
                      fontSize: "1.1rem",
                    }}
                  >
                    Forgot Password ?
                  </h6>
                </Link> */}

                <Button
                  className="mt-2 w-25 "
                  style={{ textTransform: "initial", fontSize: "0.9rem" }}
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

            {/* ====linkedin === */}
          </div>
        </div>
      </div>

      <div className="pic">
        <img className="img" src={first} alt="Construction building" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "12rem",
          marginLeft: "35rem",
        }}
      >
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default OnwerLogin;
