const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        UserId: {type: String, required: true},
        Products: [
            {
                Title :{
                    type: String,
                },
                id :{
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                Image: {
                    type: String,
                }
            }
        ],
        Price: {type: String},
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        Email: {type: String, required: true},
        Phone: {type: String, required: true},
        Adress: {type: String},
        
        Status : {type: String, default: "pending"},
    }, {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)