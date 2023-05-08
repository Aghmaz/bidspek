import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepConnector from "@mui/material/StepConnector";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Personal from "../pages/Personal";
import Professional from "../pages/Professional";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import styles from "./Multistepform.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { makeStyles } from "@material-ui/core/styles";
import { multiStepContext } from "../StepContext";
import { useContext } from "react";
import DisplayData from "./DisplayData";

const useStyles = makeStyles((theme) => ({}));

const steps = ["Personal ", "Professional", "Services", "Portfolio"];

export default function MultiStepForm({ user, setHeaderText }) {
  // console.log(user, "multistep");
  // usecontext
  const { currentStep, setStep, finalData } = useContext(multiStepContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  function showStep(step) {
    switch (step) {
      case 1:
        return <Personal user={user} />;
      case 2:
        return <Professional />;
      case 3:
        return <Services />;
      case 4:
        return <Portfolio />;
      case 5:
        return (
          <React.Fragment>
            <div style={{ margin: "auto", width: "60%" }}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <DisplayData user={user} />
              </Typography>
            </div>
          </React.Fragment>
        );
    }
  }

  if (currentStep > steps.length) {
    setHeaderText("Review");
  } else {
    setHeaderText("Create a Profile");
  }

  const handleReset = () => {
    setActiveStep(0);
  };
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }} className="mt-5">
      <StyledEngineProvider injectFirst>
        <Stepper
          id="check"
          className={classes.stepper}
          activeStep={currentStep - 1}
          style={{
            width: "50%",
            // textAlign: "center",
            // justifyContent: "center",
            margin: "auto",
          }}
        >
          <Step>
            {" "}
            <StepLabel>
              {" "}
              Personal
              {/* <ChevronRightIcon className={styles.customIcon} />{" "} */}
            </StepLabel>{" "}
          </Step>

          <Step>
            {" "}
            <StepLabel>
              {" "}
              Professional
              {/* <ChevronRightIcon className={styles.customIcon} /> */}
            </StepLabel>{" "}
          </Step>
          <Step>
            {" "}
            <StepLabel>
              {" "}
              Services
              {/* <ChevronRightIcon className={styles.customIcon} /> */}
            </StepLabel>
          </Step>
          <Step>
            {" "}
            <StepLabel> Portfolio </StepLabel>
          </Step>
          <StepConnector className={classes.root} style={{ display: "none" }} />
        </Stepper>
        {showStep(currentStep)}
      </StyledEngineProvider>

      {/* {activeStep === 0 && (
        <Personal
          handleData={handleData}
          user={user}
          // onComplete={handlePersonalComplete}
        />
      )} */}
      {/* {activeStep === 1 && <Professional  />}
      {activeStep === 2 && <Services />}
      {activeStep === 3 && <Portfolio />} */}
      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <div style={{ margin: "auto", width: "60%" }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <DisplayData user={user} />
            </Typography>
            <Box
              style={{ marginBottom: "2rem" }}
              sx={{ display: "flex", flexDirection: "row", pt: 2 }}
            >
              <div className="col-lg-9 col-sm-9" xs={2}>
                <Button
                  style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Review
                </Button>
              </div>
              <div className="col-lg-1 col-sm-1" xs={2}>
                <Button
                  style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
                  // onClick={handleReset}
                  variant="contained"
                  onClick={notify}
                >
                  confirm
                </Button>
                <ToastContainer />
              </div>
            </Box>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              width: "60%",
              margin: "auto",
              marginTop: "-2rem",
            }}
          >
            {activeStep > 0 && (
              <Button
                style={{
                  marginBottom: "1rem",
                  paddingLeft: "4rem",
                  paddingRight: "4rem",
                  borderColor: "rgb(25, 118, 210)",
                  color: "rgb(25, 118, 210)",
                }}
                variant="outlined"
                color="inherit"
                // disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              style={{
                paddingLeft: "4rem",
                paddingRight: "4rem",
                marginBottom: "1rem",
                backgroundColor: "rgb(25, 118, 210)",
              }}
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )} */}
    </Box>
  );
}
