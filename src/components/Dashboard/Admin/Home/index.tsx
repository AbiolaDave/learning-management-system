import axios from "axios";
import { useEffect, useState } from "react";

const HomeComp = () => {
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
      <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total No of Registered Students", value: totalStudents },
          { label: "Total No of Registered Staffs", value: totalStaffs },
          { label: "Total No of Registered Courses", value: totalCourses },
          { label: "Total No of Users", value: totalUsers },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-md transition duration-300 rounded-lg min-h-[180px] flex flex-col justify-between"
          >
            <div className="bg-blue-500 text-white px-4 py-4 text-center rounded-t-lg">
              <h3 className="text-base sm:text-lg font-medium leading-tight">
                {card.label}
              </h3>
            </div>
            <div className="py-6 flex items-center justify-center text-3xl text-blue-600 font-bold">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeComp;
