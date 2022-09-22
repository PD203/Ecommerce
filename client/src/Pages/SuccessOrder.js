import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SuccessOrder = () => {
  return (
    <OrderSuccess>
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </OrderSuccess>
  );
};

const OrderSuccess = styled.div`
 margin: auto;
  text-align: center;
  padding: 10vmax;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
  font-size: 7vmax;
  color: rgb(199, 131, 67);
}

p {
  font-size: 2vmax;
}

a {
  background-color: rgb(51, 51, 51);
  color: white;
  border: none;
  padding: 1vmax 3vmax;
  cursor: pointer;
  font: 400 1vmax "Roboto";
  text-decoration: none;
  margin: 2vmax;
}
`

export default SuccessOrder;