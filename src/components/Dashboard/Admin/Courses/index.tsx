import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NewCourseModal from "./NewCourseModal";

interface Course {
  courseTitle: string;
  courseCode: string;
  courseDescription: string;
  lecturer: string;
}

const CoursesComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  let email = localStorage.getItem("AdminEmail");
  let role = localStorage.getItem("AdminRole");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses/all`,
        {
          params: {
            email,
            role,
          },
        }
      );
      if (response.status === 200) {
        setCourses(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("Error fetching courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDetails = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full px-2 md:px-8">
      <div className="flex justify-end mt-6 sm:mt-10">
        <button
          onClick={editDetails}
          className="bg-blue-500 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 
      text-sm sm:text-base"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Course</span>
        </button>
      </div>

      <div className="mt-6 sm:mt-10">
        <h1 className="text-xl sm:text-2xl text-center text-blue-500 font-bold mb-4">
          List of Courses
        </h1>
      </div>

      <div className="hidden md:block w-full overflow-x-auto">
        <table className="min-w-[600px] text-blue-500 w-full border border-collapse text-sm sm:text-base">
          <thead>
            <tr>
              <th className="w-40 border px-2 py-1 text-left">Course Title</th>
              <th className="w-40 border px-2 py-1 text-left">Course Code</th>
              <th className="w-60 border px-2 py-1 text-left">
                Course Description
              </th>
              <th className="w-40 border px-2 py-1 text-left">Lecturers</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-2 py-1 truncate">
                  {course.courseTitle}
                </td>
                <td className="border px-2 py-1 truncate">
                  {course.courseCode}
                </td>
                <td className="border px-2 py-1 truncate w-60">
                  {course.courseDescription}
                </td>
                <td className="border px-2 py-1 truncate">{course.lecturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4 mt-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="border border-blue-200 p-4 rounded shadow-sm bg-white"
          >
            <p className="text-blue-500 font-semibold text-sm">
              <span className="block text-gray-500">Course Title:</span>
              {course.courseTitle}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Course Code:</span>
              {course.courseCode}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Description:</span>
              {course.courseDescription}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Lecturer:</span>
              {course.lecturer}
            </p>
          </div>
        ))}
      </div>

      <NewCourseModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default CoursesComp;
