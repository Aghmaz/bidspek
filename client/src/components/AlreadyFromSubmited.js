import React, { useState } from "react";
import Navbar from "./navbar";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import "./Layout.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useNavigate } from "react-router-dom";

export const AlreadyFromSubmited = ({ user }) => {
  console.log("user>>>>>>>>>", user);
  const navigate = useNavigate();

  let i = 0;
  const tempFileURL = localStorage.getItem(`image_url${i}`);
  const email = localStorage.getItem("email");
  const uploadedImage = localStorage.getItem("uploadedImage");
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    localStorage.removeItem(`image_url${i}`);

    localStorage.removeItem("engineerId");
    localStorage.removeItem("email");
    localStorage.removeItem("uploadedImage");
    localStorage.removeItem("isInputField");
    localStorage.removeItem("switchValue");
    navigate("http://www.bidspek.com");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="w-100" style={{ overflow: "hidden" }}>
      <Navbar />

      <div className="logout_button" style={{ marginRight: "1.6rem" }}>
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
              : user && user.FirstName
              ? user.FirstName.slice(0, 2)
              : "B"}
          </Avatar>
          {user && user.name
            ? user.name
            : user && user.firstName
            ? user.firstName.localized["en_US"]
            : user && user.FirstName
            ? user.FirstName
            : "Bidspek"}

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
            <h6
              className="mb-4"
              style={{
                // fontFamily: "Montserrat",
                fontWeight: "800",
                fontSize: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              You already have Submited Form data
            </h6>
          </Card.Body>
        </Card>
      </div>

      {/* ============= */}
    </div>
  );
};
