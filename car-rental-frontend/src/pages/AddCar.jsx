import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCar = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Car Name is required'),
    type: Yup.string().trim().required('Car Type is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be greater than zero')
      .required('Price is required'),
    image: Yup.string().url('Invalid URL').nullable(),
    description: Yup.string().nullable(),
    isVisibleToUsers: Yup.boolean(),
  });

  const initialValues = {
    name: '',
    type: '',
    price: '',
    image: '',
    description: '',
    isVisibleToUsers: false,
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:5000/api/car', values);
      resetForm();
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Failed to add car. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block font-semibold">
                Car Name *
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Car Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="type" className="block font-semibold">
                Car Type *
              </label>
              <Field
                id="type"
                name="type"
                placeholder="Car Type"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-semibold">
                Price *
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="image" className="block font-semibold">
                Image URL
              </label>
              <Field
                id="image"
                name="image"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id="isVisibleToUsers"
                name="isVisibleToUsers"
                className="form-checkbox"
              />
              <label htmlFor="isVisibleToUsers">Show to users</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded text-white ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Car'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
