import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo1.png";
import Style from "../../components/Dashboard.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full bg-white shadow-md ${Style.nav}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            className="flex w-fit items-center text-2xl font-bold text-gray-600"
            aria-label="LMS home"
            onClick={() => setIsOpen(false)}
          >
            <img className="h-[50px] w-[50px] rounded-full" src={Logo} alt="" />
            <span className="ml-3">LMS</span>
          </Link>

          <div className="hidden items-center justify-center gap-6 lg:flex">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="whitespace-nowrap text-gray-600 hover:text-blue-500"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center justify-self-end gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 font-medium text-blue-700 hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Sign Up
            </Link>
          </div>

          <div className="justify-self-end lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t bg-white px-4 pb-4 lg:hidden">
          <div className="flex flex-col py-2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-blue-700 px-4 py-2.5 text-center font-medium text-blue-700 hover:bg-blue-50 sm:flex-1"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-center font-semibold text-white hover:bg-blue-800 sm:flex-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
