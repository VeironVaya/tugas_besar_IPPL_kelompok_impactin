// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/user/home.jsx";
import LoginPage from "../pages/user/login";
import RegisterPage from "../pages/user/register";
import EventDetailPage from "../pages/user/event_detail";

// IMPORT ProtectedRoute
import ProtectedRoute from "./protected_route";

// Component placeholder biasa
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

      {/* Login & Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 🔒 PROTECTED: Event Detail */}
      <Route
        path="/event/:slug"
        element={
          <ProtectedRoute>
            <EventDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 404 */}
      <Route path="*" element={<Placeholder pageName="404 Not Found" />} />
    </Routes>
  );
};

export default AppRouter;
