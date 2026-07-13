import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import StockHistory from "../features/stock/pages/stockHistory";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../contexts/AuthContext";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>

      <Route
        path="/login"
        element={
          token ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={
          token ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Register />
          )
        }
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