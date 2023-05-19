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

const Dashboard = ({ onClick }) => {
  const [engineers, setEngineers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("engineers>>>>>>>>", engineers);

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
      console.log("testing<<<<<<<<<<>>>>>>>>>", user);
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

  const handleDeleteProfile = (id) => {
    // Add your delete profile logic here
    console.log(`Deleting profile with ID: ${id}`);
  };
  return (
    <div style={{ margin: "auto" }}>
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
  );
};

export default Dashboard;
