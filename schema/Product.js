const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    desc: {
      type: String,
      require: true,
      min: 10,
      max: 100,
    },
    image: [
      {
        url: {
          type: String,
        },
      },
    ],
    contactNumber: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    variety: {
      colour: {
        type: String,
      },
      size: {
        type: Number,
      },
      gender: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    comment: {
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    rating: {
      stars: {
        type: Number,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
