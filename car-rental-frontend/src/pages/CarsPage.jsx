import React from "react";

// Import all car images
import car1 from "../assets/carimg/car1.avif";
import car2 from "../assets/carimg/car2.avif";
import car3 from "../assets/carimg/car3.avif";
import car4 from "../assets/carimg/car4.avif";
import car5 from "../assets/carimg/car5.avif";
import car6 from "../assets/carimg/car6.avif";
import car7 from "../assets/carimg/car7.avif";
import car8 from "../assets/carimg/car8.avif";
import car9 from "../assets/carimg/car9.avif";
import car10 from "../assets/carimg/car10.avif";

const cars = [
  { id: 1, name: "Luxury Sedan", image: car1 },
  { id: 2, name: "Sport Coupe", image: car2 },
  { id: 3, name: "SUV Premium", image: car3 },
  { id: 4, name: "Convertible", image: car4 },
  { id: 5, name: "Electric Car", image: car5 },
  { id: 6, name: "Business Class", image: car6 },
  { id: 7, name: "VIP Limousine", image: car7 },
  { id: 8, name: "Offroad 4x4", image: car8 },
  { id: 9, name: "Classic Vintage", image: car9 },
  { id: 10, name: "Executive Ride", image: car10 },
];

const CarsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Available Cars for Rent
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={car.image}
              alt={car.name}
              className="rounded-lg w-full mb-4 h-48 object-cover"
            />
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-gray-600 mt-1">Stylish and reliable ride.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
