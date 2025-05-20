import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  // Trim spaces and basic validation
  const { name, email, age, gender, password, confirmPassword } = formData;

  if (!name || !email || !age || !gender || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.trim() !== confirmPassword.trim()) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name: name.trim(),
      email: email.trim(),
      age: Number(age),
      gender: gender.toLowerCase(),
      password: password,
    });

    alert("Registration successful!");
    console.log(res.data);
    // Optionally redirect
    // window.location.href = "/login";
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    alert(message);
    console.error(message);
  }
};

  return (
    <div className="min-h-screen bg-[url('/src/assets/register-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
      
      <div className="relative z-10 w-full max-w-4xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-lg p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition duration-300"
            >
              Register
            </button>
            <p className="text-center text-white mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
