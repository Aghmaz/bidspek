import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import StepConnector from '@mui/material/StepConnector';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Personal from "../pages/Personal"
import Professional from '../pages/Professional';
import Services from '../pages/Services';
import Portfolio from '../pages/Portfolio';
import "./Multistepform.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  // stepper: {
  //   backgroundColor: 'red',
  //   padding: '20px'
  // },
  // step: {
  //   backgroundColor: '#ffffff',
  //   padding: '2px'
  // },
  // 


}));

const steps = ['Personal ', 'Professional', 'Services', 'Portfolio'];



export default function Testing() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  
  const handleData = (data) => {
    console.log(data);}
  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const handleNext = () => {
    let newSkipped = skipped;


    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setActiveStep(0);
  };
  const classes = useStyles();
  return (
    <Box sx={{ width: '100%' }} className="mt-5">

      <StyledEngineProvider injectFirst>
        <Stepper className={classes.stepper} activeStep={activeStep}>
          {/* {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          
          return (
            <Step className={classes.step} key={label} {...stepProps}>
            <StepLabel className={classes.stepLabel} {...labelProps}>{label}</StepLabel>
            </Step>
            );
          })} */}
          <Step> <StepLabel> Personal <ChevronRightIcon /> </StepLabel>  </Step>

          <Step> <StepLabel> Professional<ChevronRightIcon /></StepLabel> </Step>
          <Step> <StepLabel> Services <ChevronRightIcon /></StepLabel></Step>
          <Step> <StepLabel> Portfolio </StepLabel>

          </Step>
          <StepConnector className={classes.root} style={{ display: "none" }} />
        </Stepper>
      </StyledEngineProvider>

      {activeStep === 0 && (
        <Personal
        handleData={handleData}
        />
      )}
      {activeStep === 1 && (
        <Professional
         
        />
      )}
      {activeStep === 2 && (
        <Services
          
        />
      )}
      {activeStep === 3 && (
        <Portfolio
         
        />
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br />
          {/* {activeStep === 0 ? <Personal /> : <Professional /> && activeStep === 1 ? <Professional /> : <Personal /> && activeStep === 2 ? <Services /> : <Portfolio />} */}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step    {activeStep + 1}</Typography> */}
          {/* <Personal/> */}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />



            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}