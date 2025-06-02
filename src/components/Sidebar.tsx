import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import Logo from "../assets/logo1.png";
import { useAuth } from "../context/Auth/AuthContext";

const SidebarContext = createContext<any | null>(null);
export default function Sidebar({
  children,
  mobileOpen,
  setMobileOpen,
}: {
  children: any;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setExpanded((prev) => !prev);
    }
  };

  const { adminData } = useAuth();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        {mobileOpen ? <ChevronFirst /> : <ChevronLast />}
      </button>

      <aside
        className={`h-full fixed top-0 z-40 transition-all duration-300 bg-white shadow-md
    ${expanded ? "md:w-64" : "md:w-16"}
    ${mobileOpen ? "w-64 left-0" : "w-0 -left-full"}
    md:relative md:left-0 overflow-hidden
  `}
      >
        <nav className="h-full flex flex-col border-r">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={Logo}
                width={40}
                height={40}
                className={`transition-all rounded-full ${
                  expanded || mobileOpen ? "w-12" : "w-0"
                }`}
                alt="Logo"
              />
              {(expanded || mobileOpen) && (
                <h1 className="font-bold text-3xl text-gray-700 ml-2">LMS</h1>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider
            value={{
              expanded: window.innerWidth < 768 ? mobileOpen : expanded,
            }}
          >
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src={adminData.data.user.profilePicture}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            {(expanded || mobileOpen) && (
              <div className="ml-3 flex justify-between items-center w-full">
                <div className="leading-4">
                  <h4 className="font-semibold">{adminData.data.user.name}</h4>
                  <span className="text-xs text-gray-600">
                    {adminData.data.user.email}
                  </span>
                </div>
                <MoreVertical size={20} />
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  onClick,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
  active: boolean;
  alert?: boolean;
  onClick?: any;
}) {
  const { expanded } = useContext(SidebarContext) || { expanded: true };

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
