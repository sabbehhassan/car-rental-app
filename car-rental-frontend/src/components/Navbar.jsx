import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent absolute w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        <h1 className="text-3xl font-bold tracking-wide">CarRental</h1>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
          <li><Link to="/cars" className="hover:text-yellow-400 transition">Cars</Link></li>
          <li><Link to="/login" className="hover:text-yellow-400 transition">Login</Link></li>
          <li><Link to="/register" className="hover:text-yellow-400 transition">Register</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white px-6 py-4 space-y-4">
          <Link to="/" className="block" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/cars" className="block" onClick={() => setIsOpen(false)}>Cars</Link>
          <Link to="/login" className="block" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="block" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
