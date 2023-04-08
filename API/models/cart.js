const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
    {
        UserID: {type: String, required: true},
        Products: {type: Array, required: true},
    }, {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema)