import React, { Fragment } from "react";
import styled from "styled-components";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Container>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color:
                    activeStep >= index ? "rgb(199, 131, 67)" : "rgba(0, 0, 0, 0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  margin: 5vh;
`;

export default CheckoutSteps;
