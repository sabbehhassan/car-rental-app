import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Car Name is required"),
    type: Yup.string().trim().required("Car Model/Type is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    description: Yup.string().nullable(),
    isVisibleToUsers: Yup.boolean(),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
      .then((res) => {
        setInitialValues({
          name: res.data.name || "",
          type: res.data.type || "",
          price: res.data.price || "",
          image: res.data.image || "",
          description: res.data.description || "",
          isVisibleToUsers: res.data.isVisibleToUsers || false,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch car", err);
        setLoading(false);
      });
  }, [id]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, values);
      navigate("/admin/dashboard", { state: { updated: true } });
    } catch (err) {
      console.error("Failed to update car", err);
      alert("Failed to update car. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading car data...</p>;

  if (!initialValues)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading car data.
      </p>
    );

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Car Details</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">
                Car Name *
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Enter car name"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="type" className="block mb-1 font-semibold">
                Car Model / Type *
              </label>
              <Field
                id="type"
                name="type"
                placeholder="Enter car model or type"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="price" className="block mb-1 font-semibold">
                Price *
              </label>
              <Field
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-1 font-semibold">
                Image URL *
              </label>
              <Field
                id="image"
                name="image"
                placeholder="Enter image URL"
                className="w-full border rounded p-2"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 font-semibold">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter description"
                className="w-full border rounded p-2"
                rows={4}
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
              <label htmlFor="isVisibleToUsers" className="font-semibold">
                Show to users
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Car"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCar;
