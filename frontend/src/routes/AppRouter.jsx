// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/user/home.jsx";
import LoginPage from "../pages/user/login";
import RegisterPage from "../pages/user/register";
import EventDetailPage from "../pages/user/event_detail";
import ApprovalPage from "../pages/admin/approval";
import AcceptedPage from "../pages/admin/event_accepted";
import ReportedPage from "../pages/admin/reported_event";
import ApprovalDetailPage from "../pages/admin/approval_detail_adm";

// Import hook untuk mendapatkan parameter URL (opsional, tapi sering digunakan di halaman detail)
import { useParams } from "react-router-dom";

// Component Placeholder
const Placeholder = ({ pageName }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
       {" "}
    <div className="p-10 text-center text-xl bg-white rounded-lg shadow-md">
            Halaman <span className="font-bold text-green-700">{pageName}</span>{" "}
      Belum       Ada.    {" "}
    </div>
     {" "}
  </div>
);

// Component Placeholder untuk Halaman Detail
const EventDetailPagePlaceholder = () => {
  // Ambil parameter slug dari URL untuk ditampilkan di placeholder
  const { slug } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 text-center text-xl bg-white rounded-lg shadow-md">
        Halaman Detail Event{" "}
        <span className="font-bold text-blue-700">'{slug}'</span> Belum Ada.
        <p className="text-sm mt-2 text-gray-500">
          Silakan buat komponen EventDetailPage.
        </p>
      </div>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Routes>
            {/* Home */}
            <Route path="/home" element={<HomePage />} />     {" "}
      {/* Rute Login & Register */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
      {/* 🟢 RUTE BARU: Detail Event Dinamis */}
      {/* Menggunakan parameter :slug untuk mencocokkan URL /event/deepblue-movement */}
      <Route path="/event/:slug" element={<EventDetailPage />} />   
      {/* 🟢 RUTE ADMIN */}
      <Route path="/approval" element={<ApprovalPage />} />
      <Route path="/event_accepted" element={<AcceptedPage />} />
      <Route path="/reported_event" element={<ReportedPage />} />
      <Route path="/approval_detail_adm/:id" element={<ApprovalDetailPage />} />
        {/* Default '/' langsung diarahkan ke /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />     {" "}
      {/* Catch-all 404 */}     {" "}
      <Route path="*" element={<Placeholder pageName="404 Not Found" />} />   {" "}
    </Routes>
  );
};

export default AppRouter;
