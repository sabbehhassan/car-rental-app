// routes/carRoutes.js
import express from 'express';
import Car from '../models/Car.js'; 
const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Add new car
router.post('/', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.status(201).json(car);
});

// Delete car
router.delete('/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car deleted' });
});

// Update car
router.put('/:id', async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCar);
});

// Get only visible cars for users
router.get('/visible', async (req, res) => {
  const cars = await Car.find({ isVisibleToUsers: true });
  res.json(cars);
});

export default router;
