import React, { useState } from "react";
import Navbar from "./navbar";
import MultiStepForm from "./MultiStepForm";
import Button from "@mui/material/Button";
import "./Layout.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

const Layout = (userDetails) => {
  const user = userDetails.user;
  // console.log(user);

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
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
            {user && user.name ? user.name.slice(0, 2) : "B"}
            {/* {user && user.name
              ? user.firstname &&
                user.firstname.localized &&
                user.firstname.localized.en_US
                ? user.firstname.localized.en_US
                : user.name.slice(0, 2)
              : "B"} */}
          </Avatar>
          {user && user.name ? user.name : "Bidspek"}
          {/* {user && user.name
            ? user.firstname.localized.en_US
              ? user.firstname.localized.en_US
              : user.name
            : "Bidspek"} */}
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
