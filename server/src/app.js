const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const stockMovementRoutes = require("./routes/stockMovement.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

app.get("/", (req, res) => {
  res.send("StockPilot API is running 🚀");
});

module.exports = app;