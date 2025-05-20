import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, resetRegisterSuccess } from "../features/auth/authSlice";
import hero from "../assets/hero.avif";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerSuccess, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerSuccess) {
      // Redirect to login after successful registration
      navigate("/login");
      dispatch(resetRegisterSuccess()); // Reset flag after redirect
    }
  }, [registerSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Luxury Cars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Auth Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8">
          <AuthForm
            type="register"
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
          {loading && <p className="text-yellow-400 mt-2 text-center">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
