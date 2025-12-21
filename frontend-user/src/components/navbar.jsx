import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import LOGO from "../assets/impactin_logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Handle submit search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <header className="sticky top-6 z-10 bg-white backdrop-blur-md border-b border-gray-100 m-6 shadow-md rounded-xl ">
      <div className=" px-6 lg:px-16 py-5 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/home" className="flex items-center shrink-0">
          <img
            src={LOGO}
            alt="Impact.in Logo"
            className="w-32 object-contain"
          />
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="relative flex items-center bg-emerald-100/70 
                     rounded-full px-4 py-2 w-full max-w-md 
                     focus-within:ring-2 focus-within:ring-emerald-400 transition"
        >
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search event..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 bg-transparent w-full text-sm 
                       placeholder-gray-600 focus:outline-none"
          />
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-semibold shrink-0">
          <NavLink
            to="/your-event"
            className={({ isActive }) =>
              `transition hover:text-emerald-600
               ${
                 isActive
                   ? "text-emerald-700 underline underline-offset-4"
                   : "text-gray-800"
               }`
            }
          >
            Your Event
          </NavLink>

          <NavLink
            to="/create-event"
            className={({ isActive }) =>
              `transition hover:text-emerald-600
               ${
                 isActive
                   ? "text-emerald-700 underline underline-offset-4"
                   : "text-gray-800"
               }`
            }
          >
            Create Event
          </NavLink>

          {/* Login / Profile */}
          <NavLink
            to={user ? "/profile" : "/login"}
            className={({ isActive }) =>
              `transition hover:text-emerald-600
               ${
                 isActive
                   ? "text-emerald-700 underline underline-offset-4"
                   : "text-gray-800"
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
