import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {createOrder, clearErrors} from "../Actions/OrderActions"


import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import key from "../Components/Images/key.png";
import CreditCard from "../Components/Images/credit-card.png";
import calendar from "../Components/Images/calendar.png";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
      <PaymentContainer>
        <PaymentForm onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <img src={CreditCard} alt="" />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <img src={calendar} alt="" />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <img src={key} alt="" />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </PaymentForm>
      </PaymentContainer>
    </Fragment>
  );
}

const PaymentContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: rgb(255, 255, 255);
  height: 65vh;
  margin: 2vmax;

`;
const PaymentForm = styled.form`
  width: 22%;
  height: 100%;

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (min-width: 700px) and (max-width: 1024px) {
    width: 60%;
  }

  p {
    font: 400 2vmax "Roboto";
    color: rgba(0, 0, 0, 0.753);
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
    padding: 1vmax 0;
    text-align: center;
    width: 50%;
    margin: auto;
  }


  .paymentInput {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    outline: none;
    margin: 2vmax 0;

    @media screen and (max-width: 600px) {
        padding: 4vw 10vw;
  }

  @media screen and (min-width: 700px) and (max-width: 1024px) {
    padding: 3vw 10vw;
  }
  }

  img {
    position: absolute;
    transform: translateX(1vmax);
    padding-top: 10px;

    @media screen and (min-width: 700px) and (max-width: 1024px) {
    padding-top: 20px;
  }
  }

  .paymentFormBtn {
    border: none;
    background-color: rgb(199, 131, 67);
    color: white;
    font: 300 0.9vmax "Roboto";
    width: 100%;
    padding: 0.8vmax;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;

    
    @media screen and (max-width: 600px) {
        font: 300 4vw "Roboto";
    padding: 4vw;
  }

  @media screen and (min-width: 700px) and (max-width: 1024px) {
    font: 300 3vw "Roboto";
    padding: 2vw;
  }
  }

  .paymentFormBtn:hover {
    background-color: rgb(148, 93, 42);
  }
`;

export default Payment;
