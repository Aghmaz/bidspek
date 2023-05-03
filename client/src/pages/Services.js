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
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CloseIcon from "@mui/icons-material/Close";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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

const inisialState2 = [
  { title: "Corrosion Protection", flag: false },
  { title: "Concrete Repairs", flag: false },
  { title: "Waterproofing", flag: false },
  { title: "Painting", flag: false },
  { title: "Flooring", flag: false },
  { title: "Masonry Repairs", flag: false },
  { title: "Coatings", flag: false },
  { title: "Strengthening", flag: false },
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
  const [state, SetState] = useState("");
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
    JSON.parse(localStorage.getItem("servicesData")) ||
      inisialState ||
      inisialState2
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
  const [heading, setHeading] = useState("");
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [heading4, setHeading4] = useState("");

  const jobtitle = localStorage.getItem("selectedValue");

  useEffect(() => {
    if (jobtitle === "engineer") {
      setHeading("If Yes, please specify the region, country & states * ?");
      setHeading1("Do you carry a PE License ?");
      setHeading2("Are you a certified corrosion Engineer?");

      setHeading3(
        "Are you or company able to provide assistance with building permits ? "
      );

      setServiceState(inisialState);
    } else {
      setHeading(
        "Which country/states are you or your company licensed to work in?"
      );
      setHeading1("Become an Advisor");
      setHeading2("Sign up for the next two webinars");
      setHeading3("Price Bidspek sample project");
      setHeading4("Increase your chances to win more work!");

      setServiceState(inisialState2);
    }
  }, [jobtitle]);
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
      <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
        <div>
          <h3>Service Offered</h3>
          <span>What kind of services do you want to provide</span>
        </div>
        <div className="display-change">
          {showInput ? (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                aria-label="Enter title"
                aria-describedby="button-addon2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleAddItem}
              >
                <DownloadDoneIcon />
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => setShowInput(false)}
              >
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-link add-btn"
              onClick={() => setShowInput(true)}
            >
              <u>Add new</u>
            </button>
          )}
        </div>
      </div>

      {/* <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <h3>Service Offered</h3>
          <span>What kind of services do you want to provide</span>
        </div>
        <div style={{ maxWidth: "400px" }} className="display-change">
          {showInput ? (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                aria-label="Enter title"
                aria-describedby="button-addon2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleAddItem}
              >
                <DownloadDoneIcon />
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => setShowInput(false)}
              >
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button className="btn btn-link" onClick={() => setShowInput(true)}>
              <u>Add new</u>
            </button>
          )}
        </div>
      </div> */}

      {/* <h3>Service Offered</h3>
      <span>What kind of services do you want to provide</span>
      <div
        className="d-flex flex-row justify-content-end align-items-center "
        style={{ maxWidth: "200px", flaot: "right" }}
      >
        {showInput ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              aria-label="Enter title"
              aria-describedby="button-addon2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        ) : (
          <button className="btn btn-link" onClick={() => setShowInput(true)}>
            <u>Add new</u>
          </button>
        )}
      </div> */}

      {/* {showInput ? (
        <div
          style={{
            display: "inline",
            padding: "0.3rem",
            float: "right",
            marginTop: "-1rem",
          }}
        >
          

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter title"
              aria-label="Enter title"
              aria-describedby="button-addon2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
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
      )} */}
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
                  label={`Hourly Rate : $${hourlyRate}`}
                  name="billing"
                  value="hourlyRate"
                  type="radio"
                  checked={selectedValue === "hourlyRate"}
                  onChange={handleChange}
                />
              </Card>{" "}
            </div>
            <div className="col-sm-6">
              <Box width={210}>
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
              {/* <div>Hourly rate: ${hourlyRate}</div> */}
            </div>
            <div className="row mt-2">
              <h1>Licenses & Certificates</h1>
              <h4>{heading4}</h4>
              <h6>{heading1}</h6>
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
              <h6>{heading2}</h6>

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
              <h6>{heading3}</h6>
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

              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  {/* <Form.Label>City</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="City"
                    optional
                    // onChange={handleChange}
                    value={userData["city"]}
                    onChange={(e) =>
                      setUserData({ ...userData, city: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  {/* <Form.Label>State</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="State"
                    required
                    // onChange={handleChange}
                    value={userData["state"]}
                    onChange={(e) =>
                      setUserData({ ...userData, state: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  {/* <Form.Label>Zip</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    required
                    // onChange={handleChange}
                    value={userData["country"]}
                    onChange={(e) =>
                      setUserData({ ...userData, country: e.target.value })
                    }
                    onFocus={() => setIsInputField(true)}
                  />
                </Form.Group>
              </Row>
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // width: "100%",
          alignItems: "center",
          marginTop: "1rem",
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
          onClick={() => setStep(2)}
        >
          back
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
          next
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Services;
