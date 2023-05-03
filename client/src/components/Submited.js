import React, { useState } from "react";

import Navbar from "./navbar";

import Card from "react-bootstrap/Card";

export const Submited = () => {
  return (
    <div className="w-100" style={{ overflow: "hidden" }}>
      <Navbar />

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
              You have Submited the Form.
            </h6>
          </Card.Body>
        </Card>
      </div>

      {/* ============= */}
    </div>
  );
};
