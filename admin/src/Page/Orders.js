import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import { DELETE_PRODUCT_RESET } from "../Constants/ProductConstant";
import { clearErrors, deleteOrder, getAllOrders } from "../Actions/OrderAction";
import { CLEAR_ERRORS } from "../Constants/OrderConstant";

function Orders() {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate()

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted]);

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
      flex: 0.4,
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
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <Section>
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </Section>
    </Fragment>
  );
}

const Section = styled.section`
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .productListContainer {
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    border-left: 1px solid rgba(0, 0, 0, 0.158);
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #productListHeading {
    font: 400 2rem "Roboto";
    padding: 0.5vmax;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.637);
    transition: all 0.5s;
    margin: 2rem;
    text-align: center;
  }

  .productListTable div {
    font: 300 1vmax "Roboto";
    color: rgba(0, 0, 0, 0.678);
    border: none !important;

    @media screen and (max-width: 600px) {
      font: 300 4vw "Roboto";
    }
  }

  .productListTable a,
  .productListTable button {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .productListTable a:hover {
    color: rgb(112, 151, 177);
  }

  .productListTable button:hover {
    color: red;
  }

  .MuiDataGrid-columnHeader {
    background-color: rgb(112, 151, 177);
    padding: 1vmax !important;
  }

  .MuiDataGrid-columnHeader div {
    color: rgb(255, 255, 255);
    font: 500 1.1vmax "Roboto" !important;

    @media screen and (max-width: 600px) {
      font: 500 3vmax "Roboto" !important;
    }
  }
`;

export default Orders;
