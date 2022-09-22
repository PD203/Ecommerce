const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./Routes/ProductRoute");
const user = require("./Routes/UserRoute");
const order = require("./Routes/OrderRoute");
const payment = require("./Routes/PaymentRoute");

app.use("/api/products", product);
app.use("/api/auth", user);
app.use("/api/order", order);
app.use("/api/payment", payment);

// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;
