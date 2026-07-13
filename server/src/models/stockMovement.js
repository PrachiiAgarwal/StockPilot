const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "CREATE",
        "IN",
        "OUT",
        "UPDATE",
        "DELETE",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    previousQuantity: {
      type: Number,
      default: 0,
    },

    newQuantity: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "StockMovement",
  stockMovementSchema
);