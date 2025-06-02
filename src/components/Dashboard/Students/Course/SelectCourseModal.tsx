import axios from "axios";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  courseTitle: string;
  courseCode: string;
}

interface SelectCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseIds: string[]) => void;
}

const SelectCourseModal: React.FC<SelectCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const fetchCourses = async () => {
    let school = localStorage.getItem("AdminSchool");

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/courses?school=${school}&search=${search}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen, search]);

  const handleSubmit = () => {
    if (selectedCourses.length > 0) {
      onSubmit(selectedCourses);
      onClose();
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md md:max-w-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-2 sm:pb-4">
          <h3 className="text-lg sm:text-2xl font-bold text-blue-600">
            Select Course
          </h3>
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-red-500"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3 sm:mt-4">
          <input
            type="text"
            placeholder="Search for a course..."
            className="w-full border-b-2 border-blue-200 py-2 px-3 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-3 sm:mt-4 max-h-60 overflow-y-auto">
          {courses.length === 0 ? (
            <p className="text-gray-500 text-center mt-4 text-sm sm:text-base">
              No courses found.
            </p>
          ) : (
            <ul className="divide-y">
              {courses.map((course) => (
                <li
                  key={course.courseCode}
                  className={`py-2 px-2 cursor-pointer hover:bg-blue-50 rounded text-sm sm:text-base ${
                    selectedCourses.includes(course.courseCode)
                      ? "bg-blue-100 font-semibold"
                      : ""
                  }`}
                  onClick={() => toggleCourseSelection(course.courseCode)}
                >
                  {course.courseTitle} ({course.courseCode})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            onClick={handleSubmit}
            disabled={selectedCourses.length === 0}
            className={`px-4 py-2 rounded font-semibold text-white text-sm sm:text-base transition ${
              selectedCourses.length
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCourseModal;
