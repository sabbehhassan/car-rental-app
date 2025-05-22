import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';  // Ab bcrypt ki zarurat nahi

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

// Hashing disabled — comment or remove the middleware
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Simple password comparison without hashing
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);
export default User;
