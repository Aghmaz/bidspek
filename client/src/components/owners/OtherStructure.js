import React from "react";
import Button from "@mui/material/Button";

const OtherStructure = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="card w-75  mb-4" style={{ background: "transparent" }}>
        <div class="card-body">
          <h1 class="card-title">
            We need a little more information to be <br /> able to assist you!
          </h1>
          <h5 class="card-text">Enter a brief description of your project.</h5>
          <div style={{ margin: "auto" }} class="mb-3 w-75 text-center mb-5">
            <textarea
              class="form-control"
              placeholder="Project Description"
              id="exampleFormControlTextarea1"
              rows="8"
            ></textarea>
          </div>
          <hr />
          {/* <Button
            style={{
              flexGrow: 1,
              margin: "0 5px",
              maxWidth: "180px",
              border: "2px solid rgb(25, 118, 210)",
            }}
            variant="outline-primary"
            type="submit"
            // onClick={() => setStep(1)}
          >
            back
          </Button> */}
          <Button
            style={{
              backgroundColor: "rgb(25, 118, 210)",
              color: "white",
              marginLeft: "auto",
              paddingLeft: "3.5rem",
              paddingRight: "3.5rem",
              textTransform: "initial",
            }}
            type="submit"
            // onClick={handleSend}
          >
            submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherStructure;
