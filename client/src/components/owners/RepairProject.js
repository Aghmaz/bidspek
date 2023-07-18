import React, { useState, useContext } from "react";
import Navbar from "../navbar";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const RepairProject = () => {
  const navigate = useNavigate();
  const { userData } = useContext(multiStepContext);

  // console.log("userData>>>>>>", userData.ownerEmail, userData.zipowner);

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

  // const handleSend = () => {
  //   if (checkBox === true) {
  //     window.location.href = "https://on.sprintful.com/bidspek";
  //   } else {
  //     notify();
  //   }
  // };

  const handleBack = () => {
    navigate("/parking-garage/slab/local-engineer");
  };
  const notify = () =>
    toast("Please Select Term & condition.", { type: "error" });

  // const check = JSON.parse(localStorage.getItem("checkbox"));
  // const structuralcheck = JSON.parse(
  //   localStorage.getItem("structuralcheckbox")
  // );
  // const selectedStructural = structuralcheck?.filter((item) => item.flag);
  // const selectedcheck = check?.filter((item) => item.flag);

  // const handleSend = (e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   const formData = new FormData();

  //   formData.append("owneremail", userData.ownerEmail);
  //   formData.append("ownerzip", userData.zipowner);
  //   formData.append("screentwo", JSON.stringify(selectedStructural));
  //   formData.append("screenone", JSON.stringify(selectedcheck));
  //   // formData.append("zipCode", userData.zip);

  //   const config = {
  //     method: "post",
  //     url: `${process.env.REACT_APP_API_URL}/owner`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: formData,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.data);

  //       // localStorage.clear();
  //       // localStorage.removeItem("engineerId");
  //       // localStorage.removeItem("occupation");
  //       // localStorage.removeItem("pieLicense");
  //       // localStorage.removeItem("corrosion");
  //       // localStorage.removeItem("company_name");
  //       // localStorage.removeItem("buildingPermit");
  //       // localStorage.removeItem("isInputField");
  //       // localStorage.removeItem("uploadedImage");
  //       // localStorage.removeItem("isInputField3");
  //       // localStorage.removeItem("selectedvalue");
  //       // localStorage.removeItem("isImageUploaded");
  //       // localStorage.removeItem("isInputField2");
  //       // localStorage.removeItem("hourly");
  //       // localStorage.removeItem("billing");
  //       // localStorage.removeItem("switchValue");
  //       // localStorage.removeItem("selectedValue");
  //       // localStorage.removeItem("boxCount");
  //       // localStorage.removeItem("images");
  //       // localStorage.removeItem("servicesData");
  //       // localStorage.removeItem("professionalData");
  //       // localStorage.removeItem("hasReloadedOnce");
  //       // setTimeout(() => {
  //       //   localStorage.removeItem("token");
  //       // }, 10000);
  //       notify();
  //       if (checkBox === true) {
  //         window.location.href = "https://on.sprintful.com/bidspek";
  //       } else {
  //         notifymes();
  //       }
  //     })
  //     .catch(function (error) {
  //       errorToast();
  //       console.log(error);
  //     });
  // };

  const handleSend = (e) => {
    e.preventDefault();

    const formData = {
      owneremail: userData.ownerEmail,
      ownerzip: userData.zipowner,
      // screentwo: JSON.stringify(selectedStructural),
      // screenone: JSON.stringify(selectedcheck),
      screentwo: structuralcheckbox,
      screenone: checkBoxed,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/engineer/owner`, formData)
      .then(function (response) {
        console.log(response.data);
        notify();

        if (checkBox) {
          window.location.href = "https://on.sprintful.com/bidspek";
        }
      })
      .catch(function (error) {
        errorToast();
        console.log(error);
      });
  };
  const notifymes = () => toast("You Form has been Submited");
  if (!checkBox) {
    notifymes();
  }
  const errorToast = () => toast("this is error", { Type: "error" });

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
