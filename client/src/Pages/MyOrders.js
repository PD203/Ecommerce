import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../Actions/OrderActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

function MyOrders() {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loading/>
      ) : (
        <MyOrderContainer>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">Your Orders</Typography>
        </MyOrderContainer>
      )}
      <Footer />
    </Fragment>
  );
}

const MyOrderContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  padding: 0 7vmax;
  box-sizing: border-box;

  margin: 5vh 0;
  left: 0;
  height: 80vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
   padding: 0;
  }

  @media screen and (max-width: 600px) {
    padding: 0;
  }

  #myOrdersHeading {
    text-align: center;
    padding: 0.5vmax;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    transition: all 0.5s;
    background-color: rgb(44, 44, 44);
  }

  .myOrdersTable {
    background-color: white;
    
  }

  .myOrdersTable div {
    border: none;
  }

  .myOrdersTable a {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .myOrdersTable a:hover {
    color: tomato;
  }

  .MuiDataGrid-columnHeader {
    background-color: rgb(199, 131, 67);
    padding: 1vmax !important;
  }

  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    /* font: 500 1.1vmax "Roboto" !important; */
  }

  .MuiDataGrid-iconSeparator {
    display: none !important;
  }


`;

export default MyOrders;
