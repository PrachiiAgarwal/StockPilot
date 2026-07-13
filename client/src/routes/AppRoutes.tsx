import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../features/auth/pages/Login";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import StockHistory from "../features/stock/pages/stockHistory";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          token ? (
            <MainLayout />
          ) : (
            <Navigate
              to="/login"
              replace
            />
          )
        }
      >
        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="stock-history"
          element={<StockHistory />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;