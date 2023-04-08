const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const OrderRoute = require("./routes/order");
const CartRoute = require("./routes/cart");
const cookieParser = require("cookie-parser");
const app = express();



// env congig
dotenv.config();






// mongodb connection
mongoose
  .connect(process.env.mongourl)
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log(err);
  });

//Middleware

// Ath0 middleware enforce on all endpoints

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", OrderRoute);
app.use("/api/cart", CartRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("app started");
});
