import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import StudentDetails from "./StudentDetails";
import StudentModal from "./StudentModal";

interface Student {
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
}

const StudentList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const email = localStorage.getItem("AdminEmail");
  const role = localStorage.getItem("AdminRole");
  const school = localStorage.getItem("AdminSchool");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students/all`,
        {
          params: { email, role, school },
        }
      );
      if (response.status === 200) {
        setStudents(response.data.data);
      } else {
        console.error("Error fetching students");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openDetails = (student: Student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-full px-2 md:px-8">
      <div className="flex justify-end mt-6 sm:mt-10">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 text-sm sm:text-base"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Student</span>
        </button>
      </div>
      \
      <div className="mt-6 sm:mt-10">
        <h1 className="text-xl sm:text-2xl text-center text-blue-500 font-bold mb-4">
          List of Students
        </h1>
      </div>
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="min-w-[600px] text-blue-500 w-full border border-collapse text-sm sm:text-base">
          <thead className="bg-blue-50">
            <tr>
              <th className="w-40 border px-2 py-1 text-left">Name</th>
              <th className="w-40 border px-2 py-1 text-left">Student ID</th>
              <th className="w-60 border px-2 py-1 text-left">College</th>
              <th className="w-40 border px-2 py-1 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                onClick={() => openDetails(student)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="border px-2 py-1 truncate">{student.name}</td>
                <td className="border px-2 py-1 truncate">
                  {student.studentId}
                </td>
                <td className="border px-2 py-1 truncate">{student.college}</td>
                <td className="border px-2 py-1 truncate">
                  {student.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden space-y-4 mt-4">
        {students.map((student, index) => (
          <div
            key={index}
            onClick={() => openDetails(student)}
            className="border border-blue-200 p-4 rounded shadow-sm bg-white cursor-pointer"
          >
            <p className="text-blue-500 font-semibold text-sm">
              <span className="block text-gray-500">Name:</span>
              {student.name}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Student ID:</span>
              {student.studentId}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">College:</span>
              {student.college}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Department:</span>
              {student.department}
            </p>
          </div>
        ))}
      </div>
      <StudentDetails
        detailsOpen={detailsOpen}
        onDetailsClose={closeDetailsModal}
        student={selectedStudent}
      />
      <StudentModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default StudentList;
