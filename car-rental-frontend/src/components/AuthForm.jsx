import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/auth/authSlice';

const AuthForm = ({ type, formData, onChange }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      dispatch(loginUser(formData));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
   <div className="bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        {type === 'login' ? 'Welcome Back!' : 'Create Your Account'}
      </h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {type === 'register' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={onChange}
              required
              className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              required
              className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
          className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        {type === 'register' && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={onChange}
            required
            className="w-full p-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Please wait...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
