// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// --- Pages ---
import HomePage from "../pages/user/home.jsx";
import LoginPage from "../pages/user/login.jsx";
import RegisterPage from "../pages/user/register.jsx";
import ProfilePage from "../pages/user/profile.jsx";
import EditProfilePage from "../pages/user/edit_profile.jsx";

// Event pages
import EventDetailPage from "../pages/user/event_detail.jsx";
import YourEventPage from "../pages/user/your_event.jsx";
import ManageEventPage from "../pages/user/manage_event.jsx";
import CreateEventPage from "../pages/user/create_event.jsx";
import Search from "../pages/user/search.jsx";

// --- Protected Route ---
import ProtectedRoute from "./protected_route";

// --- Placeholder ---
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
      {/* Public Routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<Search />} />

      {/* ==============================
           PROTECTED ROUTES
      =============================== */}
      {/* Event Detail (User harus login) */}
      <Route
        path="/event/:id"
        element={
          <ProtectedRoute>
            <EventDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Your Event (Join/Create event list) */}
      <Route
        path="/your-event"
        element={
          <ProtectedRoute>
            <YourEventPage />
          </ProtectedRoute>
        }
      />
      {/* Create event list */}
      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEventPage />
          </ProtectedRoute>
        }
      />
      {/* Create event list */}
      <Route
        path="/search-event"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      {/* Host Manage Event (Applicant Approval) */}
      <Route
        path="/manage-event/:id"
        element={
          <ProtectedRoute>
            <ManageEventPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit_profile"
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Default "/" → home */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* 404 Page */}
      <Route path="*" element={<Placeholder pageName="404 Not Found" />} />
    </Routes>
  );
};

export default AppRouter;
