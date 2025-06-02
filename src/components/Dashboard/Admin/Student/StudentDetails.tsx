import React from "react";

interface StudentDetailsProps {
  detailsOpen: boolean;
  onDetailsClose: () => void;
  student: {
    name: string;
    studentId: string;
    college: string;
    department: string;
    email?: string;
    gender?: string;
    address?: string;
    phoneNumber?: string;
    school?: string;
    profilePicture?: string;
  } | null;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({
  detailsOpen,
  onDetailsClose,
  student,
}) => {
  if (!detailsOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
            {student.name} Profile
          </h3>
          <button
            onClick={onDetailsClose}
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

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
          {[
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "gender", label: "Gender" },
            { name: "address", label: "Address" },
            { name: "phoneNumber", label: "Phone Number" },
            { name: "department", label: "Department" },
            { name: "college", label: "College" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                value={student[field.name as keyof typeof student] || ""}
                type="text"
                readOnly
                className="w-full bg-transparent border-b-2 border-blue-200 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-400 py-2"
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">
              Profile Picture
            </label>
            <div className="flex items-center justify-center sm:justify-start">
              <img
                src={
                  student.profilePicture || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border border-blue-200"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetails;
