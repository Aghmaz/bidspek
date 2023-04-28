import React, { useState, useLayoutEffect } from "react";
import Navbar from "./navbar";
import MultiStepForm from "./MultiStepForm";
import Button from "@mui/material/Button";
import "./Layout.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import axios from "axios";

const Layout = ({ user }) => {
  // const user = userDetails.user;
  // console.log(user, "layout");
  const storedValue = localStorage.getItem("switchValue");

  const storedCompanyValue = localStorage.getItem("company_name");
  const storeOccupation = localStorage.getItem("occupation");

  // ====== professional ====
  const jobTitle = localStorage.getItem("selectedValue");

  // for selection list

  // Retrieve data from local storage
  const data = JSON.parse(localStorage.getItem("professionalData"));

  // console.log("data", data);
  // Filter selected items
  const selectedItems = data?.filter((item) => item.flag);
  // console.log("selectedItems", selectedItems);

  // =============services ===========
  const serviceData = JSON.parse(localStorage.getItem("servicesData"));

  // console.log("serviceData", serviceData);
  // Filter selected items
  const selectedServiceItems = serviceData?.filter((item) => item.flag);
  // console.log("selectedServiceItems", selectedServiceItems);

  // ==== billing radio ====
  const billing = localStorage.getItem("billing");
  // ==== hourly slider ====
  const hourly = localStorage.getItem("hourly");
  // ==== peLicense ====
  const peLicense = localStorage.getItem("pieLicense");
  // ==== corrosion Engineer ====
  const corrosionEngineer = localStorage.getItem("corrosion");
  // ==== Builing permits ====
  const BuilingPermits = localStorage.getItem("buildingPermit");
  let i = 0;
  const tempFileURL = localStorage.getItem(`image_url${i}`);

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    localStorage.removeItem(`image_url${i}`);
    localStorage.removeItem("engineerId");
    localStorage.removeItem("occupation");
    localStorage.removeItem("pieLicense");
    localStorage.removeItem("corrosion");
    localStorage.removeItem("company_name");
    localStorage.removeItem("buildingPermit");
    localStorage.removeItem("isInputField");
    localStorage.removeItem("uploadedImage");
    localStorage.removeItem("isInputField3");
    localStorage.removeItem("selectedvalue");
    localStorage.removeItem("isImageUploaded");
    localStorage.removeItem("isInputField2");
    localStorage.removeItem("hourly");
    localStorage.removeItem("billing");
    localStorage.removeItem("switchValue");
    localStorage.removeItem("selectedValue");
    localStorage.removeItem("boxCount");
    localStorage.removeItem("images");
    localStorage.removeItem("servicesData");
    localStorage.removeItem("professionalData");
    localStorage.removeItem("token");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log("hey i am");
  // Create profile into review
  //
  const [headerText, setHeaderText] = useState("Create a Profile");

  // API call for linkedin
  // useLayoutEffect(() => {
  //   const handleSubmit = async (event) => {
  //     // console.log("Submitting form...");

  //     // event.preventDefault();

  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_API_URL}/engineer/emailregister/`,
  //         {
  //           email: "abc@gmail.com",
  //           // email: `abc${Math.random()}@gmail.com`,
  //           password: "",
  //         }
  //       );
  //       console.log(response);
  //       console.log(response.data.engineer._id);
  //       localStorage.setItem("engineerId", response.data.engineer._id);
  //       console.log("done");
  //     } catch (error) {
  //       console.log("Error submitting form:", error);
  //       if (error.response && error.response.status === 409) {
  //         console.log(error);
  //       } else {
  //         console.log(error);
  //       }
  //     }

  //     // console.log("Form submitted.");
  //   };
  //   handleSubmit();
  // }, []);

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="logout_button">
        <Button style={{ color: "black" }} variant="outlined">
          <Avatar
            style={{
              background: "#1976d2",
              marginRight: "0.5rem",
              width: "26px",
              height: "26px",
              fontSize: "14px",
              marginLeft: "-0.7rem",
            }}
          >
            {user && user.name
              ? user.name.slice(0, 2)
              : user && user.firstName
              ? user.firstName.localized["en_US"].slice(0, 2)
              : "B"}
            {/* {user && user.name ? user.name.slice(0, 2) : "B"} */}
          </Avatar>
          {user && user.name
            ? user.name
            : user && user.firstName
            ? user.firstName.localized["en_US"]
            : "Bidspek"}
          {/* {user && user.name ? user.name : "Bidspek"} */}

          <ArrowDropDownIcon onClick={handleClick} />
        </Button>
        <StyledEngineProvider injectFirst>
          <Menu
            style={{
              marginTop: "1rem",
              marginRight: "2rem",
              Background: "inherit",
            }}
            // className="dropdown"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              onClick={logout}
            >
              Logout
            </MenuItem>
          </Menu>
        </StyledEngineProvider>
      </div>
      <div className="container">
        <h1
          className="center mt-5"
          style={{ fontWeight: "800px", margin: "auto" }}
        >
          {" "}
          {headerText}
        </h1>
      </div>

      <MultiStepForm user={user} setHeaderText={setHeaderText} />
    </div>
  );
};

export default Layout;
