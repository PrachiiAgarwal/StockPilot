const Product = require("../models/Product");

// ==========================
// Create Product
// ==========================
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      barcode,
      category,
      supplier,
      warehouse,
      quantity,
      unitPrice,
      reorderLevel,
      expiryDate,
      status,
    } = req.body;

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }

    // Create Product
    const product = await Product.create({
      productName,
      sku,
      barcode,
      category,
      supplier,
      warehouse,
      quantity,
      unitPrice,
      reorderLevel,
      expiryDate,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
};