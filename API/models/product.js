
const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
        Title: {type: String, required: true},
        Description: {type: String, required: true},
        Image: {type: String, required: true},
        Price: {type: Number, required: true},
        Stock :{type: Number},
    }, {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema)