const Product = require("../models/product");

const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const activeProducts = products.filter(
      (product) => product.status === "Active"
    ).length;

    const inactiveProducts = products.filter(
      (product) => product.status === "Inactive"
    ).length;

    const inventoryValue = products.reduce(
      (total, product) =>
        total + product.quantity * product.unitPrice,
      0
    );

    const lowStockProducts = products.filter(
      (product) =>
        product.quantity <= product.reorderLevel
    ).length;

    const today = new Date();

    const thirtyDaysLater = new Date();

    thirtyDaysLater.setDate(today.getDate() + 30);

    const expiringSoonProducts = products.filter(
      (product) => {
        if (!product.expiryDate) return false;

        const expiry = new Date(product.expiryDate);

        return (
          expiry >= today &&
          expiry <= thirtyDaysLater
        );
      }
    );

    const expiringSoon =
      expiringSoonProducts.length;

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Products by Category
    // ===========================

    const categoryMap = {};

    products.forEach((product) => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          name: product.category,
          products: 0,
          inventoryValue: 0,
        };
      }

      categoryMap[product.category].products += 1;

      categoryMap[product.category].inventoryValue +=
        product.quantity * product.unitPrice;
    });

    const categoryStats = Object.values(
      categoryMap
    );

    // ===========================
    // Status Chart
    // ===========================

    const statusStats = [
      {
        name: "Active",
        value: activeProducts,
      },
      {
        name: "Inactive",
        value: inactiveProducts,
      },
    ];

    res.status(200).json({
      success: true,

      totalProducts,
      activeProducts,
      inactiveProducts,

      inventoryValue,
      lowStockProducts,

      expiringSoon,

      recentProducts,

      expiringSoonProducts,

      categoryStats,

      statusStats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard statistics.",
    });
  }
};

module.exports = {
  getDashboardStats,
};