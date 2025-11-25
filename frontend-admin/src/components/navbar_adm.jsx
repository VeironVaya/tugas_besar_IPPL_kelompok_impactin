import React from "react";
import { NavLink } from "react-router-dom";
import LOGO from "../assets/impactin_logo.png";
import { User } from "lucide-react";

const AdminNavbar = () => {
  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">

        {/* LEFT — LOGO */}
        <div className="flex items-center">
          <img src={LOGO} alt="Impact.in Logo" className="w-32 object-contain" />
        </div>

        {/* CENTER — NAV TABS */}
        <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold">

          {/* NEED APPROVAL */}
          <NavLink
            to="/approval"
            className={({ isActive }) =>
              `px-6 py-2 border-r border-gray-400 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }
          >
            Need Approval
          </NavLink>

          {/* EVENT ACCEPTED */}
          <NavLink
            to="/event_accepted"
            className={({ isActive }) =>
              `px-6 py-2 border-r border-gray-400 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }
          >
            Event Accepted
          </NavLink>

          {/* REPORTED EVENT */}
          <NavLink
            to="/reported_event"
            className={({ isActive }) =>
              `px-6 py-2 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }
          >
            Reported Event
          </NavLink>

        </div>

        {/* RIGHT — ADMIN BOX */}
        <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md">
          <User className="w-4 h-4 text-gray-700" />
          <span className="text-xs font-bold text-gray-700">ADMIN 123</span>
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;
