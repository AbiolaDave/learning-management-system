import {
  Home,
  LibraryBig,
  Settings,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import Courses from "./Courses";

const SidebarItems = () => {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            active={false}
            alert={false}
          />
          <SidebarItem
            icon={<User size={20} />}
            text="Profile"
            active={true}
            alert={false}
          />
          <SidebarItem
            icon={<LibraryBig />}
            text="Courses"
            active={false}
            alert={true}
          />
          <SidebarItem
            icon={<UserCheck />}
            text="Lecturers"
            active={false}
            alert={true}
          />
          <SidebarItem
            icon={<Users />}
            text="Students"
            active={false}
            alert={true}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            active={false}
            alert={true}
          />
        </Sidebar>
        {/* <Profile /> */}
        <Courses />
      </div>
    </>
  );
};

export default SidebarItems;
