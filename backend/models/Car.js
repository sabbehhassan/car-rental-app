// models/Car.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  description: String,
  isVisibleToUsers: {
    type: Boolean,
    default: false,
  },
});

const Car = mongoose.model('Car', carSchema);
export default Car;
