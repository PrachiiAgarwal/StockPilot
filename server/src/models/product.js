const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    supplier: {
      type: String,
      required: true,
    },

    warehouse: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    reorderLevel: {
      type: Number,
      default: 10,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Each user can have the same SKU,
// but a single user cannot create
// duplicate SKUs.
productSchema.index(
  {
    createdBy: 1,
    sku: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);