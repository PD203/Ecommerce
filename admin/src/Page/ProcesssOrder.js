import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import styled from "styled-components";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../Actions/OrderAction";
import Sidebar from "../Components/Sidebar";
import { UPDATE_ORDER_RESET } from "../Constants/OrderConstant";

function ProcesssOrder() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <Section>
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            "loading"
          ) : (
            <ConfirmOrderPage
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
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

                  <Typography>Payment</Typography>
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

                  <Typography>Order Status</Typography>
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
                <div className="confirmCartItems">
                  <Typography>Ordered Items:</Typography>
                  <div className="confirmCartItemsContainer">
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
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </ConfirmOrderPage>
          )}
        </div>
      </Section>
    </Fragment>
  );
}

const Section = styled.div`
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmOrderPage = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  background-color: rgb(255, 255, 255);
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

    p {
      font: 400 1.8vmax "Roboto";

      @media screen and (min-width: 768px) and (max-width: 1024px) {
        font: 400 6vw "Roboto";
      }

      @media screen  and (max-width: 600px) {
        font-size: 6vw ;
      }
    }
  }

  .orderDetailsContainerBox {
    margin: 1.5vmax;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      margin: 1vmax;
    }

    div {
      display: flex;
      margin: 1vmax 0;

      p {
        font: 400 1vmax "Roboto";
        color: black;
        @media screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 23px;
        }

        @media screen  and (max-width: 600px) {
        font-size: 4vw ;
      }
      }

      span {
        margin: 0 1vmax;
        font: 400 1vmax "Roboto";
        color: #575757;

        @media screen and (min-width: 768px) and (max-width: 1024px) {
          font: 100 4vw "Roboto";
        }

        @media screen and (max-width: 600px){
            font: 100 4vw "Roboto";
        }
      }
    }
  }

  .confirmCartItems {
    padding: 5vmax;
    padding-top: 2vmax;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      padding: 4vmax;
    }
    p {
        font: 400 1.8vmax "Roboto";

      @media screen and (min-width: 768px) and (max-width: 1024px) {
        font: 400 6vw "Roboto";
      }

      @media screen and (max-width: 600px){
            font: 100 4vw "Roboto";
        }
    }
  }

  .confirmCartItemsContainer {
    max-height: 20vmax;
    overflow-y: auto;

    div {
      display: flex;
      font-size: 1vmax;
      align-items: center;
      justify-content: space-between;
      margin: 1vmax 0;

      @media screen and (min-width: 768px) and (max-width: 1024px) {
        margin: 1vmax 0;
      }

      img {
        width: 120px;

        @media screen and (min-width: 768px) and (max-width: 1024px) {
          width: 100px;
        }
      }

      > a {
        color: #575757;
        margin: 0 2vmax;
        width: 60%;
        text-decoration: none;

        @media screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 22px;
          width: 50%;
        }

        @media screen and (max-width: 600px){
            font: 100 4vw "Roboto";
        }
      }

      span {
        font-size: 1vmax;
        color: #5e5e5e;

        @media screen and (min-width: 768px) and (max-width: 1024px) {
          font: 400 6vw "Roboto";
        }

        @media screen and (max-width: 600px){
            font: 100 4vw "Roboto";
        }
      }
    }
  }

  .updateOrderForm {
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 30px;
    height: auto;
    margin: 30px;
  }

  .updateOrderForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .updateOrderForm > div > select {
    padding: 1vmax 4vmax;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
  }

  .updateOrderForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  #createProductBtn {
    background-color: rgb(112, 151, 177);
    color: white;
    width: 100%;
    padding: 0.5vmax;
    border: none;
    margin: auto;
    cursor: pointer;
    transition: 0.5s;
    font: 300 1.7vmax;
  }

  @media screen and (max-width: 600px) {
    .updateOrderForm {
      padding: 5vmax;
    }

    .updateOrderForm > div > select {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax cursive;
    }

    .updateOrderForm > div > svg {
      font-size: 2.8vmax;
    }

    #createProductBtn {
      padding: 1vmax;
    }
  }
`;

export default ProcesssOrder;
