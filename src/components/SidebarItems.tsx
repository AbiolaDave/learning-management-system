import {
  ChevronFirst,
  ChevronLast,
  Home,
  LibraryBig,
  LogOut,
  User,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import Courses from "./Dashboard/Admin/Courses/Courses";
import HomeView from "./Dashboard/Admin/Home/Home";

import Staff from "./Dashboard/Admin/Staff/Staff";
import Student from "./Dashboard/Admin/Student/Student";
import StaffCourse from "./Dashboard/Staffs/Courses";
import StaffStudent from "./Dashboard/Staffs/Students/StaffStudent";
import StudentCourse from "./Dashboard/Students/Course/StudentCourse";
import Profile from "./Profile/Profile";

const SidebarItems = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [role, setRole] = useState("");

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("AdminRole");
    if (storedRole) {
      setRole(storedRole);
      console.log("Role from localStorage:", storedRole);
    } else {
      console.log("No role found in localStorage");
    }
  }, []);

  const switchToVideoCall = () => {
    window.location.href = "https://agora-vc-dxed.vercel.app/";
  };

  const logOut = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminEmail");
    localStorage.removeItem("AdminRole");
    localStorage.removeItem("AdminSchool");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="flex h-full">
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        {mobileOpen ? <ChevronFirst /> : <ChevronLast />}
      </button>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
        <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          active={activeItem === "Home"}
          alert={activeItem === "Home"}
          onClick={() => {
            handleItemClick("Home");
            if (window.innerWidth < 768) setMobileOpen(false);
          }}
        />
        <SidebarItem
          icon={<User size={20} />}
          text="Profile"
          active={activeItem === "Profile"}
          alert={activeItem === "Profile"}
          onClick={() => handleItemClick("Profile")}
        />
        <SidebarItem
          icon={<LibraryBig />}
          text="Courses"
          active={activeItem === "Courses"}
          alert={activeItem === "Courses"}
          onClick={() => handleItemClick("Courses")}
        />
        <SidebarItem
          icon={<UserCheck />}
          text="Lecturers"
          active={activeItem === "Lecturers"}
          alert={activeItem === "Lecturers"}
          onClick={() => handleItemClick("Lecturers")}
        />
        <SidebarItem
          icon={<Users />}
          text="Students"
          active={activeItem === "Students"}
          alert={activeItem === "Students"}
          onClick={() => handleItemClick("Students")}
        />

        <SidebarItem
          icon={<Video />}
          text="Video Call"
          active={activeItem === "Video Call"}
          alert={activeItem === "Video Call"}
          onClick={() => switchToVideoCall()}
        />
        <SidebarItem
          icon={<LogOut />}
          text="LogOut"
          active={activeItem === "LogOut"}
          alert={activeItem === "LogOut"}
          onClick={() => logOut()}
        />
      </Sidebar>

      <div className="flex-1 transition-all duration-300 p-4">
        {activeItem === "Home" && <HomeView />}
        {activeItem === "Profile" && <Profile />}
        {activeItem === "Courses" && role === "admin" && <Courses />}
        {activeItem === "Courses" && role === "Staff" && <StaffCourse />}
        {activeItem === "Courses" && role === "Student" && <StudentCourse />}
        {activeItem === "Lecturers" && <Staff />}
        {activeItem === "Students" && role === "admin" && <Student />}
        {activeItem === "Students" && role === "Staff" && <StaffStudent />}
      </div>
    </div>
  );
};

export default SidebarItems;
