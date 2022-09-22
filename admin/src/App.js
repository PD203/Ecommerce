import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";
import NewProduct from "./Page/NewProduct";
import Orders from "./Page/Orders";
import ProcesssOrder from "./Page/ProcesssOrder";
import Products from "./Page/Products";
import UpdateProduct from "./Page/UpdateProduct";
import UpdateUser from "./Page/UpdateUser";
import Users from "./Page/Users"

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard/> : <Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin/products" element={isAuthenticated ? <Products/> : <Login/>}/>
      <Route path="/admin/product" element={isAuthenticated ? <NewProduct/> : <Login/>}/>
      <Route path="/admin/product/:id" element={isAuthenticated ? <UpdateProduct/> : <Login/>}/>
      <Route path="/admin/orders" element={isAuthenticated ? <Orders/> : <Login/>}/>
      <Route path="/admin/order/:id" element={isAuthenticated ? <ProcesssOrder/> : <Login/>}/>
      <Route path="/admin/users" element={isAuthenticated ? <Users/> : <Login/>}/>
      <Route path="/admin/user/:id" element={isAuthenticated ? <UpdateUser/> : <Login/>}/>  
      </Routes>
    </Router>
  )
}

export default App;
