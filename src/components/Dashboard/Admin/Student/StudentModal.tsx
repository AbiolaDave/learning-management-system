import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
  const { adminData, } = useAuth();

  const readAsBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  let url = `${import.meta.env.VITE_API_URL}/students/add`;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      address: "",
      phoneNumber: "",
     
      college: "",
      course: "",
      studentId: "",
      password: "",
      department: "",
      profilePicture: null,
    },
    onSubmit: async (values: any) => {
      console.log(values, "Form Values");
      if (values.profilePicture) {
        values.profilePicture = await readAsBase64(
          values.profilePicture as unknown as File
        );
      }

      let school = localStorage.getItem("AdminSchool");
      let payload = {
        ...values,
        school,
        admin: adminData.data.user.email,
      };
      axios
        .post(url, payload)
        .then((response) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            console.log("Profile updated successfully", response.data);
           
            onClose();
          } else {
            console.log("Failed to update profile");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3 sm:pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
            Add New Student
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

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6"
        >
          {[
            { name: "name", label: "Name", placeholder: "Student Name" },
            { name: "email", label: "Email", placeholder: "Student Email" },
            {
              name: "address",
              label: "Address",
              placeholder: "Student Address",
            },
            {
              name: "phoneNumber",
              label: "Phone Number",
              placeholder: "Student Phone Number",
            },
            {
              name: "studentId",
              label: "Student ID",
              placeholder: "Student ID",
            },
            { name: "course", label: "Course", placeholder: "Course" },
            { name: "password", label: "Password", placeholder: "Password" },
            {
              name: "department",
              label: "Department",
              placeholder: "Department",
            },
            { name: "college", label: "College", placeholder: "College" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block font-semibold text-blue-600 mb-1 text-sm sm:text-base"
              >
                {field.label}
              </label>
              <input
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={field.placeholder}
                type="text"
                className="w-full bg-transparent border-none border-b-2 border-blue-200 text-blue-500 font-medium placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-400 py-2 text-sm sm:text-base"
              />
            </div>
          ))}


          <div>
            <label
              htmlFor="gender"
              className="block font-semibold text-blue-600 mb-1 text-sm sm:text-base"
            >
              Gender
            </label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-transparent border-none border-b-2 border-blue-200 text-blue-500 font-medium focus:outline-none focus:ring-0 focus:border-blue-400 py-2 text-sm sm:text-base"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

  
          <div className="md:col-span-2">
            <label className="block font-semibold text-blue-600 mb-1 text-sm sm:text-base">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={(e) =>
                formik.setFieldValue(
                  "profilePicture",
                  e.currentTarget.files?.[0]
                )
              }
              className="w-full text-sm text-blue-700 font-medium file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
            />
            {formik.values.profilePicture &&
              typeof formik.values.profilePicture === "object" && (
                <img
                  src={URL.createObjectURL(formik.values.profilePicture)}
                  alt="Preview"
                  className="w-20 h-20 mt-2 object-cover rounded-full"
                />
              )}
          </div>


          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
