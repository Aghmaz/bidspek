import React, { useContext, useState, useEffect } from "react";
import { multiStepContext } from "../StepContext";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Avatar from "@material-ui/core/Avatar";
import { Card } from "react-bootstrap";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import axios from "axios";

const DisplayData = ({ user, props }) => {
  // toaster messages
  const notify = () => toast("You Form has been Submited");
  // const welcomeBack = () => toast("Welcome Back");

  // for avatar picture
  const [image, setImage] = useState(null);

  useEffect(() => {
    const uploadedImage = localStorage.getItem("uploadedImage" || user.picture);
    setImage(uploadedImage);
  }, []);

  // for input fields of personal form
  const { userData, setStep } = useContext(multiStepContext);
  // console.log(user);

  const storedValue = localStorage.getItem("switchValue");

  const storedCompanyValue = localStorage.getItem("company_name");
  const storeOccupation = localStorage.getItem("occupation");

  // ====== professional ====
  const jobTitle = localStorage.getItem("selectedValue");

  // for selection list

  // Retrieve data from local storage
  const data = JSON.parse(localStorage.getItem("professionalData"));

  // console.log("data", data);
  // Filter selected items
  const selectedItems = data?.filter((item) => item.flag);
  // console.log("selectedItems", selectedItems);

  // =============services ===========
  const serviceData = JSON.parse(localStorage.getItem("servicesData"));

  // console.log("serviceData", serviceData);
  // Filter selected items
  const selectedServiceItems = serviceData?.filter((item) => item.flag);
  // console.log("selectedServiceItems", selectedServiceItems);

  // ==== billing radio ====
  const billing = localStorage.getItem("billing");
  // ==== hourly slider ====
  const hourly = localStorage.getItem("hourly");
  // ==== peLicense ====
  const peLicense = localStorage.getItem("pieLicense");
  // ==== corrosion Engineer ====
  const corrosionEngineer = localStorage.getItem("corrosion");
  // ==== Builing permits ====
  const BuilingPermits = localStorage.getItem("buildingPermit");

  const images = JSON.parse(localStorage.getItem("images")) || [];
  const numImages = images.filter((img) => img !== null).length;

  // =============form sending ==========
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const formData = new FormData();
    formData.append(
      "firstName",
      userData.firstname ? userData.firstname : user.given_name
    );
    formData.append(
      "lastName",
      userData.lastname ? userData.lastname : user.given_name
    );
    formData.append("phone", userData.phone);
    formData.append("email", userData.email ? userData.email : user.given_name);
    formData.append("address", userData.address);
    formData.append("city", userData.city);
    formData.append("zipCode", userData.zip);
    formData.append("role", jobTitle);
    formData.append("role", selectedItems);
    formData.append("hourlyRate", hourly);
    formData.append("licensePE", peLicense);
    formData.append("corroionEngineer", corrosionEngineer);
    formData.append("buildingPermits", BuilingPermits);
    formData.append("permitsRegion", userData.region);
    formData.append("permitsCountry", userData.country);
    formData.append("permitsStates", userData.state);
    formData.append("image", image);
    formData.append("preferences", JSON.stringify(selectedItems));
    formData.append("services", JSON.stringify(selectedServiceItems));

    const engineerId = localStorage.getItem("engineerId");
    const config = {
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/engineer/updateprofile/${engineerId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        // localStorage.clear();
        localStorage.removeItem("engineerId");
        localStorage.removeItem("occupation");
        localStorage.removeItem("pieLicense");
        localStorage.removeItem("corrosion");
        localStorage.removeItem("company_name");
        localStorage.removeItem("servicesData");
        localStorage.removeItem("buildingPermit");
        localStorage.removeItem("isInputField");
        localStorage.removeItem("uploadedImage");
        localStorage.removeItem("isInputField3");
        localStorage.removeItem("selectedvalue");
        localStorage.removeItem("isImageUploaded");
        localStorage.removeItem("isInputField2");
        localStorage.removeItem("hourly");
        localStorage.removeItem("billing");
        localStorage.removeItem("professionalData");
        setTimeout(() => {
          localStorage.removeItem("token");
        }, 10000);
        notify();
      })
      .catch(function (error) {
        errorToast();
        console.log(error);
      });
  };
  const errorToast = () => toast("this is error", { Type: "error" });
  // ==============image

  function handleApi() {
    console.log("i am there");
    const formData = new FormData();
    formData.append("image", image);
    const engineerId = localStorage.getItem("engineerId");
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/engineer/profileupload/${engineerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [heading, setHeading] = useState("");
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [heading4, setHeading4] = useState("");
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

  return (
    <div>
      {/* ================ personal data =========== */}
      <div>
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
            {image && (
              <Avatar
                style={{
                  border: "2px solid blue",
                  width: "100px",
                  height: "100px",
                  marginLeft: "2rem",
                  marginRight: "3rem",
                }}
                src={image}
                alt="Uploaded Image"
              />
            )}
          </div>
        </div>

        {/* ======= form data =====  */}
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="6">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              disabled
              value={userData.firstname ? userData.firstname : user.given_name}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Last Name*</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              disabled
              value={userData.lastname ? userData.lastname : user.family_name}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              required
              type="Email"
              // placeholder="First Name"
              disabled
              value={userData.email ? userData.email : user.email}
            />
          </Form.Group>
          {/* =======radio buttons ========*/}

          <div className="row mt-3">
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
          </div>

          <div className="row">
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
          </div>

          {/* ===== */}
          {userData.phone && storedValue === "true" && (
            <Form.Group className="mt-3" as={Col} md="6">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                required
                type="text"
                disabled
                value={userData.phone}
              />
            </Form.Group>
          )}
        </Row>
        {/* {storedValue === "true" && (
          <Form.Check
            className="mt-2 check"
            type="switch"
            id="custom-switch"
            label="Display Phone number in public profile "
            checked={true}
          />
        )}
        {storedValue === "false" && (
          <Form.Check
            className="mt-2 check"
            type="switch"
            id="custom-switch"
            label="Display Phone number in public profile "
            checked={false}
          />
        )} */}
        <Row className="mb-3">
          {userData.address && (
            <Form.Group as={Col} md="12">
              <Form.Label>Address*</Form.Label>
              <Form.Control
                type="text"
                placeholder="optional"
                disabled
                value={userData.address}
              />
            </Form.Group>
          )}
        </Row>
        <Row className="mb-3">
          {userData.city && (
            <Form.Group as={Col} md="4">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                disabled
                value={userData.city}
              />
            </Form.Group>
          )}

          {userData.state && (
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                disabled
                value={userData.state}
              />
            </Form.Group>
          )}
          <Form.Group as={Col} md="4">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip code"
              disabled
              value={userData.zip}
            />
          </Form.Group>
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

          <div style={{ display: "flex", gap: "5px" }}>
            {jobTitle === "engineer" && (
              <Card
                style={{ width: "35%" }}
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
                  checked={jobTitle === "engineer"}
                />
              </Card>
            )}
            {jobTitle === "contractor" && (
              <Card
                style={{ width: "35%" }}
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
                  checked={jobTitle === "contractor"}
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
            {selectedItems.map((item, index) => {
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
            })}
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
          {selectedServiceItems.map((item, index) => {
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
          })}
        </div>
        {/* budget Price Range  */}
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
                label="Hourly Rate"
                name="billing"
                value="hourlyRate"
                type="radio"
                checked={billing}
                disabled
                // onChange={handleChange}
              />
            </Card>{" "}
          </div>
          <div className="col-sm-6">
            <Box width={300}>
              <Slider
                value={hourly}
                // onChange={handleHourlyRateChange}
                min={0}
                max={300}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="hourly-rate-slider"
                disabled
              />

              {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
            </Box>
            <div>Hourly rate: ${hourly}</div>{" "}
          </div>
        </div>
        {/* =====Licenses & Certificates====  */}
        {peLicense && (
          <div className="row">
            <h1>Licenses & Certificates</h1>
            <h4>{heading4}</h4>
            <h6>{heading1}</h6>
            {peLicense === "yes" && (
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
            {peLicense === "no" && (
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

            {corrosionEngineer === "yes" && (
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
            {corrosionEngineer === "no" && (
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
        {BuilingPermits && (
          <div className="row mt-3">
            <h6>{heading3}</h6>
            {BuilingPermits === "yes" && (
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
                    checked={BuilingPermits}
                  />
                </Card>
              </div>
            )}
            {BuilingPermits === "no" && (
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
                    checked={BuilingPermits}
                  />
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="row mt-4">
        <h6>{heading}</h6>
        <div className="col-lg-2 col-sm-4 ">
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
              value={userData.region}
              disabled
            />
          </Box>
        </div>{" "}
        <div className="col-lg-2 col-sm-4 ">
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
              value={userData.country}
              disabled
            />
          </Box>
        </div>{" "}
        <div className="col-lg-2 col-sm-4">
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
              value={userData.state}
              disabled
            />
          </Box>
        </div>
      </div>
      {/* =============portfolio ================  */}
      <div
        style={{
          margin: "auto",
          // width: "80%",
          // maxWidth: "1270px",
          marginBottom: "5rem",
        }}
        className="mb-3 mt-5 "
      >
        <h3> Project Case Study</h3>
        <span>
          {" "}
          Share images of your previous work helps your potential clients see
          the quality of your work
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
            {[...Array(numImages)].map((_, index) => (
              <div key={index} style={{ margin: "10px" }}>
                <div
                  style={{
                    border: "1px solid blue",
                    width: "80px",
                    height: "80px",
                    position: "relative",
                    borderRadius: "0.5rem",
                  }}
                >
                  {images[index] && (
                    <>
                      <img
                        src={images[index]}
                        // src={URL.createObjectURL(images[index])}
                        alt="uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================buttons========= */}

      <div
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
          onClick={() => setStep(4)}
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
          onClick={() => {
            notify();
            handleSubmit();
            handleApi();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DisplayData;
