import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser, registerUser } from '../features/auth/authSlice';

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Initial values
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    ...(type === 'register' && {
      name: Yup.string().required('Name is required'),
      age: Yup.number().required('Age is required').min(1, 'Invalid age'),
      gender: Yup.string().required('Gender is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    if (type === 'login') {
      dispatch(loginUser(values));
    } else {
      dispatch(registerUser(values));
    }
  };

  return (
    <div className="bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {type === 'login' ? 'Welcome Back!' : 'Create Your Account'}
      </h2>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-5">
            {type === 'register' && (
              <>
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
                </div>

                <div>
                  <Field
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
                  />
                  <ErrorMessage name="age" component="div" className="text-red-400 text-sm" />
                </div>

                <div>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-400 text-sm" />
                </div>
              </>
            )}

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm" />
            </div>

            {type === 'register' && (
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-md bg-white bg-opacity-20 text-black"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm" />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Please wait...' : type === 'login' ? 'Login' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
