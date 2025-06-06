import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisibleCars } from '../features/car/carSlice';

const CarsPage = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(fetchVisibleCars());
  }, [dispatch]);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Available Cars for Rent
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {cars?.length === 0 ? (
          <p>No cars available at the moment.</p>
        ) : (
          cars?.map((car) => (
            <div
              key={car._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={car.image || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={car.name}
                className="rounded-lg w-full mb-4 h-48 object-cover"
              />
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-600 mt-1">Type: {car.type}</p>
              <p className="text-gray-600 mt-1">Price: ${car.price}</p>
              <p className="text-gray-600 mt-1">{car.description}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarsPage;
