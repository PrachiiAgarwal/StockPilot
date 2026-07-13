import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import StockHistory from "../features/stock/pages/stockHistory";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/stock-history"
        element={<StockHistory />}
      />
    </Routes>
  );
}

export default AppRoutes;