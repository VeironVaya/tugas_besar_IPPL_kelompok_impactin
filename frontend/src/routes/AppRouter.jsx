// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/user/home.jsx";
import LoginPage from "../pages/user/login";
import RegisterPage from "../pages/user/register";

// Component Placeholder
const Placeholder = ({ pageName }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="p-10 text-center text-xl bg-white rounded-lg shadow-md">
      Halaman <span className="font-bold text-green-700">{pageName}</span> Belum
      Ada.
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/home" element={<HomePage />} />

      {/* Default '/' langsung diarahkan ke /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<Placeholder pageName="404 Not Found" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
