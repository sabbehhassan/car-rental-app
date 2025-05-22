import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
    description: "",
    isVisibleToUsers: false,
  });

  useEffect(() => {
    // Fetch car details by id and set in state
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
      .then((res) => setCarData(res.data))
      .catch((err) => console.error("Failed to fetch car", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:5000/api/cars/${id}`, carData);
    // navigate with state to tell dashboard to refresh
    navigate("/admin-dashboard", { state: { updated: true } });
  } catch (err) {
    console.error("Failed to update car", err);
  }
};

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Car Details</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">Car Name</label>
          <input
            id="name"
            name="name"
            value={carData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter car name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="type">Car Model / Type</label>
          <input
            id="type"
            name="type"
            value={carData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter car model or type"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            type="number"
            className="w-full border rounded p-2"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            value={carData.image}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={carData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter description"
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="isVisibleToUsers"
            type="checkbox"
            name="isVisibleToUsers"
            checked={carData.isVisibleToUsers}
            onChange={handleChange}
          />
          <label htmlFor="isVisibleToUsers" className="font-semibold">Show to users</label>
        </div>

        <button
          type="submit"
          className="bg-yellow-600 text-white rounded px-6 py-2 hover:bg-yellow-700 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;
