import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import SingleProduct from "./Pages/SingleProduct";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Login from "./Pages/User/Login";
import React, { useEffect, useState } from "react";
import store from "./Store";
import { loadUser } from "./Actions/UserAction";
import Account from "./Pages/User/Account";
import { useSelector } from "react-redux";
import ForgotPassword from "./Pages/User/ForgotPassword";
import ResetPassword from "./Pages/User/ResetPassword";
import ConfirmOrder from "./Pages/ConfirmOrder";
import Shipping from "./Pages/Shipping";
import axios from "axios";
import Payment from "./Pages/Payment";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import SuccessOrder from "./Pages/SuccessOrder";
import MyOrders from "./Pages/MyOrders";
import OrderDetails from "./Pages/OrderDetails";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/payment/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/login/shipping"
          element={isAuthenticated ? <Shipping /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route path="/bag" element={<Cart />} />
        <Route path="/orders/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Login />} />
        <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
        <Route path="/success" element={isAuthenticated ? <SuccessOrder /> : <Login />}/>
        <Route path="/orders" element={isAuthenticated ? <MyOrders/> : <Login />}/>
        <Route path="/order/:id" element={isAuthenticated ? <OrderDetails/> : <Login />}/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;
