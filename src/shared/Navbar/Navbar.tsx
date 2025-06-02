import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import Style from "../../components/Dashboard.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-white shadow-md ${Style.nav} fixed w-full z-1000`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl flex font-bold text-gray-600">
            <img className="rounded-full" width={50} src={Logo} alt="" />
            <p className="mx-4 mt-2 ">LMS</p>
          </div>

          <div className="hidden md:flex space-x-6 mr-4 md:mr-30">
            <Link to={`/`} className="text-gray-600 hover:text-blue-500">
              Home
            </Link>
            <Link to={`/about`} className="text-gray-600 hover:text-blue-500">
              About
            </Link>
            <Link
              to={`/services`}
              className="text-gray-600 hover:text-blue-500"
            >
              Services
            </Link>
            <Link
              to={`/signup`}
              className="text-green-600 hover:text-green-800"
            >
              Sign Up
            </Link>
            <Link to={`/login`} className="text-blue-600 hover:text-blue-800">
              <button>Login</button>
            </Link>
          </div>

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

      {isOpen && (
        <div className="md:hidden bg-white border-t ">
          <a
            href="/"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="/services"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Services
          </a>
          {/* <a
            href="/signup"
            className="block px-4 py-2 text-green-600 hover:bg-green-800"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-800"
          >
            Login
          </a> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
