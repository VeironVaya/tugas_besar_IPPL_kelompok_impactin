import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbar_adm";
import CancelEventPopUp from "../../components/cancel_event.jsx";
import { getReportDetail, resolveReport } from "../../api/report";
import { cancelEvent } from "../../api/event";

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="border rounded-md px-3 py-2 bg-gray-100 text-gray-800 min-h-[40px] leading-relaxed">
      {children}
    </div>
  </div>
);

const ReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const MAX_NOTES = 500;
  const WARNING_THRESHOLD = 490;
  const [adminNotes, setAdminNotes] = useState("");
  const isResolved = report?.reportStatus === "resolved";
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [resolving, setResolving] = useState(false);
  const isEventCancelled = report?.eventSubStatus === "cancelled";
  const isEventCompleted = report?.eventSubStatus === "completed";
  const canCancelEvent = !isEventCancelled && !isEventCompleted;

  useEffect(() => {
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getReportDetail(id);

      // Map backend → frontend
      const resData = res.data;
      const mapped = {
        id: String(resData.report_id),
        reporter: resData.reporter_name,
        date: new Date(resData.reported_date).toLocaleDateString("id-ID"),
        eventId: String(resData.event_id),
        eventName: resData.event_title,
        creator: resData.host_name,
        description: resData.description,

        reportStatus: resData.report_status,
        eventStatus: resData.event_status,
        eventSubStatus: resData.event_sub_status,

        resolvedOn: resData.responded_date
          ? new Date(resData.responded_date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : null,
      };

      setReport(mapped);
      setAdminNotes(resData.admin_response ?? "");

      setReport(mapped);
    } catch (err) {
      console.error("Failed to fetch report detail:", err);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  fetchDetail();
}, [id]);

  if (loading) {
    return <div className="p-6">Loading report detail...</div>;
  }
  if (!report) {
    return <div className="p-6">Report not found.</div>;
  }

  const handleCancelEvent = async () => {
      try {
        await cancelEvent(report.eventId);

        setReport((prev) => ({
          ...prev,
          eventSubStatus: "cancelled",
        }));

        alert("Event cancelled successfully");
      } catch (err) {
        console.error("Failed to cancel event:", err);
        alert("Failed to cancel event");
      } finally {
        setOpenCancelModal(false);
      }
    };

    const handleResolve = async () => {
      if (!adminNotes.trim()) {
        alert("Please fill admin notes before resolving");
        return;
      }

      try {
        setResolving(true);

        const res = await resolveReport(report.id, adminNotes);

        setReport((prev) => ({
          ...prev,
          status: res.data.data.status,
          resolvedOn: new Date(res.data.data.responded_at).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));

        setAdminNotes(res.data.data.admin_response);

        alert("Report resolved successfully");
      } catch (err) {
        console.error("Failed to resolve report:", err);
        alert("Failed to resolve report");
      } finally {
        setResolving(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-5xl mx-auto">

          <h2 className="text-lg font-semibold">Event Report</h2>

          <Field label="Reporter">{report.reporter}</Field>
          <Field label="Date Of Report">{report.date}</Field>
          <Field label="Event ID">{report.eventId}</Field>
          <Field label="Event Name">{report.eventName}</Field>
          <Field label="Creator">{report.creator}</Field>

          <div>
            <label className="text-xs font-semibold text-gray-600">Report Description</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {report.description}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600">
              Admin Notes {isResolved ? "" : <span className="text-red-600">*</span>}
            </label>
            <textarea
              readOnly={isResolved}
              maxLength={MAX_NOTES}
              className={`w-full min-h-[150px] border rounded-md p-3 focus:outline-none bg-white
                ${adminNotes.length >= WARNING_THRESHOLD ? "border-red-500" : "border-gray-300"}
              `}
              placeholder="please fill your notes here"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
            {adminNotes.length >= WARNING_THRESHOLD && (
            <div className="text-right text-xs text-red-600 mt-1">
              {adminNotes.length}/{MAX_NOTES} characters
            </div>
          )}
          </div>

          {/* buttons / resolved info */}
          {!isResolved ? (
            <div className="flex justify-between pt-3">
              <button
                disabled={!canCancelEvent}
                className={`px-6 py-2 rounded text-white transition
                  ${
                    canCancelEvent
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
                onClick={() => setOpenCancelModal(true)}
              >
                Cancel Event
              </button>
              {!canCancelEvent && (
                <p className="text-xs text-red-600">
                  Event cannot be cancelled because it&apos;s already{" "}
                  {isEventCompleted ? "completed" : "cancelled"}.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  disabled={resolving}
                  className={`px-6 py-2 rounded text-white transition
                    ${
                      resolving
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  `}
                  onClick={handleResolve}
                >
                  {resolving ? "Resolving..." : "Resolve"}
                </button>

                <button
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={() => navigate(-1)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-1 text-base font-semibold text-gray-800">
              Resolved{report.resolvedOn ? ` on: ${report.resolvedOn}` : ""}
            </div>
          )}

        </div>
      </div>

      <CancelEventPopUp
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        onConfirm={handleCancelEvent}
      />
    </div>
  );
};

export default ReportDetailPage;
