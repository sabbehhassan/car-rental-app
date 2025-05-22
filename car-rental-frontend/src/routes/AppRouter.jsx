import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import CarsPage from "../pages/CarsPage";
import AdminDashboard from "../pages/AdminDashboard";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";

const AppRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Inline PrivateRoute component
  const PrivateRoute = ({ children, adminOnly = false }) => {
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && userInfo.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/cars"
        element={
          <PrivateRoute>
            <CarsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute adminOnly={true}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/add"
        element={
          <PrivateRoute adminOnly={true}>
            <AddCar />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <PrivateRoute adminOnly={true}>
            <EditCar />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
