const StockMovement = require("../models/stockMovement");

const getStockMovements = async (req, res) => {
  try {
    const movements =
      await StockMovement.find({
        createdBy: req.user.id,
      })
        .sort({ createdAt: -1 })
        .populate(
          "product",
          "productName sku"
        );

    res.status(200).json({
      success: true,
      count: movements.length,
      movements,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch stock movements.",
    });
  }
};

module.exports = {
  getStockMovements,
};