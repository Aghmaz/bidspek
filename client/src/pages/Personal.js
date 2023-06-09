import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { multiStepContext } from "../StepContext";
import ImageUploader from "./ImageUploader";
import "./personal.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/base/TextareaAutosize";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckSquareO } from '@fortawesome/free-solid-svg-icons';
localStorage.setItem("switchValue", JSON.stringify(true));
const Personal = ({ user }) => {
  console.log(user, "personal");

  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("occupation") || ""
  );
  const navigate = useNavigate();
  // new code for Occuptation
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setIsInputValid(true);
    localStorage.setItem("occupation", value);
    setInputValue("");
    // setIsInputField(true);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setInputValue(false);
    } else {
      setInputValue(value);
    }
    localStorage.setItem("company_name", value);
  };
  useEffect(() => {
    const storedCompanyValue = localStorage.getItem("company_name");
    if (storedCompanyValue) {
      setInputValue(storedCompanyValue);
    }
  }, []);

  // use effect for Occuptation
  useEffect(() => {
    // setIsInputField(true);

    const handleBeforeUnload = () => {
      localStorage.setItem("selectedValue", selectedValue);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedValue]);

  // phone number selection
  const [switchValue, setSwitchValue] = useState(
    JSON.parse(localStorage.getItem("switchValue") || false)
  );

  useEffect(() => {
    const storedValue = localStorage.getItem("switchValue");
    if (storedValue !== null) {
      setSwitchValue(JSON.parse(storedValue));
    }
  }, []);

  const handleSwitchToggle = () => {
    const newValue = !switchValue;
    setSwitchValue(newValue);

    localStorage.setItem("switchValue", JSON.stringify(newValue));
  };

  const { setStep, userData, setUserData } = useContext(multiStepContext);

  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  // Validation checks on each input

  const validateField = (user) => {
    // setIsInputValid(validateField(fieldName));

    const value = userData[user];

    if (!value) {
      // If the value is empty, the field is invalid
      return false;
    }
    if (user === "firstname") {
      const namePattern = /^[\p{L}\p{M}'\-\s]{5,12}$/u;
      return namePattern.test(value);
    }
    if (user === "lastname") {
      const pattern = /^[\p{L}\p{M}'\-\s]{5,12}$/u;

      return pattern.test(value);
    }
    if (user === "email") {
      // Check if the value is a valid email address
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value);
    }
    if (user === "phone") {
      const pattern = /^(?:\+)?(?:[0-9]){7,15}$/;
      return pattern.test(value);
    }
    if (user === "address") {
      // Check if the value is a valid address
      const pattern = /^[a-zA-Z0-9\s,'-]*$/;
      return pattern.test(value);
    }
    if (user === "city" || user === "state") {
      // Check if the value contains only letters and spaces
      const pattern = /^[a-zA-Z\s]*$/;
      return pattern.test(value);
    }
    if (user === "zip") {
      // Check if the value is a valid zip code
      const pattern = /^\d{5}(?:[-\s]\d{4})?$/;
      return pattern.test(value);
    }
    if (user === "textarea") {
      // Check if the value is a valid zip code
      const pattern = /^(?!.*\d{5}(?:[-\s]\d{4})?$).{1,500}$/;

      return pattern.test(value);
    }
  };

  // const [isInputField, setIsInputField] = useState(false);

  const [isInputField, setIsInputField] = useState(
    localStorage.getItem("isInputField") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isInputField", isInputField);
  }, [isInputField]);

  const handleSend = () => {
    // if (isInputField) {
    //   mandatory();
    // }
    if (
      isInputField &&
      validateField("zip", "email", "lastname", "firstname", "textarea")
    ) {
      setStep(2);
    } else {
      // check all input fields for validation
      const isFirstNameValid = validateField("firstname");
      const isLastNameValid = validateField("lastname");
      const isEmailValid = validateField("email");
      const isPhoneValid = validateField("phone");
      const isStateValid = validateField("state");
      const isZipValid = validateField("zip");
      const isTextAreaValid = validateField("textarea");

      // show toast message if any of the input fields are invalid

      // if (!isFirstNameValid) {
      //   firstName();
      // }
      // if (!isLastNameValid) {
      //   lastName();
      // }
      if (!isTextAreaValid) {
        textAreas();
      }
      if (!isPhoneValid) {
        phone();
      }

      if (!isZipValid) {
        zip();
      }
    }
  };

  // toaster messages
  // const firstName = () =>
  //   toast("First Name length should be more than 5 characters.", {
  //     type: "error",
  //   });
  // const lastName = () =>
  //   toast("Last Name length should be more than 5 characters", {
  //     type: "error",
  //   });
  const textAreas = () =>
    toast("Please Fill text area & maxlength is 500 character.", {
      type: "error",
    });
  const phone = () =>
    toast("Only Numbers are acceptable ,length more than 6", { type: "error" });
  const mandatory = () =>
    toast("All Mandatory fields must fill", { type: "error" });
  const zip = () => toast(" Please provide a valid zip.", { type: "error" });
  const occupation = () =>
    toast("Please Choose company or person", { type: "error" });

  return (
    <div style={{ margin: "auto", width: "60%" }} className="mb-3 mt-5 ">
      <h5> My Profile</h5>
      <p className="mt-3" style={{ fontSize: "11px" }}>
        {" "}
        Start by filling your personal information
      </p>
      <h5 className="mt-4">Profile Photo</h5>
      <div className="rounded">
        <ImageUploader user={user} />
        <p className="mt-3" style={{ fontSize: "11px" }}>
          Add your profile photo.The recommended size is 300 x 300px.
        </p>
      </div>
      <div>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                required={!user || user.provider !== "google.com"}
                type="text"
                placeholder="First Name"
                defaultValue={
                  user && user.given_name
                    ? user.given_name
                    : user && user.firstName
                    ? user.firstName.localized["en_US"]
                    : user && user.FirstName
                    ? user.FirstName
                    : userData["firstname"]
                }
                value={
                  user && user.given_name
                    ? userData[user.given_name]
                    : user && user.firstName
                    ? userData[user.firstName.localized["en_US"]]
                    : user && user.FirstName
                    ? userData[user.FirstName]
                    : userData["firstname"]
                }
                onChange={(e) => {
                  if (user && user.given_name) {
                    setUserData({
                      ...userData,
                      [user.given_name]: e.target.value,
                    });
                  } else if (user && user.firstName) {
                    setUserData({
                      ...userData,
                      [user.firstName.localized["en_US"]]: e.target.value,
                    });
                  } else if (user && user.FirstName) {
                    setUserData({
                      ...userData,
                      [user.FirstName]: e.target.value,
                    });
                  } else {
                    setUserData({
                      ...userData,
                      firstname: e.target.value,
                    });
                  }
                }}
                isValid={validateField("firstname")}
                // isInvalid={!validateField("firstname")}
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                defaultValue={
                  user && user.family_name
                    ? user.family_name
                    : user && user.lastName
                    ? user.lastName.localized["en_US"]
                    : user && user.LastName
                    ? user.LastName
                    : user.lastName
                }
                value={
                  user && user.family_name
                    ? userData[user.family_name]
                    : user && user.lastName
                    ? userData[user.lastName.localized["en_US"]]
                    : user && user.LastName
                    ? userData[user.LastName]
                    : userData["lastname"]
                }
                onChange={(e) => {
                  if (user && user.family_name) {
                    setUserData({
                      ...userData,
                      [user.family_name]: e.target.value,
                    });
                  } else if (user && user.lastName) {
                    setUserData({
                      ...userData,
                      [user.lastName.localized["en_US"]]: e.target.value,
                    });
                  } else if (user && user.LastName) {
                    setUserData({
                      ...userData,
                      [user.LastName]: e.target.value,
                    });
                  } else {
                    setUserData({
                      ...userData,
                      lastname: e.target.value,
                    });
                  }
                }}
                isValid={validateField("lastname")}
                // isInvalid={!validateField("lastname")}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                required
                type="email"
                defaultValue={
                  user && user.email
                    ? user.email
                    : user && user.Email
                    ? user.Email
                    : userData["email"]
                }
                value={
                  user && user.email
                    ? userData[user.email]
                    : user && user.Email
                    ? userData[user.Email]
                    : userData["email"]
                }
                onChange={(e) => {
                  if (user && user.email) {
                    setUserData({
                      ...userData,
                      [user.email]: e.target.value,
                    });
                  } else if (user && user.Email) {
                    setUserData({
                      ...userData,
                      [user.Email]: e.target.value,
                    });
                  } else {
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    });
                  }
                }}
                isValid={validateField("email")}
                // isInvalid={!validateField("email")}
              />

              <Form.Check
                inline
                label="company"
                value="company"
                type="radio"
                checked={selectedValue === "company"}
                onChange={handleChange}
              />
              <Form.Check
                className=" mt-2"
                inline
                label="personal"
                value="personal"
                type="radio"
                checked={selectedValue === "personal"}
                onChange={handleChange}
              />

              {selectedValue === "company" && (
                <div className="mt-2">
                  <Form.Group as={Col} md="6" style={{ width: "100%" }}>
                    <Form.Control
                      required
                      type="text"
                      placeholder="company name"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </Form.Group>{" "}
                </div>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                // optional
                required
                type="text"
                // placeholder="Optional"
                value={userData["phone"]}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                isValid={validateField("phone")}
                // isInvalid={!validateField("phone")}
              />
              {/* <Form.Control.Feedback type="valid">
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Only Numbers are acceptable ,length more than 6
              </Form.Control.Feedback> */}
              <Form.Check
                className="mt-2 check"
                type="switch"
                id="custom-switch"
                label="Display phone number in public profile "
                checked={switchValue}
                onChange={handleSwitchToggle}
              />
            </Form.Group>
          </Row>

          <div className="row mb-4">
            <div className="col">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                label="Linkedin"
                className="form-control"
                placeholder="Please Enter Your LinkedIn URL"
                value={userData["textarea"]}
                onChange={(e) => {
                  setUserData({ ...userData, textarea: e.target.value });
                }}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="optional"
                optional
                // onChange={handleChange}
                value={userData["address"]}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                // isValid={validateField('address')}
                // isInvalid={!validateField('address')}
              />
            </Form.Group>
          </Row>
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
                // isValid={validateField('city')}
                // isInvalid={!validateField('city')}
              />
              {/* <Form.Control.Feedback type="valid">
                Looks good.!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              {/* <Form.Label>State</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="State"
                // required
                optional
                // onChange={handleChange}
                value={userData["state"]}
                onChange={(e) =>
                  setUserData({ ...userData, state: e.target.value })
                }
                // isValid={validateField('state')}
                // isInvalid={!validateField('state')}
              />
              {/* <Form.Control.Feedback type="valid">
                looks good.!.
              </Form.Control.Feedback>{" "}
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} md="4">
              {/* <Form.Label>Zip</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Zip code*"
                required
                // onChange={handleChange}
                value={userData["zip"]}
                onChange={(e) => {
                  setUserData({ ...userData, zip: e.target.value });
                  setIsInputField(true);
                }}
                isValid={validateField("zip")}
                // isInvalid={!validateField("zip")}
              />
              {/* <Form.Control.Feedback type="valid">
                Looks good.!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback> */}
            </Form.Group>
          </Row>

          <Button
            style={{
              float: "right",
              paddingLeft: "4rem",
              paddingRight: "4rem",
              marginBottom: "1rem",
              backgroundColor: "rgb(25, 118, 210)",
              color: "white",
            }}
            className=" mb-3"
            type="submit"
            onClick={() => {
              handleSend();
              // handleSubmit();
              // handleApi();
            }}
          >
            Next
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
};

export default Personal;
