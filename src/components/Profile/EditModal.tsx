import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../../context/Auth/AuthContext";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
  const { adminData, setAdminData } = useAuth();

  let url = `${import.meta.env.VITE_API_URL}/admin/profile/update`;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: adminData.data.user.email,
      gender: "",
      address: "",
      phoneNumber: "",
      school: adminData.data.school ? adminData.data.school.schoolName : "",
      college: "",
      department: "",
      profilePicture: null,
    },
    onSubmit: async (values: any) => {
      console.log(values, "Form Values");
      axios
        .patch(url, values)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("Profile updated successfully", response.data);
            setAdminData(response.data);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
   
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
            {adminData.data.user.role} Profile
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6"
        >
          {[
            {
              name: "name",
              label: "Name",
              placeholder: adminData.data.user.name,
            },
            {
              name: "email",
              label: "Email",
              placeholder: adminData.data.user.email,
            },
            {
              name: "gender",
              label: "Gender",
              placeholder: adminData.data.user.gender,
            },
            {
              name: "address",
              label: "Address",
              placeholder: adminData.data.user.address,
            },
            {
              name: "phoneNumber",
              label: "Phone Number",
              placeholder: adminData.data.user.phoneNumber,
            },
            {
              name: "school",
              label: "School",
              placeholder: adminData.data.school
                ? adminData.data.school.schoolName
                : "Loading...",
            },
            {
              name: "department",
              label: "Department",
              placeholder: adminData.data.user.department,
            },
            {
              name: "college",
              label: "College",
              placeholder: adminData.data.user.college,
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block font-bold text-gray-700 mb-1 text-sm"
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
                className="w-full bg-transparent border-none border-b-2 border-blue-200 text-gray-800 font-semibold placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-400 py-2 text-sm sm:text-base"
              />
            </div>
          ))}

        
          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 mb-1 text-sm">
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
              className="w-full text-sm text-gray-700 font-bold file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
