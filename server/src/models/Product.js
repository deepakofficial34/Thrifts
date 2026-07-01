const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,   
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "clothes",
        "electronics",
        "furniture",
        "books",
        "sports",
        "others",
      ],
      required: true,
    },

    condition: {
      type: String,
      enum: [
        "new",
        "like-new",
        "good",
        "fair",
      ],
      default: "good",
    },
    brand: {
  type: String,
},

location: {
  type: String,
},

originalPrice: {
  type: Number,
},

productAge: {
  type: String,
},

status: {
  type: String,
  enum: ["available", "sold"],
  default: "available",
},

    seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);