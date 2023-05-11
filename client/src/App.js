import "./App.css";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Owners from "./components/owners/Owners";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Uploader from "./components/Uploader";
import Parking from "./components/owners/Parking";
import Building from "./components/owners/Building";
import { AlreadyFromSubmited } from "./components/AlreadyFromSubmited";
import { Submited } from "./components/Submited";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "./VerifyToken";

function App() {
  const [user, setUser] = useState(null);
  console.log("user<<<<<<<<>>>>>>>>>", user);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      if (
        data.user.provider === "google" ||
        data.user.provider === "linkedin"
      ) {
        setUser(data.user._json);
        console.log(data.user._json.email);
        console.log(data.user.id._id, "<<<<<<<<<<<,check id");
        console.log(">>>>>>>", data.user._json);
        localStorage.setItem("email", data.user._json.email);
        localStorage.setItem("engineerId", data.user.id._id);
      } else if (data.user.provider === "local") {
        // Modify this part to handle email login

        // Make a POST request to the /engineer/login route with the email and password
        axios.post(
          `${process.env.REACT_APP_API_URL}/engineer/verify-token`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  //

  useEffect(() => {
    const checkFormSubmission = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/engineer/check-form-submission/${email}`
        );

        if (response.data.hasSubmittedForm) {
          navigate("/form-Submitted");

          console.log(
            "response.data.hasSubmittedForm>>>>>>",
            response.data.hasSubmittedForm
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFormSubmission();
  }, []);

  useEffect(() => {
    const checkFormSubmission1 = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/engineer/check-form-submission/${email}`
        );

        if (response.data.hasSubmittedForm) {
          navigate("/form-Submitted");

          console.log(
            "response.data.hasSubmittedForm>>>>>>",
            response.data.hasSubmittedForm
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFormSubmission1();
  }, []);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token, "<<<<<<<<<<<<<<<<< hello");
  //   if (token) {
  //     VerifyToken(token).then((isValid) => {
  //       if (!isValid) {
  //         navigate("/");
  //       }
  //     });
  //   } else {
  //     // Handle missing token here, e.g. redirect to login page
  //     navigate("/login");
  //   }
  // }, []);

  // Rest of your code

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              <Layout user={user} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          exact
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Signin setUser={setUser} />
            )
          }
        />
        <Route
          exact
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Signup setUser={setUser} />
            )
          }
        />
        <Route path="/owners" element={<Owners />} />
        <Route
          path="/login/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/uploader" element={<Uploader />} />
        <Route path="/parking-garage" element={<Parking />} />
        <Route path="/building-exterior" element={<Building />} />
        <Route
          path="/form-Submitted"
          element={<AlreadyFromSubmited user={user} />}
        />
        <Route path="/Submitted-Sucess" element={<Submited user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
