import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LOGO from "../assets/impactin_logo.png";
import { User } from "lucide-react";
import LogoutPopUp from "./logout_popup";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    // 🔥 DELETE TOKEN
    localStorage.removeItem("token");

    // 🔁 CLOSE MODAL
    setShowLogout(false);

    // 🔁 REDIRECT TO LOGIN
    navigate("/Login_adm", { replace: true });

    // 🔄 OPTIONAL: RESET ALL STATE (recommended)
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <img src={LOGO} alt="Impact.in Logo" className="w-32 object-contain" />

          <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold">
            <NavLink to="/approval" className={({ isActive }) =>
              `px-6 py-2 border-r border-gray-400 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }>
              Need Approval
            </NavLink>

            <NavLink to="/event_accepted" className={({ isActive }) =>
              `px-6 py-2 border-r border-gray-400 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }>
              Event Overview
            </NavLink>

            <NavLink to="/reported_event" className={({ isActive }) =>
              `px-6 py-2 ${
                isActive ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
              }`
            }>
              Reported Event
            </NavLink>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              <User className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-bold text-gray-700">ADMIN 123</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowLogout(true);
                    setOpen(false);
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutPopUp
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default AdminNavbar;
