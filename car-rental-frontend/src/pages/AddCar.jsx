import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    image: '',
    description: '',
    isVisibleToUsers: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/cars', formData);
    navigate('/admin-dashboard'); // Redirect to dashboard
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Car Name" className="w-full p-2 border" />
        <input name="type" onChange={handleChange} placeholder="Car Type" className="w-full p-2 border" />
        <input name="price" onChange={handleChange} type="number" placeholder="Price" className="w-full p-2 border" />
        <input name="image" onChange={handleChange} placeholder="Image URL" className="w-full p-2 border" />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full p-2 border" />
        <label>
          <input
            type="checkbox"
            name="isVisibleToUsers"
            checked={formData.isVisibleToUsers}
            onChange={handleChange}
          /> Show to users
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save Car</button>
      </form>
    </div>
  );
};

export default AddCar;
