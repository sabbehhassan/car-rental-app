import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import PrivateRoute from "../privateRoutes";
import Dashboard from "../../pages/Dashboard";
import CarsPage from "../../pages/CarsPage";
import AdminDashboard from "../../pages/AdminDashboard";
import AddCar from "../../pages/AddCar";
import EditCar from "../../pages/EditCar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cars",
        element: <CarsPage />,
      },
    ],
  },
  {
    element: <PrivateRoute adminOnly={true} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/add",
        element: <AddCar />,
      },
      {
        path: "/admin/edit/:id",
        element: <EditCar />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
