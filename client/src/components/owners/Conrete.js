import React, { useState } from "react";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Rectangle from "../../images/Rectangle.png";

const Concrete = () => {
  const [searchData, setSearchData] = useState([
    { id: 1, name: "Parking Garage" },
    { id: 2, name: "Building Exterior" },
  ]);
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (query.toLowerCase() === "parking garage") {
      navigate("/parking-garage");
      localStorage.setItem("location", "parking garage");
    } else if (query.toLowerCase() === "building exterior") {
      navigate("/parking-garage");
      localStorage.setItem("location", "building exterior");
    }
  };

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setquery(getSearch);
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-center align-items-center">
        <InputGroup className="mb-3 w-75 ">
          <Form.Control
            className="red-input"
            style={{ padding: "0.9rem" }}
            placeholder="What type of structure needs repair?"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={query}
            onChange={(e) => handlesearch(e)}
            list="searchOptions"
          />
          <datalist id="searchOptions">
            {searchData.map((option) => (
              <option key={option.id} value={option.name} />
            ))}
          </datalist>
          <Button
            className="mybutton"
            // style={{
            //   paddingLeft: "3.5rem",
            //   paddingRight: "3.5rem",
            //   textTransform: "initial",
            // }}
            variant="contained"
            id="button-addon2"
            onClick={handleNextClick}
          >
            Next
          </Button>
        </InputGroup>
      </div>
      <div className="check mb-3">
        <img
          style={{ marginTop: "-2.5rem" }}
          className="img-fluid"
          src={Rectangle}
          // src="https://res.cloudinary.com/df8fsfjad/image/upload/v1681489902/Rectangle_pyk0rf.png"
          alt="Rectangular"
        />
      </div>
    </div>
  );
};

export default Concrete;
