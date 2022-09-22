import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../Actions/OrderActions";
import { useAlert } from "react-alert";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";


function OrderDetails() {

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>

<Navbar/>
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        
        <Fragment>
          <OrderDetailsPage>
            <div className="orderDetailsContainer">
              <h3 component="h1">
                Order #{order && order._id}
              </h3>
              <h3>Shipping Info</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h3>Payment</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h3>Order Status</h3>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h3>Order Items:</h3>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </OrderDetailsPage>
        </Fragment>
      )}
    </Fragment>
    </>
  )
}

const OrderDetailsPage = styled.div`
background-color: white;

.orderDetailsContainer > h3 {
  /* font: 300 3vmax "Roboto"; */
  margin: 4vmax 0;
  color: rgb(199, 131, 67);
}

.orderDetailsContainer {
  padding: 0 5vmax;
  padding-bottom: 0%;
}



.orderDetailsContainerBox > div {
  display: flex;
  margin: 1vmax 0;
}

.orderDetailsContainerBox > div > p {
  color: black;
}
.orderDetailsContainerBox > div > span {
  margin: 0 1vmax;
  color: #575757;
}



.orderDetailsCartItems {
  padding: 2vmax 5vmax;
  border-top: 1px solid rgba(0, 0, 0, 0.164);
}

.orderDetailsCartItemsContainer > div {
  display: flex;
  align-items: center;
  margin: 2vmax 0;
}

.orderDetailsCartItemsContainer > div > img {
  width: 8vmax;
}

.orderDetailsCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}

.orderDetailsCartItemsContainer > div > span {
  color: #5e5e5e;
}

@media screen and (max-width: 600px) {
  .orderDetailsContainer > p {
  }

  .orderDetailsContainerBox > div {
    margin: 6vw 0;
  }

 

  .orderDetailsCartItemsContainer > div {
    margin: 4vw 0;
  }

  .orderDetailsCartItemsContainer > div > img {
    width: 10vw;
  }

  .orderDetailsCartItemsContainer > div > a {
    margin: 2vw;
    width: 30%;
  }


}
`

export default OrderDetails