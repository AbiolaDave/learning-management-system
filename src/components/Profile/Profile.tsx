import axios from "axios";
import { Edit, Mail, MapPin, PhoneCallIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import EditModal from "./EditModal";

const Profile = () => {
  const { adminData, setAdminData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    console.log("Fetching admin data...", adminData.data.school);
    console.log("Fetching admin data...", adminData.data);
  }, []);

  const fetchData = async () => {
    try {
      let email = localStorage.getItem("AdminEmail");
      let role = localStorage.getItem("AdminRole");
      let school = localStorage.getItem("AdminSchool");
      const payload = { email, role, school };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/details`,
        payload
      );
      if (response.status === 200) {
        console.log("Admin data fetched successfully:", response.data);
        setAdminData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching admin data:", error);
      setLoading(false);
    }
  };

  if (loading || !adminData?.data?.user || !adminData?.data?.school) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading profile...</h2>
      </div>
    );
  }

  const editDetails = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <main className="w-full px-4 mb-32">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col p-6 border border-gray-200 hover:border-gray-400 hover:shadow-lg rounded-md shadow-md mt-10 w-full sm:w-80 md:w-96 items-center">
            <Edit onClick={editDetails} />
            <img
              className="rounded-full mx-auto object-cover max-h-52 w-52"
              src={adminData.data.user.profilePicture}
              alt="Profile Picture"
            />
            <h1 className="font-bold text-center text-2xl mt-4">
              {adminData.data.user.name}
            </h1>
            <p className="text-center">{adminData.data.user.email}</p>
          </div>

          <div className="flex flex-col p-6 border border-gray-400 hover:border-gray-400 hover:shadow-lg rounded-md shadow-md mt-10 w-full sm:w-80 md:w-96">
            <Edit onClick={editDetails} />
            <h1 className="font-bold text-lg text-center">
              Personal Information
            </h1>
            <div className="font-semibold py-6 space-y-4">
              <h3 className="flex items-center gap-2">
                <User /> Name: {adminData.data.user.name}
              </h3>
              <h3 className="flex items-center gap-2">
                <Mail /> Email: {adminData.data.user.email}
              </h3>
              <h3 className="flex items-center gap-2">
                <PhoneCallIcon /> Phone No: {adminData.data.user.phoneNumber}
              </h3>
              <h3 className="flex items-center gap-2">
                <MapPin /> Address: {adminData.data.user.address}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col p-6 border border-gray-400 hover:border-gray-400 hover:shadow-lg rounded-md shadow-md mt-10 w-full sm:w-80 md:w-96">
            <Edit onClick={editDetails} />
            <h1 className="font-bold text-lg text-center">Academics</h1>
            <div className="font-semibold py-6 space-y-4">
              <h3>
                School:{" "}
                {adminData.data.school
                  ? adminData.data.school.schoolName
                  : "Loading..."}
              </h3>
              <h3>Role: {adminData.data.user.role}</h3>
              <h3>Department: {adminData.data.user.department}</h3>
              <h3>College: {adminData.data.user.college}</h3>
            </div>
          </div>

          <div className="flex flex-col p-6 border border-gray-400 hover:border-gray-400 hover:shadow-lg rounded-md shadow-md mt-10 w-full sm:w-80 md:w-96">
            <Edit onClick={editDetails} />
            <h1 className="font-bold text-lg text-center">
              Personal Information
            </h1>
            <div className="font-semibold py-6 space-y-4">
              <h3>Name: {adminData.data.user.name}</h3>
              <h3>Email: {adminData.data.user.email}</h3>
              <h3>Phone No: {adminData.data.user.phoneNumber}</h3>
              <h3>Address: {adminData.data.user.address}</h3>
            </div>
          </div>
        </div>

        <EditModal isOpen={isOpen} onClose={closeModal} />
      </main>
    </>
  );
};

export default Profile;
