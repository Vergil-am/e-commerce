const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    UserId: { type: String, required: true },
    Products: [
      {
        Title: {
          type: String,
        },
        id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        Image: {
          type: String,
        },
      },
    ],
    Price: { type: String },
    PaymetId: { type: String },

    Status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
