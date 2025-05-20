import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");  // Logout ke baad login page pe redirect kar do
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">
          Welcome to your Dashboard
        </h2>

        {user ? (
          <div className="bg-white p-6 rounded shadow-md">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || "User"}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-red-500">User not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
