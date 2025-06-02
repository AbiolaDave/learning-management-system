import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  courseTitle: string;
  courseCode: string;
  courseDescription: string;
  lecturer: string;
  admin: string;
};

type Field = {
  name: keyof FormValues;
  label: string;
};

const NewCourseModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
  const { adminData } = useAuth();

  const url = `${import.meta.env.VITE_API_URL}/courses/add`;

  const formik = useFormik<FormValues>({
    initialValues: {
      courseTitle: "",
      courseCode: "",
      courseDescription: "",
      lecturer: "",
      admin: adminData.data.user.email,
    },
    onSubmit: async (values) => {
      let school = adminData.data?.user?.school;
      console.log(school, "School Data");
      console.log(adminData.data, "Admin Data");
      try {
        const payload = {
          ...values,
          admin: adminData.data.user.email,
          school,
        };
        console.log(payload);

        const response = await axios.post(url, payload);
        if (response.status === 200 || response.status === 201) {
          console.log("Course added successfully", response.data);
          onClose();
        } else {
          console.log("Failed to add course");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  });

  if (!isOpen) return null;

  const fields: Field[] = [
    { name: "courseTitle", label: "Course Title" },
    { name: "courseCode", label: "Course Code" },
    { name: "courseDescription", label: "Course Description" },
    { name: "lecturer", label: "Lecturer" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
            Add New Course
          </h3>
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-red-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
            >
              <label
                htmlFor={field.name}
                className="font-semibold text-gray-700 sm:w-40"
              >
                {field.label}:
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border-b-2 border-blue-200 bg-transparent py-2 focus:outline-none focus:border-blue-500 text-gray-800 font-medium"
              />
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCourseModal;
