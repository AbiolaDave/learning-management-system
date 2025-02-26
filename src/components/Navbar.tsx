import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo1.png";
import Style from "../components/Dashboard.module.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-white shadow-md ${Style.nav} fixed w-full z-1000`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}

          <div className="text-2xl flex font-bold text-gray-800">
            <img className="rounded-full" width={50} src={Logo} alt="" />
            <p className="mx-4 mt-2">LMS</p>
          </div>

          <div>
            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-4 h-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-28 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Contact
            </a>

            <button>Login</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Services
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
