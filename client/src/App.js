import "./App.css";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      if (
        data.user.provider === "google" ||
        data.user.provider === "linkedin"
      ) {
        setUser(data.user._json);
        // console.log(data.user._json);
        // localStorage.setItem("engineerId", data.user._json.sub);
      } else if (data.user.provider === "local") {
        // Modify this part to handle email login
        const email = data.user.email;
        const password = data.user.password;

        // Make a POST request to the /engineer/login route with the email and password
        const loginUrl = `${process.env.REACT_APP_API_URL}/engineer/login`;
        const loginData = { email, password };
        const { data: loginResult } = await axios.post(loginUrl, loginData, {
          withCredentials: true,
        });

        if (loginResult.error) {
          // Handle login error
        } else {
          setUser(loginResult.user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      {/* <Routes>
        <Route
          exact
          path="/"
          element={user ? <Layout user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes> */}
      {/* ===========================   */}

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
      </Routes>
    </div>
  );
}

export default App;
