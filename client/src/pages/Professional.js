import React, { useContext, useState, useReducer, useEffect } from "react";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "./professional.css";
import Form from "react-bootstrap/Form";
import { multiStepContext } from "../StepContext";
import { ToastContainer, toast } from "react-toastify";

// for selection
const inisialState = [
  { title: "High Rise Condonminiums", flag: false },
  { title: "Parking Garages", flag: false },
  { title: "Office Buildings", flag: false },
  { title: "Low Rise Structure", flag: false },
  { title: "Floors & badge", flag: false },
  { title: "Marine Structure", flag: false },
  { title: "Underground tunnel & pipelines", flag: false },
];

const Professional = (props) => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("selectedValue") || ""
  );

  // new code for job title
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    // setIsInputField(true);
    localStorage.setItem("selectedValue", value);
  };
  // use effect for job tittle
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("selectedValue", selectedValue);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedValue]);

  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("professionalData")) || inisialState
  );

  function selectItem(item, index) {
    const tempSate = [...state];
    tempSate[index].flag = !tempSate[index].flag;
    setState(tempSate);
    setIsInputField(true);
  }

  useEffect(() => {
    const selectedItems = state.filter((item) => item.flag);
    // console.log(selectedItems);
    localStorage.setItem("professionalData", JSON.stringify(state));
  }, [state]);

  // ===============

  const [isInputField, setIsInputField] = useState(
    localStorage.getItem("isInputField2") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isInputField2", isInputField);
  }, [isInputField]);
  const handleSend = () => {
    if (isInputField) {
      setStep(3);
    } else {
      notify();
    }
  };

  const notify = () => toast("Please Choose At Least one of each Section");

  return (
    <div style={{ margin: "auto", width: "60%" }} className="mb-3 mt-5 ">
      <h5> Job Title</h5>
      <p className="mt-3" style={{ fontSize: "11px" }}>
        {" "}
        Pick the job title you identify with the most
      </p>

      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // justifyContent: "center",
            gap: "5px",
          }}
        >
          <Card
            // style={{ width: "35%" }}
            style={{ width: "100%", maxWidth: "250px", marginBottom: "5px" }}
            className="bg-white  p-2 "
            md="4"
            variant="outline-primary"
          >
            <Form.Check
              inlineu
              label="Engineer"
              name="job-title"
              value="engineer"
              type="radio"
              checked={selectedValue === "engineer"}
              onChange={handleChange}
            />
          </Card>{" "}
          <Card
            style={{ width: "100%", maxWidth: "250px", marginBottom: "5px" }}
            className="bg-white  p-2"
            md="4"
            variant="outline-primary"
          >
            <Form.Check
              inline
              label="Contractor"
              name="job-title"
              value="contractor"
              type="radio"
              checked={selectedValue === "contractor"}
              onChange={handleChange}
            />
          </Card>{" "}
          <Card
            style={{ width: "100%", maxWidth: "250px", marginBottom: "5px" }}
            className="bg-white  p-2"
            md="4"
            variant="outline-primary"
          >
            <Form.Check
              inline
              label="Consultant"
              name="job-title"
              type="radio"
              value="consultant"
              disabled
              checked={selectedValue === "consultant"}
              onChange={handleChange}
            />
          </Card>{" "}
        </div>
        <h5 className="mt-3"> My Specialty</h5>
        <p className="mt-3" style={{ fontSize: "11px" }}>
          Add the types of infrastructure projects that are most interesting to
          you
        </p>
        <h6 className="mt-5"> Specify your preference</h6>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {state.map((item, index) => {
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
            onClick={() => setStep(1)}
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
    </div>
  );
};

export default Professional;
