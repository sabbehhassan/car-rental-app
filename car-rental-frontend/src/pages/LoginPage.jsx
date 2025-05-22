import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import Hero from "../assets/hero.avif";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect to dashboard on successful login based on role
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard"); // normal user dashboard
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-black">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={Hero}
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

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
