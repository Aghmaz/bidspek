import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Avatar from "@material-ui/core/Avatar";
import { Card, TabContainer } from "react-bootstrap";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log("engineers user>>>>>>>>", user);

  const [heading, setHeading] = useState("");
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [heading4, setHeading4] = useState("");

  const jobTitle = localStorage.getItem("jobTitle");
  const peLicense = localStorage.getItem("peLicense");
  const corrosionEngineer = localStorage.getItem("corrosionEngineer");
  const buildingPermits = localStorage.getItem("buildingPermits");

  console.log("jobTile>>>>>>>>>>>>", jobTitle);
  useEffect(() => {
    if (jobTitle === "engineer") {
      setHeading("If Yes, please specify the region, country & states * ?");
      setHeading1("Do you carry a PE License ?");
      setHeading2("Are you a certified corrosion Engineer?");

      setHeading3(
        "Are you or company able to provide assistance with building permits ? "
      );

      // setServiceState(inisialState);
    } else {
      setHeading(
        "Which country/states are you or your company licensed to work in?"
      );
      setHeading1("Become an Advisor");
      setHeading2("Sign up for the next two webinars");
      setHeading3("Price Bidspek sample project");
      setHeading4("Increase your chances to win more work!");

      // setServiceState(inisialState2);
    }
  }, [jobTitle]);

  // console.log("engineers user>>>>>>>>", user.services);
  console.log("engineers user preferences >>>>>>>>", user?.preferences);
  const preferencesArray =
    user && user?.preferences.length > 0 ? JSON.parse(user?.preferences) : [];

  const servicesArray =
    user && user?.services.length > 0 ? JSON.parse(user?.services) : [];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const engineerId = id;
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/engineer/${engineerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user's information");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading state while fetching user's information
  }

  // ===============

  return (
    <div className="container">
      {/* ================ personal data =========== */}
      <div className="mt-5">
        <h5> My Profile</h5>
        <p className="mt-3" style={{ fontSize: "11px" }}>
          {" "}
          Start by filling your personal information
        </p>
        <h5 className="mt-4">Profile Photo</h5>
        <div className="d-flex align-items-center ">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
          />

          <div>
            {user.profileImage && (
              <Avatar
                style={{
                  border: "2px solid blue",
                  width: "100px",
                  height: "100px",
                  marginLeft: "2rem",
                  marginRight: "3rem",
                }}
                src={user.profileImage}
                alt="Uploaded Image"
              />
            )}
          </div>
        </div>

        {/* ======= form data =====  */}
        <Row className="mb-3 mt-3">
          {user.firstName && (
            <Form.Group as={Col} md="6">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                disabled
                value={user.firstName}
              />
            </Form.Group>
          )}
        </Row>
        <Row>
          {user.lastName && (
            <Form.Group as={Col} md="6">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                disabled
                value={user.lastName}
              />
            </Form.Group>
          )}
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              required
              type="Email"
              // placeholder="First Name"
              disabled
              value={user.email}
            />
          </Form.Group>
          {/* =======radio buttons ========*/}

          {/* <div className="row mt-3">
            <div className="col-1">
              {storeOccupation === "company" && (
                <Form.Check
                  inline
                  label="company"
                  // value={storeOccupation.comp}
                  type="radio"
                  checked={storeOccupation === "company"}
                />
              )}

              {storeOccupation === "personal" && (
                <Form.Check
                  className=""
                  inline
                  label="personal"
                  // value="personal"
                  type="radio"
                  checked={storeOccupation === "personal"}
                />
              )}
            </div>
          </div> */}

          {/* <div className="row">
            {storeOccupation === "company" && (
              <div className="col mt-2">
                <Form.Group as={Col} md="6">
                  <Form.Control
                    required
                    type="text"
                    placeholder="company name"
                    disabled
                    value={storedCompanyValue}
                    // isValid={validateField('lastname')}
                    // isInvalid={!validateField('lastname')}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid last name.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
            )}
          </div> */}

          {/* ===== */}
          {user.phone && (
            <Form.Group className="" as={Col} md="6">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control required type="text" disabled value={user.phone} />
            </Form.Group>
          )}
        </Row>

        {user.linkedin && (
          <div className="row mb-4">
            <div className="col">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                label="Linkedin"
                className="form-control"
                value={user.linkedin}
                disabled
                style={{ width: "100%" }}
              />
            </div>
          </div>
        )}

        <Row className="mb-3">
          {user.address && (
            <Form.Group as={Col} md="12">
              <Form.Label>Address*</Form.Label>
              <Form.Control
                type="text"
                placeholder="optional"
                disabled
                value={user.address}
              />
            </Form.Group>
          )}
        </Row>
        <Row className="mb-3">
          {user.city && (
            <Form.Group as={Col} md="4">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                disabled
                value={user.city}
              />
            </Form.Group>
          )}

          {user.state && (
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                disabled
                value={user.state}
              />
            </Form.Group>
          )}
          {user.zip && (
            <Form.Group as={Col} md="4">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip code"
                disabled
                value={user.zip}
              />
            </Form.Group>
          )}
        </Row>
      </div>
      {/* =========================Professional form Data ============  */}
      <div className="professional mt-4">
        <div>
          <h5> Job Title</h5>
          <p className="mt-3" style={{ fontSize: "11px" }}>
            {" "}
            Pick the job title you identify with the most
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // justifyContent: "center",
              gap: "5px",
            }}
          >
            {user.role === "engineer" && (
              <Card
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                className="bg-white  p-2 "
                md="4"
                variant="outline-primary"
              >
                <Form.Check
                  inlineu
                  label="Engineer"
                  name="job-title"
                  type="radio"
                  disabled
                  checked={user.role === "engineer"}
                />
              </Card>
            )}
            {user.role === "contractor" && (
              <Card
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
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
                  disabled
                  checked={user.role === "contractor"}
                />
              </Card>
            )}
          </div>
          <h5 className="mt-4"> My Specialty</h5>
          <p className="mt-3" style={{ fontSize: "11px" }}>
            Add the types of infrastructure projects that are most interesting
            to you
          </p>
          <h6 className="mt-5"> Specify your preference</h6>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {preferencesArray.length > 0 ? (
              preferencesArray.map((item, index) => (
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
              ))
            ) : (
              <p>No preferences found.</p>
            )}
          </div>
        </div>
      </div>
      {/* ==================== services=========  */}
      <div>
        <h3>Service Offered</h3>
        <span>What kind of services do you want to provide</span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {servicesArray.length > 0 ? (
            servicesArray.map((item, index) => {
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
            })
          ) : (
            <p>No services found.</p>
          )}
        </div>
        {/* budget Price Range  */}
        {user.hourlyRate && (
          <div>
            <h3>Budget Price Range</h3>
            <span>Billing Method</span>

            <div className="row mt-3">
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
                    label={`Hourly Rate : $${user.hourlyRate}`}
                    name="billing"
                    value="hourlyRate"
                    // type="radio"
                    // checked={billing}
                    disabled
                    // onChange={handleChange}
                  />
                </Card>{" "}
              </div>
            </div>
          </div>
        )}
        {/* =====Licenses & Certificates====  */}
        {peLicense && (
          <div className="row mt-2">
            <h1>Licenses & Certificates</h1>
            <h4>{heading4}</h4>
            <h6>{heading1}</h6>
            {peLicense === "true" && (
              <div className="col-lg-3 col-sm-6">
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
                    checked={peLicense}
                    disabled
                  />
                </Card>
              </div>
            )}
            {peLicense === "false" && (
              <div className="col-lg-3 col-sm-6">
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
                    checked={peLicense}
                    disabled
                  />
                </Card>
              </div>
            )}
          </div>
        )}
        {corrosionEngineer && (
          <div className="row mt-3">
            <h6> {heading2}</h6>

            {corrosionEngineer === "true" && (
              <div className="col-lg-3 col-sm-6">
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
                    disabled
                    checked={corrosionEngineer}
                  />
                </Card>
              </div>
            )}
            {corrosionEngineer === "false" && (
              <div className="col-lg-3 col-sm-6">
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
                    disabled
                    checked={corrosionEngineer}
                  />
                </Card>
              </div>
            )}
          </div>
        )}
        {/* building permits  */}
        {buildingPermits && (
          <div className="row mt-3">
            <h6>{heading3}</h6>
            {buildingPermits === "true" && (
              <div className="col-lg-3 col-sm-6">
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
                    disabled
                    checked={buildingPermits}
                  />
                </Card>
              </div>
            )}
            {buildingPermits === "false" && (
              <div className="col-lg-3 col-sm-6">
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
                    disabled
                    checked={buildingPermits}
                  />
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="row mt-4">
        <h6>{heading}</h6>

        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            {/* <Form.Label>City</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="City"
              disabled
              // onChange={handleChange}
              value={user.city}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            {/* <Form.Label>State</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="State"
              disabled
              // onChange={handleChange}
              value={user.permitsStates}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            {/* <Form.Label>Zip</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Country"
              disabled
              // onChange={handleChange}
              value={user.permitsCountry}
            />
          </Form.Group>
        </Row>
      </div>
      {/* =============portfolio ================  */}
      <div
        style={{
          margin: "auto",
          // width: "80%",
          // maxWidth: "1270px",
          marginBottom: "5rem",
        }}
        className="mb-3 mt-2 "
      >
        <h3> Project Case Study</h3>
        <span>
          {" "}
          Share images and Pdf of your previous work helps your potential
          clients see the quality of your work
        </span>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // alignItems: "center",
              // justifyContent: "center",
            }}
          >
            {user.caseImage.map((caseImage, index) => (
              <div
                key={index}
                style={{
                  width: "80px",
                  height: "80px",
                  border: "2px solid blue",
                  borderRadius: "0.5rem",

                  margin: "10px",
                }}
              >
                {caseImage?.url.includes(".pdf") && (
                  <object data={caseImage.url} type="application/pdf">
                    <img
                      style={{
                        padding: "5px",
                        width: "74px",
                        height: "70px",
                      }}
                      src="https://res.cloudinary.com/df8fsfjad/image/upload/v1682613030/PDF_file_icon.svg_kdsp9v.png"
                    />
                  </object>
                )}
                {caseImage?.url.includes(".txt") && (
                  <iframe>src={caseImage.url} type="application/txt"</iframe>
                )}
                {caseImage?.url.includes(".png") && (
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      position: "absolute",
                      // objectFit: "cover",
                    }}
                    src={caseImage.url}
                  />
                )}
                {caseImage?.url.includes(".jpg") && (
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      position: "absolute",
                      // objectFit: "cover",
                    }}
                    src={caseImage.url}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================buttons========= */}

      <div
        className="mb-5"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // width: "100%",
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
          onClick={() => navigate("/owner-dashboard")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Profile;
