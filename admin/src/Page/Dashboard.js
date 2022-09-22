import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import { getAdminProduct } from "../Actions/ProductAction";
import { Doughnut, Line } from "react-chartjs-2";
import PeopleIcon from "@material-ui/icons/People"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../Actions/OrderAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

 

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders())
  }, [dispatch]);

  products &&
  products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["rgb(73, 93, 107)", "rgb(112, 151, 177)"],
        hoverBackgroundColor: ["rgb(160, 167, 172)", "rgb(160, 167, 172)"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Section>
      <Sidebar />
      <DashboardContainer>
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <h6>Product</h6>
              <p>{products && products.length}</p>
              
              <TakeoutDiningRoundedIcon/>
              
            </Link>
            <Link to="/admin/orders">
              <h6>Orders</h6>
              <p>{orders && orders.length}</p>
              
              <ShoppingCartIcon/>
              
            </Link>
            <Link to="/admin/users">
              <h6>Users</h6>
              <p>{users && users.length}</p>
             
              <PeopleIcon/>
              
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </DashboardContainer>
    </Section>
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
`;

const DashboardContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  background-color: rgb(255, 255, 255);
  padding: 3rem 0;

  @media screen and (max-width: 600px) {
    border-left: none;
  }

  h1 {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Roboto";
    text-align: center;
    width: 50%;
    padding: 1.5rem;
    margin: auto;
  }

  .dashboardSummary {
    margin: 0.3rem 0;
  }

  .dashboardSummary > div {
    display: flex;
    background-color: white;
    justify-content: center;

    h6{
    font: 300 1.3rem "Roboto";
    color: rgb(112, 112, 112);
    padding-bottom: 2vh;
    }

    

    svg{
     position: absolute;
     padding-left: 250px;
     color: rgb(112, 151, 177);
     
    }
    
  }
  .dashboardSummary > div > p {
    background-color: rgb(112, 151, 177);
    color: white;
    font: 300 1.3rem "Roboto";
    text-align: center;
    padding: 1rem;
    width: 100%;
    margin: 0 2rem;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    @media screen and (max-width: 600px) {
      margin: 0;
    }
  }
  .dashboardSummaryBox2 > a {
    color: rgb(0, 0, 0);
    font: 300 2rem "Roboto";
    text-align: center;
    color: rgb(112, 112, 112);
    text-decoration: none;
    padding: 1.5rem;
    width: 20vmax;
    height: 5vmax;
    margin: 2rem;
    display: flex;
    border-radius: 5px;
    /* justify-content: center; */
   align-items: flex-start;
    flex-direction: column;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    @media screen and (max-width: 600px) {
      padding: 0.5rem;
      margin: 1rem;
      font: 300 0.9rem "Roboto";
    }
  }

  .lineChart {
    width: 70%;
    margin: auto;
  }

  .doughnutChart {
    width: 30vmax;
    margin: auto;
    padding: 5vh;
  }
`;

export default Dashboard;
