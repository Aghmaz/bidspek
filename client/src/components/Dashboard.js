import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import axios from "axios";

const Dashboard = ({ onClick }) => {
  const [engineers, setEngineers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/engineer/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEngineers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedEngineers = engineers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleViewProfile = (id) => {
    const user = engineers.find((engineer) => engineer._id === id);
    if (user) {
      setSelectedUser(user);
      navigate(`/profile/${id}`);
      if (
        (user.role && user.licensePE) ||
        (user.corrosionEngineer && user.buildingPermits)
      ) {
        localStorage.setItem("jobTitle", user.role);
        localStorage.setItem("peLicense", user.licensePE);
        localStorage.setItem("corrosionEngineer", user.corrosionEngineer);
        localStorage.setItem("buildingPermits", user.buildingPermits);
      } else {
        localStorage.removeItem("jobTitle");
        localStorage.removeItem("peLicense");
      }
    } else {
      console.log(`User with ID ${id} not found`);
    }
  };

  const handleDeleteProfile = async (id) => {
    // Add your delete profile logic here
    try {
      if (!id) {
        console.error(
          "Error deleting image: engineerId not found in localStorage."
        );
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/engineer/${id}`
      );

      setEngineers((prevEngineers) =>
        prevEngineers.filter((engineer) => engineer._id !== id)
      );
      // Check the response status to see if the delete was successful.
      if (response.status === 200) {
        // Handle success.
        console.log("user deleted successfully.");
      } else {
        // Handle error.
        console.error("Error deleting user.");
      }
    } catch (error) {
      console.error(error);
    }

    console.log(`Deleting profile with ID: ${id}`);
  };

  const logout = async () => {
    try {
      localStorage.removeItem("hasReloadedOnce");
      localStorage.removeItem("token");

      await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);
      navigate("/owner-login");
    } catch (error) {
      console.error(error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = "muneer";
  return (
    <div className="container">
      <div className="logout_button mt-5" style={{ marginRight: "1.6rem" }}>
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
            {/* hello */}
            {user ? user.slice(0, 2) : "B"}
          </Avatar>
          {user ? user : "Bidspek"}

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
      <div className="mt-5" style={{ margin: "auto" }}>
        <h1 className="ms-5">All Users</h1>
        <div className="container d-flex justify-content-center align-items-center">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="fw-bold">Sr</TableCell>
                  <TableCell className="fw-bold">User Status</TableCell>
                  <TableCell className="fw-bold">Role</TableCell>
                  <TableCell className="fw-bold">Email</TableCell>
                  <TableCell className="fw-bold">ID</TableCell>
                  <TableCell className="fw-bold">See Profile</TableCell>
                  <TableCell className="fw-bold">Delete Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedEngineers.map((engineer, index) => (
                  <TableRow key={engineer._id}>
                    <TableCell className="fw-bold">{index + 1}</TableCell>
                    <TableCell>
                      {engineer.role
                        ? "User submitted Form"
                        : "User Only Registered"}
                    </TableCell>
                    <TableCell>{engineer.role}</TableCell>
                    <TableCell>{engineer.email}</TableCell>
                    <TableCell>{engineer._id}</TableCell>
                    <TableCell>
                      <div className="Icons">
                        <IconButton
                          onClick={onClick}
                          style={{ "&:hover": { color: "black" } }}
                        >
                          <PersonIcon
                            // component={Link}
                            // to={`/profile/${engineer._id}`}
                            onClick={() => {
                              handleViewProfile(engineer._id);
                              // Implement your logic to navigate to the profile page
                              console.log(`View profile of ${engineer.email}`);
                            }}
                          />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteProfile(engineer._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={engineers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
