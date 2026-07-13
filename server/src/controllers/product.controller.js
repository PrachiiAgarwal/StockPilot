const Product = require("../models/Product");
const StockMovement = require("../models/stockMovement");

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

    const existingProduct = await Product.findOne({
     sku,
     createdBy: req.user.id,
   });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "Product with this SKU already exists",
      });
    }

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

    await StockMovement.create({
      product: product._id,
      productName: product.productName,
      type: "CREATE",
      quantity: quantity,
      previousQuantity: 0,
      newQuantity: quantity,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Products
// ==========================

const getAllProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      createdBy: req.user.id,
    })
      .populate(
        "createdBy",
        "fullName email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Get Product By ID
// ==========================

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).populate(
      "createdBy",
      "fullName email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Product
// ==========================

const updateProduct = async (req, res) => {
  try {
    const oldProduct = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!oldProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    await StockMovement.create({
      product: product._id,
      productName: product.productName,
      type: "UPDATE",
      quantity:
        product.quantity -
        oldProduct.quantity,
      previousQuantity:
        oldProduct.quantity,
      newQuantity:
        product.quantity,
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Product
// ==========================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await StockMovement.create({
      product: product._id,
      productName: product.productName,
      type: "DELETE",
      quantity: product.quantity,
      previousQuantity:
        product.quantity,
      newQuantity: 0,
      createdBy: req.user.id,
    });

    await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
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
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};