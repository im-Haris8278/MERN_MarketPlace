const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// Config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Import Routes

const product = require("./routes/productRoute");

const user = require("./routes/userRoute");

const order = require("./routes/orderRoute");

const shop = require("./routes/shopRoute");

const payment = require("./routes/paymentRoute");

// Uses

app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

app.use("/api/v1", shop);

app.use("/api/v1", payment);

// Middleware For Errors

app.use(errorMiddleware);

module.exports = app;
