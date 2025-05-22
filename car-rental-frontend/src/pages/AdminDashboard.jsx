import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice"; // correct path check karen

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux se userInfo lena
  const user = useSelector((state) => state.auth.userInfo);

  const [cars, setCars] = useState([]);

  // Fetch cars function
 useEffect(() => {
  fetchCars();
}, []);

const fetchCars = () => {
  axios.get("http://localhost:5000/api/cars")
    .then(res => setCars(res.data))
    .catch(err => console.error(err));
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Logout handler using Redux
  const handleLogout = () => {
    dispatch(logout()); // Redux se logout action dispatch karo
    navigate("/login"); // redirect to login
  };

  // Redirect agar user nahi hai ya admin nahi hai
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Car
        </Link>
      </div>

      <table className="w-full border border-gray-300 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="text-center">
              <td className="p-3 border">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-24 h-16 object-cover mx-auto"
                />
              </td>
              
              <td className="p-3 border">{car.name}</td>
              <td className="p-3 border">{car.type}</td>
              <td className="p-3 border">${car.price}</td>
              <td className="p-3 border space-x-2">
                
                <Link
                  to={`/admin/edit/${car._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
