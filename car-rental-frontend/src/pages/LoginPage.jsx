import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../assets/hero.avif";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", formData);

      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect user to dashboard or home
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-black">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Luxury Cars"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8">
          <AuthForm
            type="login"
            formData={formData}
            onChange={handleChange}
            onSubmit={handleLogin}
          />

          <p className="mt-6 text-center text-sm text-gray-200">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
