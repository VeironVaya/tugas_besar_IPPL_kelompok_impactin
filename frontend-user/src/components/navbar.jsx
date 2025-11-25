import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import LOGO from "../assets/impactin_logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="bg-white text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/home" className="flex items-center">
          <img
            src={LOGO}
            alt="Impact.in Logo"
            className="w-32 object-contain"
          />
        </Link>

        {/* Search */}
        <div className="relative flex items-center bg-[#D9F5E3] rounded-full p-2 w-full max-w-sm mx-6">
          <Search className="w-5 h-5 text-gray-600 ml-2" />
          <input
            type="text"
            placeholder="Search Event"
            className="bg-transparent w-full focus:outline-none placeholder-gray-600 text-sm pl-2"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 text-sm font-bold">
          <NavLink
            to="/your-event"
            className={({ isActive }) =>
              `
      transition
      hover:underline hover:underline-offset-4 hover:text-green-700
      ${isActive ? "underline underline-offset-4 text-green-700" : "text-black"}
    `
            }
          >
            Your Event
          </NavLink>

          <NavLink
            to="/create-event"
            className={({ isActive }) =>
              `
      transition
      hover:underline hover:underline-offset-4 hover:text-green-700
      ${isActive ? "underline underline-offset-4 text-green-700" : "text-black"}
    `
            }
          >
            Create Event
          </NavLink>

          {/* ✅ Profile Logic */}
          <NavLink
            to={user ? "/profile" : "/login"}
            className={({ isActive }) =>
              `hover:text-green-600 transition ${
                isActive
                  ? "underline underline-offset-4 text-green-700"
                  : "text-black"
              }`
            }
          >
            {user ? user.username : "Login"}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
