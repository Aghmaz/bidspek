import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
// import Slider from '@mui/material/Slider';
import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
import {
  // Radio, RadioGroup, FormControlLabel,
  Slider,
} from "@material-ui/core";
import "./services.css";
// import { Country, State } from "country-state-city";
import { multiStepContext } from "../StepContext";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";

// country names array

const inisialState = [
  { title: "Condition Assessment", flag: false },
  { title: "Investigation", flag: false },
  { title: "Lab Services", flag: false },
  { title: "Structural Evaluation", flag: false },
  { title: "NDT/SDT", flag: false },
  { title: "Cathodic Protection", flag: false },
  { title: "Concret Repair /Masonry Design", flag: false },
  { title: "Structural Strengthening", flag: false },
];

function Services(props) {
  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("billing") || ""
  );

  // new code for pie license
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem("billing", value);
  };
  // use effect for license
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("billing", selectedValue);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedValue]);

  // declaring a state for PE License
  const [pieLicense, setPieLicense] = useState(
    localStorage.getItem("pieLicense") || ""
  );

  const handleGroup1Change = (event) => {
    const value = event.target.value;
    setPieLicense(value);
    localStorage.setItem("pieLicense", value);
  };

  // Declaring a State for Corrosion
  const [corrosion, setCorrosion] = useState(
    localStorage.getItem("corrosion") || ""
  );
  const handleGroup2Change = (event) => {
    setCorrosion(event.target.value);
    localStorage.setItem("corrosion", event.target.value);
  };
  // declaring a state for building permit
  const [buildingPermit, setBuildingPermit] = useState(
    localStorage.getItem("buildingPermit") || ""
  );
  const handleGroup3Change = (event) => {
    const value = event.target.value;
    setBuildingPermit(value);
    localStorage.setItem("buildingPermit", value);
  };

  // declaring a state for Region global state
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  // useEffect for all states because of mounting unmounting prevention
  useEffect(() => {
    // Update local storage when state variables change
    localStorage.setItem("pieLicense", pieLicense);
    localStorage.setItem("corrosion", corrosion);
    localStorage.setItem("buildingPermit", buildingPermit);
  }, [pieLicense, corrosion, buildingPermit]);

  // ======country & state ===

  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedState, setSelectedState] = useState("");

  // const handleCountryChange = (event, newValue) => {
  //   setSelectedCountry(newValue ? newValue.value : null);
  //   setSelectedState("");
  // };

  // const handleStateChange = (event, newValue) => {
  //   setSelectedState(newValue ? newValue.value : null);
  // };

  // console.log(Country.getAllCountries());
  // console.log(State.getAllStates());

  const [serviceState, setServiceState] = useState(
    JSON.parse(localStorage.getItem("servicesData")) || inisialState
  );
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function selectItem(item, index) {
    const tempState = [...serviceState];
    tempState[index].flag = !tempState[index].flag;

    setServiceState(tempState);
  }
  function handleAddItem() {
    if (inputValue.trim() !== "") {
      const newItem = { title: inputValue, flag: false };
      const tempState = [...serviceState, newItem];
      setServiceState(tempState);
      localStorage.setItem("servicesData", JSON.stringify(tempState));
      setShowInput(false);
      setInputValue("");
    }
  }

  useEffect(() => {
    const selectedItems = serviceState.filter((item) => item.flag);
    // console.log(selectedItems);
    localStorage.setItem("servicesData", JSON.stringify(serviceState));
  }, [serviceState]);

  // ============ price ranger ==========

  const [hourlyRate, setHourlyRate] = useState(() => {
    const savedItem = localStorage.getItem("hourly");
    return savedItem ? JSON.parse(savedItem) : 0;
  });

  const handleHourlyRateChange = (event, newValue) => {
    setHourlyRate(newValue);
  };

  useEffect(() => {
    localStorage.setItem("hourly", JSON.stringify(hourlyRate));
  }, [hourlyRate]);

  // ==============dynamic data =========
  const [heading, setHeading] = useState(
    "If Yes,please specify the region,country & states * ?"
  );

  // ===============
  const [isInputField, setIsInputField] = useState(
    localStorage.getItem("isInputField3") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isInputField3", isInputField);
  }, [isInputField]);
  const handleSend = () => {
    if (isInputField) {
      setStep(4);
    } else {
      notify();
    }
  };

  const notify = () => toast("Please Choose At Least one of each Section");

  return (
    <div style={{ margin: "auto", width: "60%" }} className=" mb-3 mt-5">
      <h3>Service Offered</h3>
      <span>What kind of services do you want to provide</span>
      {showInput ? (
        <div
          style={{
            display: "inline",
            padding: "0.3rem",
            float: "right",
            marginTop: "-1rem",
          }}
        >
          <input
            style={{ paddingLeft: "1rem", width: "7rem", marginRight: "1rem" }}
            type="text"
            placeholder="Enter title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            style={{ float: "right", border: "none" }}
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      ) : (
        <button
          style={{ float: "right", border: "none" }}
          onClick={() => setShowInput(true)}
        >
          <span style={{ textDecoration: "underline", color: "blue" }}>
            Add new
          </span>
        </button>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {serviceState.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                border: "solid 0.5px #1976d2",
                margin: "10px",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                borderRadius: "25px",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                backgroundColor: `${item.flag ? "#1976d2" : "inherit"}`,
                boxShadow: `${
                  item.flag ? "-1px 2px 10px -1px grey" : "0px 0px 0px 0px"
                }`,
                cursor: "pointer",
              }}
              onClick={() => selectItem(item, index)}
            >
              <p
                style={{
                  margin: "0px",
                  color: `${item.flag ? "white" : "#1976d2"}`,
                }}
              >
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Budget Price Range</h3>
        <span>Billing Method</span>
        <div style={{ display: "flex", gap: "5px" }} className="mt-3">
          <div className="row w-100">
            <div className="col-sm-6">
              <Card
                style={{ borderColor: "blue" }}
                className="bg-white p-2 "
                md="4"
                variant="outline-primary"
              >
                <Form.Check
                  style={{ color: "blue" }}
                  inline
                  label="Hourly Rate"
                  name="billing"
                  value="hourlyRate"
                  type="radio"
                  checked={selectedValue === "hourlyRate"}
                  onChange={handleChange}
                />
              </Card>{" "}
            </div>
            <div className="col-sm-6">
              <Box width={300}>
                <Slider
                  value={hourlyRate}
                  onChange={handleHourlyRateChange}
                  min={0}
                  max={300}
                  step={1}
                  valueLabelDisplay="auto"
                  aria-labelledby="hourly-rate-slider"
                />

                {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
              </Box>
              <div>Hourly rate: ${hourlyRate}</div>
            </div>
            <div className="row">
              <h1>Licenses & Certificates</h1>
              <h6>Do you carry a PE License ?</h6>
              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="Yes"
                    name="group1"
                    value="yes"
                    checked={pieLicense === "yes"}
                    onChange={handleGroup1Change}
                  />
                </Card>{" "}
              </div>
              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="No"
                    name="group1"
                    value="no"
                    checked={pieLicense === "no"}
                    onChange={handleGroup1Change}
                  />
                </Card>{" "}
              </div>
            </div>
            <div className="row mt-3">
              <h6>Are you a certified corrosion Engineer?</h6>

              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="Yes"
                    name="group2"
                    value="yes"
                    checked={corrosion === "yes"}
                    onChange={handleGroup2Change}
                  />
                </Card>{" "}
              </div>
              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="No"
                    name="group2"
                    value="no"
                    checked={corrosion === "no"}
                    onChange={handleGroup2Change}
                  />
                </Card>{" "}
              </div>
            </div>
            <div className="row mt-3">
              <h6>
                Are you or company able to provide assistance with building
                permits ?
              </h6>
              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="Yes"
                    name="group3"
                    value="yes"
                    checked={buildingPermit === "yes"}
                    onChange={handleGroup3Change}
                  />
                </Card>{" "}
              </div>
              <div className="col-lg-3 col-sm-6">
                {" "}
                <Card
                  style={{ borderColor: "blue" }}
                  className="bg-white p-2 "
                  md="4"
                  variant="outline-primary"
                >
                  <Form.Check
                    style={{ color: "blue" }}
                    type="radio"
                    label="No"
                    name="group3"
                    value="no"
                    checked={buildingPermit === "no"}
                    onChange={handleGroup3Change}
                  />
                </Card>{" "}
              </div>
            </div>
            <div className="row mt-3">
              <h6 className="mb-3">{heading}</h6>

              <div className="col-lg-3 col-sm-4">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {},
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Region"
                    variant="outlined"
                    value={userData["region"]}
                    onChange={(e) =>
                      setUserData({ ...userData, region: e.target.value })
                    }
                  />
                </Box>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {},
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="country"
                    variant="outlined"
                    value={userData["country"]}
                    onChange={(e) =>
                      setUserData({ ...userData, country: e.target.value })
                    }
                  />
                </Box>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {},
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="state"
                    variant="outlined"
                    value={userData["state"]}
                    onChange={(e) =>
                      setUserData({ ...userData, state: e.target.value })
                    }
                    onFocus={() => setIsInputField(true)}
                  />
                </Box>
              </div>
              {/* <div className="col-lg-4 col-sm-4">
                <Autocomplete
                  id="country"
                  options={Country.getAllCountries().map((country) => ({
                    label: country.name,
                    value: country.isoCode,
                  }))}
                  value={
                    selectedCountry
                      ? {
                          label: Country.getCountryByCode(selectedCountry).name,
                          value: selectedCountry,
                        }
                      : null
                  }
                  onChange={handleCountryChange}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" variant="outlined" />
                  )}
                />
              </div>
              <div className="col-lg-4 col-sm-4">
                <Autocomplete
                  id="state"
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry).map(
                          (state) => ({
                            label: state.name,
                            value: state.isoCode,
                          })
                        )
                      : []
                  }
                  value={
                    selectedState
                      ? {
                          label: State.getStateByCode(
                            selectedCountry,
                            selectedState
                          ).name,
                          value: selectedState,
                        }
                      : null
                  }
                  onChange={handleStateChange}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="State" variant="outlined" />
                  )}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Button
        style={{
          paddingLeft: "4rem",
          paddingRight: "4rem",
          marginBottom: "1rem",
          border: "2px solid rgb(25, 118, 210)",
        }}
        className=" mb-3 mt-3"
        variant="outline-primary"
        type="submit"
        onClick={() => setStep(2)}
      >
        back
      </Button>

      <Button
        style={{
          float: "right",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          marginBottom: "1rem",
          backgroundColor: "rgb(25, 118, 210)",
          color: "white",
        }}
        className=" mb-3 mt-3"
        type="submit"
        onClick={handleSend}
      >
        next
      </Button>
      <ToastContainer />
      <br />
      <br />
    </div>
  );
}

export default Services;
