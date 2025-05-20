// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/hero.avif')" }}>
      <div className="absolute inset-0  bg-opacity-50 z-0" />
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">Drive Luxury. Drive Freedom.</h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in delay-200">Rent premium cars at unbeatable prices</p>
        <div className="flex gap-4 animate-fade-in delay-400">
          <Link to="/register" className="px-6 py-3 bg-gradient-to-r  from-yellow-400 to-orange-500 hover:bg-[#dcd16d] rounded-2xl text-white font-semibold shadow-lg transition duration-300">Get Started</Link>
          <Link to="/cars" className="px-6 py-3 bg-white hover:bg-gray-200 rounded-2xl text-indigo-600 font-semibold shadow-lg transition duration-300">Explore Cars</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
