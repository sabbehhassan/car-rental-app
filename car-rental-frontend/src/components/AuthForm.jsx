import React from 'react';

const AuthForm = ({ type, formData, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg p-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wide drop-shadow-md">
        {type === 'login' ? 'Welcome Back 👋' : 'Create Account'}
      </h2>

      {type === 'register' && (
        <>
          <InputField label="Full Name" name="name" type="text" value={formData.name || ''} onChange={onChange} />
          <InputField label="Age" name="age" type="number" value={formData.age || ''} onChange={onChange} />
          <div className="mb-5">
            <label className="text-white block mb-2 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={onChange}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      )}

      <InputField label="Email" name="email" type="email" value={formData.email} onChange={onChange} />
      <InputField label="Password" name="password" type="password" value={formData.password} onChange={onChange} />

      {type === 'register' && (
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword || ''}
          onChange={onChange}
        />
      )}

      <button
        type="submit"
        className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition duration-300"
      >
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

const InputField = ({ label, name, type, value, onChange }) => (
  <div className="mb-5">
    <label className="text-white block mb-2 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder={`Enter your ${label.toLowerCase()}`}
      required
    />
  </div>
);

export default AuthForm;
