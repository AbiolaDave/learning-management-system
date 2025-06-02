import axios from "axios";
import { Edit, Mail, MapPin, PhoneCallIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";

const StaffCourse = () => {
  const { adminData } = useAuth();
  const [, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<
    {
      courseTitle: string;
      courseCode: string;
      courseDescription: string;
      lecturer?: string[];
    }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("SHOW COURSE", courses);
  }, [courses]);

  const fetchData = async () => {
    try {
      let email = localStorage.getItem("AdminEmail");
      let role = localStorage.getItem("AdminRole");
      let school = localStorage.getItem("AdminSchool");
      let StaffCourse = adminData?.data?.user?.course;
      let staffId = adminData?.data?.user?.staffId;

      const payload = { email, role, school, StaffCourse, staffId };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/staff/my-course`,
        {
          params: { payload },
        }
      );

      if (response.status === 200) {
        setCourses(response.data.data || []);
      }
    } catch (error) {
      console.log("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const editDetails = () => setIsOpen(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading profile...</h2>
      </div>
    );
  }

  const user = adminData?.data?.user;

  return (
    <main className="w-full max-w-7xl mx-auto mb-32 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col p-6 sm:p-8 border border-gray-200 hover:border-gray-400 hover:shadow-md rounded-md shadow shadow-slate-300 w-full"
          >
            <h1 className="font-bold text-lg sm:text-xl text-center mb-4">
              Course Details
            </h1>
            <div className="font-medium text-sm sm:text-base">
              <h3 className="my-3 flex items-center gap-2">
                <User className="text-blue-600" />
                Course Title: {course.courseTitle}
              </h3>
              <h3 className="my-3 flex items-center gap-2">
                <Mail className="text-blue-600" />
                Course Code: {course.courseCode}
              </h3>
              <h3 className="my-3 flex items-center gap-2">
                <PhoneCallIcon className="text-blue-600" />
                Description: {course.courseDescription}
              </h3>
              <h3 className="my-3 flex items-center gap-2">
                <MapPin className="text-blue-600" />
                Lecturer: {course.lecturer?.[0] || "N/A"}
              </h3>
            </div>
          </div>
        ))}

        <div className="flex flex-col p-6 sm:p-8 border border-gray-400 rounded-md shadow shadow-slate-300 w-full">
          <Edit
            onClick={editDetails}
            className="cursor-pointer mb-2 self-end text-blue-600 hover:text-red-500"
          />
          <h1 className="font-bold text-lg sm:text-xl text-center mb-4">
            Course Information
          </h1>
          <div className="font-medium text-sm sm:text-base">
            <h3 className="my-3 flex items-center gap-2">
              School: {user?.school || "N/A"}
            </h3>
            <h3 className="my-3 flex items-center gap-2">
              College: {user?.college || "N/A"}
            </h3>
            <h3 className="my-3 flex items-center gap-2">
              Department: {user?.department || "N/A"}
            </h3>
            <h3 className="my-3 flex items-center gap-2">
              Role: {user?.role || "N/A"}
            </h3>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 border border-gray-400 rounded-md shadow shadow-slate-300 w-full">
          <Edit
            onClick={editDetails}
            className="cursor-pointer mb-2 self-end text-blue-600 hover:text-red-500"
          />
          <h1 className="font-bold text-lg sm:text-xl text-center mb-4">
            Personal Information
          </h1>
          <div className="font-medium text-sm sm:text-base">
            <h3 className="my-3">Name: {user?.name || "N/A"}</h3>
            <h3 className="my-3">Email: {user?.email || "N/A"}</h3>
            <h3 className="my-3">Phone No: {user?.phone || "N/A"}</h3>
            <h3 className="my-3">Address: {user?.address || "N/A"}</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaffCourse;
