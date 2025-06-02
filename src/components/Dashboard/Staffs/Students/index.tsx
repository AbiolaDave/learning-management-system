import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";
import StudentDetails from "../../Admin/Student/StudentDetails";

interface Student {
  name: string;
  studentId: string;
  college: string;
  department: string;
}

const StaffStudents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [staffs, setStaff] = useState<Student[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const openDetails = (student: Student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
  };

  const { adminData } = useAuth();
  let email = localStorage.getItem("AdminEmail");
  let role = localStorage.getItem("AdminRole");
  let school = localStorage.getItem("AdminSchool");
  const payload = { email, role };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/staff/my-students`,
        {
          params: {
            email,
            role,
            school,
          },
        }
      );
      if (response.status === 200) {
        setStaff(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("Error fetching staffs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDetails = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mt-4 sm:mt-6"></div>
      <div className="mt-4 sm:mt-6">
        <h1 className="text-lg sm:text-xl md:text-2xl text-center text-blue-500 font-bold mb-3 sm:mb-4">
          My Students
        </h1>
      </div>
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-blue-500 border">
                  Name
                </th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-blue-500 border">
                  Student ID
                </th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-blue-500 border">
                  College
                </th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-blue-500 border">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-blue-500">
              {staffs.map((staff, index) => (
                <tr
                  key={index}
                  onClick={() => openDetails(staff)}
                  className="hover:bg-gray-100 cursor-pointer transition"
                >
                  <td className="px-3 py-2 border truncate">{staff.name}</td>
                  <td className="px-3 py-2 border truncate">
                    {staff.studentId}
                  </td>
                  <td className="px-3 py-2 border truncate">{staff.college}</td>
                  <td className="px-3 py-2 border truncate">
                    {staff.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StudentDetails
        detailsOpen={detailsOpen}
        onDetailsClose={closeDetailsModal}
        student={selectedStudent}
      />
    </div>
  );
};

export default StaffStudents;
