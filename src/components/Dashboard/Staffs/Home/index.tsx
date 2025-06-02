import axios from "axios";
import { useEffect, useState } from "react";

const StaffHome = () => {
  let url = `${import.meta.env.VITE_API_URL}/admin/total`;
  let school = localStorage.getItem("AdminSchool");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(url, {
        params: {
          school,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Total Data:", response.data);
          setTotalStudents(response.data.data.totalStudents);
          setTotalStaffs(response.data.data.totalStaff);
          setTotalCourses(response.data.data.totalCourses);
          setTotalUsers(
            response.data.data.totalAdmins +
              response.data.data.totalStudents +
              response.data.data.totalStaff
          );
        } else {
          console.log("Error fetching total data");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the total data!", error);
      });
  };

  return (
    <>
      <div className="w-screen h-dvh grid grid-cols-2 justify-items-center items-center">
        <div className="border h-56 border-gray-500 w-72 rounded-lg ">
          <div className="bg-blue-400 text-white text-2xl font-bold h-28 text-center flex items-center">
            <h3 className="max-w-60 mx-auto">
              My Students
            </h3>
          </div>
          <div className="flex justify-center items-center font-bold text-4xl h-28 text-blue-600">
            <h1>{totalStudents}</h1>
          </div>
        </div>
        <div className="border h-56 border-gray-500 w-72 rounded-lg ">
          <div className="bg-blue-400 text-white text-2xl font-bold h-28 text-center flex items-center">
            <h3 className="max-w-60 mx-auto">Total No of Registered Staffs</h3>
          </div>
          <div className="flex justify-center items-center font-bold text-4xl h-28 text-blue-600">
            <h1>{totalStaffs}</h1>
          </div>
        </div>
        <div className="border h-56 border-gray-500 w-72 rounded-lg ">
          <div className="bg-blue-400 text-white text-2xl font-bold h-28 text-center flex items-center">
            <h3 className="max-w-60 mx-auto">My Courses</h3>
          </div>
          <div className="flex justify-center items-center font-bold text-4xl h-28 text-blue-600">
            <h1>{totalCourses}</h1>
          </div>
        </div>
        <div className="border h-56 border-gray-500 w-72 rounded-lg ">
          <div className="bg-blue-400 text-white text-2xl font-bold h-28 text-center flex items-center">
            <h3 className="max-w-60 mx-auto">Total No of Users</h3>
          </div>
          <div className="flex justify-center items-center font-bold text-4xl h-28 text-blue-600">
            <h1>{totalUsers}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffHome;
