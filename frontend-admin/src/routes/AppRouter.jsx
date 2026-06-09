// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApprovalPage from "../pages/admin/approval";
import AcceptedPage from "../pages/admin/event_accepted";
import ReportedPage from "../pages/admin/reported_event";
import ApprovalDetailPage from "../pages/admin/approval_detail_adm";
import OverviewDetailPage from "../pages/admin/overview_detail_adm";
import ReportDetailPage from "../pages/admin/report_detail";
import LoginAdmPage from "../pages/admin/login_adm";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login_adm" element={<LoginAdmPage />} />
      <Route path="/approval" element={<ApprovalPage />} />
      <Route path="/event_accepted" element={<AcceptedPage />} />
      <Route path="/reported_event" element={<ReportedPage />} />
      <Route path="/approval_detail_adm/:id" element={<ApprovalDetailPage />} />
      <Route path="/overview_detail_adm/:id" element={<OverviewDetailPage />} />
      <Route path="/report_detail/:id" element={<ReportDetailPage />} />

      <Route path="/" element={<Navigate to="/login_adm" replace />} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
