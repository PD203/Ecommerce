import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";

function ConfirmOrder() {
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  console.log(user);
  console.log(cartItems);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal < 1000 ? 0 : 50;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <ConfirmOrderPage>
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Order Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{item.price} ={" "}
                      <b>Rs.{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs.{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs.{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs.{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs.{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </ConfirmOrderPage>
    </Fragment>
  );
}

const ConfirmOrderPage = styled.div`
  height: 100vh;
  background-color: white;
  display: grid;
  grid-template-columns: 6fr 3fr;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
       grid-template-columns: 1fr;
    height: unset;
    width: 100vw;
  }

  @media screen and (max-width: 600px) {
       grid-template-columns: 1fr;
    height: unset;
  }

.confirmshippingArea {
  padding: 5vmax;
  padding-bottom: 0%;

}

.confirmshippingArea > p {
  font-size: 1.8vmax ;
  
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 30px;
  }
}

.confirmshippingAreaBox,
.confirmCartItemsContainer {
  margin: 2vmax;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
   margin: 1vmax;
  }
}

.confirmshippingAreaBox > div {
  display: flex;
  margin: 1vmax 0;
}

.confirmshippingAreaBox > div > p {
  font-size: 1vmax ;
  color: black;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 23px;
  }
}
.confirmshippingAreaBox > div > span {
  margin: 0 1vmax;
  font-size:  1vmax ;
  color: #575757;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 23px;
  }
}

.confirmCartItems > p {
  font-size:  1.8vmax ;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 30px;
  }
}

.confirmCartItems {
  padding: 5vmax;
  padding-top: 2vmax;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
   padding: 4vmax;
  }
}

.confirmCartItemsContainer {
  max-height: 20vmax;
  overflow-y: auto;

}

.confirmCartItemsContainer > div {
  display: flex;
  font-size:  1vmax ;
  align-items: center;
  justify-content: space-between;
  margin: 2vmax 0;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
   margin: 1vmax 0;
  }
}

.confirmCartItemsContainer > div > img {
  width: 120px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
   width: 100px;
  }
  
}

.confirmCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 22px;
    width: 50%;
  }
}

.confirmCartItemsContainer > div > span {
  font-size:1vmax ;
  color: #5e5e5e;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 22px;
  }
}

.orderSummary {
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 30px;
  height: auto;
  margin: 30px;


}

.orderSummary > p {
  text-align: center;
  font-size:  1.8vmax;
  border-bottom: 1px solid rgba(0, 0, 0, 0.267);
  padding: 1vmax;
  width: 100%;
  margin: auto;
  box-sizing: border-box;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 30px;
  }
}

.orderSummary > div > div {
  display: flex;
  font-size: 1vmax ;
  justify-content: space-between;
  margin: 2vmax 0;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
}
.orderSummary > div > div > span {
  color: rgba(0, 0, 0, 0.692);
}

.orderSummaryTotal {
  display: flex;
  font-size: 1vmax ;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.363);
  padding: 2vmax 0;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
}

.orderSummary > button {
  background-color: rgb(199, 131, 67);
  color: white;
  width: 100%;
  padding: 1vmax;
  border: none;
  margin: auto;
  cursor: pointer;
  transition: 0.5s;
  font-size: 1vmax ;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
}

.orderSummary > button:hover {
  background-color: rgb(148, 93, 42);
}

@media screen and (max-width: 600px) {

  .confirmOrderPage > div:last-child {
    border-left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.247);
  }

  .confirmshippingArea > p {
    font-size: 6vw ;
  }

  .confirmshippingAreaBox > div {
    display: flex;
    margin: 6vw 0;
  }

  .confirmshippingAreaBox > div > p {
    font-size: 4vw ;
  }
  .confirmshippingAreaBox > div > span {
    font-size: 4vw ;
  }

  .confirmCartItems > p {
    font-size: 6vw ;
  }

  .confirmCartItemsContainer {
    max-height: 50vw;
  }

  .confirmCartItemsContainer > div {
    font-size: 4vw ;
    margin: 4vw 0;
  }

  .confirmCartItemsContainer > div > img {
    width: 10vw;
  }

  .confirmCartItemsContainer > div > a {
    margin: 0;
    width: 30%;
  }

  .confirmCartItemsContainer > div > span {
    font-size: 4vw ;
  }

  .orderSummary {
    padding: 12vw;
  }

  .orderSummary > p {
    font-size: 6vw ;
    padding: 4vw;
  }

  .orderSummary > div > div {
    font-size:  4vw ;
  }

  .orderSummaryTotal {
    font-size:  4vw ;
    padding: 5vw 0;
  }

  .orderSummary > button {
    padding: 4vw;
    margin: 4vw auto;
    font-size: 4vw ;
  }
}
`;

export default ConfirmOrder;
