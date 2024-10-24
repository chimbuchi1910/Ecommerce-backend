const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    cartItems: [
      {
        productCart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cart",
        },
      },
    ],
    totalAmount: {
      type: String,
    },
    delivery: {
      address: {
        type: String,
      },
    },
    payment: {
      currency: {
        type: String,
      },
      paymentStatus: {
        type: String,
        default: "Not Paid",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
