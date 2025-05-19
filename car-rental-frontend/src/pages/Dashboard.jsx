import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">Welcome to your Dashboard</h2>
        {user ? (
          <div className="bg-white p-6 rounded shadow-md">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p className="text-red-500">User not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
