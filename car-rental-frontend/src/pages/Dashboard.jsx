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
    navigate("/login");
  };

  const goToCars = () => {
    navigate("/cars");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      {/* Top Navbar */}
      <div className="w-full flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-white/10 border-b border-white/20 fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold tracking-wide">Hello, {user?.name}</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Center Content */}
      <div className="flex items-center justify-center h-screen pt-20">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-semibold tracking-wide text-white/90">
            🚘 Welcome to CarRent Dashboard
          </h2>
          <p className="text-white/60 text-lg">
            Your one-stop destination for luxury car rentals.
          </p>
          <button
            onClick={goToCars}
            className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
          >
            Start Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
