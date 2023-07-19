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
import OnwerLogin from "./components/OwnerLogin";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Column from "./components/owners/Column";
import Beam from "./components/owners/Beam";
import Slab from "./components/owners/Slab";
import StructuralIssue from "./components/owners/StructuralIssue";
import LocalEngineer from "./components/owners/LocalEngineer";
import RepairProject from "./components/owners/RepairProject";
import Balcony from "./components/owners/balcony";

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

  //

  useEffect(() => {
    getUser();
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
        {/* <Route path="/owner-dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/owner-login" element={<OnwerLogin />} />
        <Route
          exact
          path="/owner-dashboard"
          element={
            user ? (
              <Navigate to="/owner-dashboard" replace={true} />
            ) : (
              <OnwerLogin setUser={setUser} />
            )
          }
        /> */}
        <Route path="/owner-login" element={<OnwerLogin setUser={setUser} />} />
        <Route
          path="/owner-dashboard"
          element={
            user ? (
              <Dashboard setUser={setUser} />
            ) : (
              <Navigate to="/owner-login" replace={true} />
            )
          }
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/parking-garage/column" element={<Column />} />
        <Route path="/parking-garage/beam" element={<Beam />} />
        <Route path="/parking-garage/slab" element={<Slab />} />
        <Route
          path="/parking-garage/slab/StructuralIssue"
          element={<StructuralIssue />}
        />
        <Route
          path="/parking-garage/slab/local-engineer"
          element={<LocalEngineer />}
        />
        <Route
          path="/parking-garage/slab/local-engineer/repair-projects"
          element={<RepairProject />}
        />
        {/* exterior building  */}
        <Route path="/exteriorbuilding/balcony" element={<Balcony />} />
      </Routes>
    </div>
  );
}

export default App;
