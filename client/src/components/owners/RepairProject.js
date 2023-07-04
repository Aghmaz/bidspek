import React, { useState } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";

const RepairProject = () => {
  const navigate = useNavigate();

  const checkBoxed = JSON.parse(localStorage.getItem("checkbox"));
  const structuralcheckbox = JSON.parse(
    localStorage.getItem("structuralcheckbox")
  );

  const [checkBox, setCheckBox] = useState(
    localStorage.getItem("lastScreen") || ""
  );

  // const allItems = [
  //   "Cracks",
  //   "Spalls",
  //   "Structural Issues",
  //   "Corrosion",
  //   "Deflection",
  //   "Excessive Cracking",
  // ];
  const allItems = [
    {
      groupName: "(i)",
      items: ["Cracks", "Spalls", "Structural Issues"],
    },
    {
      groupName: "(ii)",
      items: ["Corrosion", "Deflection", "Excessive Cracking"],
    },
  ];

  const filteredGroups = allItems
    .filter((group) => {
      const filteredItems = group.items.filter(
        (item) =>
          checkBoxed?.includes(item) || structuralcheckbox?.includes(item)
      );
      return filteredItems.length > 0;
    })
    .map((group) => `${group.groupName} ${group.items.join(", ")}`);

  const output = filteredGroups.join(", ");

  const handleCheckBox = (event) => {
    const value = event.target.checked;
    setCheckBox(value);
    localStorage.setItem("lastScreen", value);
    console.log("lastScreen", value);
  };

  const handleSend = () => {
    if (checkBox === true) {
      window.location.href = "https://on.sprintful.com/bidspek";
    } else {
      notify();
    }
  };

  const handleBack = () => {
    navigate("/parking-garage/slab/local-engineer");
  };
  const notify = () =>
    toast("Please Select Term & condition.", { type: "error" });

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="mt-5 mb-4 d-flex justify-content-center align-items-center">
        <div className="card w-75 mb-4" style={{ background: "transparent" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-5 mt-5">
              Your repair project:{" "}
            </h2>
            <hr />
            <h4
              className="mb-4 mt-5 text-center"
              style={{
                // margin: "auto",
                // width: "55%",
                // display: "block",
                fontSize: "25px",
              }}
            >
              Parking Garage - Slab -{" "}
              {/* {allItems
                .filter((item) => {
                  return (
                    checkBoxed?.includes(item) ||
                    structuralcheckbox?.includes(item)
                  );
                })
                .join(", ")}{" "} */}
              {output}
              on grade crack repair
            </h4>
            {/* <h4
              className="mb-4 mt-2 text-center"
              style={{
                margin: "auto",
                // width: "55%",
                // display: "block",
                fontSize: "22px",
              }}
            >
              Project Estimate: $35,000 - $55,000
            </h4> */}
            <span
              style={{
                margin: "auto",
                width: "55%",
                display: "block",
                fontSize: "19px",
              }}
            >
              This initial estimate is based on local cost data of hundreds of
              similar projects near your location. This is NOT a final quote.
            </span>
            <div
              className="row row-cols-1 row-cols-md-8 row-cols-lg-2 g-4 w-100 justify-content-center"
              style={{ gap: "0.1rem", margin: "auto" }}
            ></div>
            <hr className="mt-5" />
            <div
              style={{
                margin: "auto",
                width: "60%",
                // display: "block",
                // fontSize: "19px",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  checked={checkBox === true}
                  onChange={handleCheckBox}
                  label="I agree to Bidspek’s terms and conditions, and agree to be called by a Bidspek specialist to discuss my quote. "
                />
              </FormGroup>
            </div>
            <hr />

            <div
              className="w-75 mx-auto"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                style={{
                  flexGrow: 1,
                  margin: "0 5px",
                  maxWidth: "180px",
                  border: "2px solid rgb(25, 118, 210)",
                }}
                variant="outline-primary"
                type="submit"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                style={{
                  flexGrow: 1,
                  margin: "0 5px",
                  maxWidth: "180px",
                  backgroundColor: "rgb(25, 118, 210)",
                  color: "white",
                  marginLeft: "auto",
                }}
                type="submit"
                onClick={handleSend}
              >
                Schedule a call
              </Button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairProject;
