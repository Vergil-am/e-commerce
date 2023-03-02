
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/users");
const AuthRoute = require("./routes/authentication");
const PropertyRoute = require("./routes/product");
const OrderRoute = require("./routes/order");
const StripeRoute = require("./routes/stripe");
const CartRoute = require("./routes/cart");
const cookieParser = require("cookie-parser");


const app = express();
// env congig
dotenv.config();

// mongodb connection
mongoose.connect(process.env.mongourl)
.then(() => console.log("connected to database")).catch((err) => {
    console.log(err);
});







//Middleware

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/product", PropertyRoute);
app.use("/api/order", OrderRoute);
app.use("/api/payment", StripeRoute);
app.use("/api/cart", CartRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('app started');

})