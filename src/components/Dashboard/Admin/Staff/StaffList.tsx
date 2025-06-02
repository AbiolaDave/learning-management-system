import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";
import StaffDetails from "./StaffDetails";
import StaffModal from "./StaffModal";

interface Staff {
  name: string;
  staffId: string;
  course: string;
  department: string;
}

const StaffList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [staffs, setStaff] = useState<Staff[]>([]);

  const { adminData } = useAuth();
  let email = localStorage.getItem("AdminEmail");
  let role = localStorage.getItem("AdminRole");
  let school = localStorage.getItem("AdminSchool");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const openDetails = (staff: Staff) => {
    setSelectedStaff(staff);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedStaff(null);
    setDetailsOpen(false);
  };

  const payload = { email, role };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/staff/all`, {
        params: {
          email,
          role,
          school,
        },
      });
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

  const onDetailsClose = () => setDetailsOpen(false);

  return (
    <div className="w-full px-2 md:px-8">
      <div className="flex justify-end mt-6 sm:mt-10">
        <button
          onClick={editDetails}
          className="bg-blue-500 text-white font-semibold px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 text-sm sm:text-base"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Staff</span>
        </button>
      </div>

      <div className="mt-6 sm:mt-10">
        <h1 className="text-xl sm:text-2xl text-center text-blue-500 font-bold mb-4">
          List of Staff
        </h1>
      </div>

      <div className="hidden md:block w-full overflow-x-auto">
        <table className="min-w-[600px] text-blue-500 w-full border border-collapse text-sm sm:text-base">
          <thead>
            <tr>
              <th className="w-40 border px-2 py-1 text-left">Name</th>
              <th className="w-40 border px-2 py-1 text-left">Staff ID</th>
              <th className="w-60 border px-2 py-1 text-left">Courses</th>
              <th className="w-40 border px-2 py-1 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr
                key={index}
                onClick={() => openDetails(staff)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="border px-2 py-1 truncate">{staff.name}</td>
                <td className="border px-2 py-1 truncate">{staff.staffId}</td>
                <td className="border px-2 py-1 truncate">{staff.course}</td>
                <td className="border px-2 py-1 truncate">
                  {staff.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="block md:hidden space-y-4 mt-4">
        {staffs.map((staff, index) => (
          <div
            key={index}
            onClick={() => openDetails(staff)}
            className="border border-blue-200 p-4 rounded shadow-sm bg-white cursor-pointer"
          >
            <p className="text-blue-500 font-semibold text-sm">
              <span className="block text-gray-500">Name:</span>
              {staff.name}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Staff ID:</span>
              {staff.staffId}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Courses:</span>
              {staff.course}
            </p>
            <p className="text-blue-500 font-semibold text-sm mt-2">
              <span className="block text-gray-500">Department:</span>
              {staff.department}
            </p>
          </div>
        ))}
      </div>

      <StaffDetails
        detailsOpen={detailsOpen}
        onDetailsClose={closeDetailsModal}
        staff={selectedStaff}
      />
      <StaffModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default StaffList;
