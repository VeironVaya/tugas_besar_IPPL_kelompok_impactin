import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/navbar_adm";
import { useParams, useNavigate } from "react-router-dom";
import CancelEventPopUp from "../../components/cancel_event.jsx";
import {
  getEventApprovedDetail,
  getEventDeclinedDetail,
} from "../../api/event";
import { cancelEvent } from "../../api/event";

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="border rounded-md px-3 py-2 bg-gray-100 text-gray-800 min-h-[40px] leading-relaxed">
      {children ?? "-"}
    </div>
  </div>
);

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

const OverviewDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const navigate = useNavigate();
  const isCancelable =
    event?.status === "approved" &&
    !["cancelled", "completed"].includes(event?.sub_status);

  useEffect(() => {
    setLoading(true);

    getEventApprovedDetail(id)
      .then((res) => setEvent(res.data))
      .catch(() => {
        getEventDeclinedDetail(id)
          .then((res) => setEvent(res.data))
          .catch(() => setEvent(null));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold">
            Event Information for ID: {event.event_id} ({event.sub_status})
          </h2>

          <Field label="Event Title">{event.title}</Field>
          <Field label="Event Host">{event.host_name}</Field>
          <Field label="Event Category">{event.category}</Field>
          <Field label="Location">{event.location}</Field>
          <Field label="Specific Location">{event.specific_address}</Field>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Address URL
            </label>
            <div className="border rounded-md px-3 py-2 bg-gray-100">
              <a
                href={event.address_link}
                target="_blank"
                rel="noreferrer noopener"
                className="underline break-all text-sm"
              >
                {event.address_link}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Start Date">{formatDate(event.start_date)}</Field>
            <Field label="End Date">{formatDate(event.end_date)}</Field>
            <Field label="Start Time">{event.start_time}</Field>
            <Field label="End Time">{event.end_time}</Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Maximum Participant">{event.max_participant}</Field>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">
                Event Cover
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-100 flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4"
                  />
                </svg>
                <a
                  href={event.cover_image}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline text-blue-600 text-sm"
                >
                  click here to preview image
                </a>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Event Description
            </label>
            <div className="border rounded-md p-3 bg-gray-100 whitespace-pre-wrap text-sm">
              {event.description}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Terms & Conditions
            </label>
            <div className="border rounded-md p-3 bg-gray-100 whitespace-pre-wrap text-sm">
              {event.terms}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Minimum Age">{event.min_age}</Field>
            <Field label="Maximum Age">{event.max_age}</Field>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Group Link
            </label>
            <div className="border rounded-md px-3 py-2 bg-gray-100">
              <a
                href={event.group_link}
                target="_blank"
                rel="noreferrer noopener"
                className="underline break-all text-sm"
              >
                {event.group_link}
              </a>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              disabled={!isCancelable}
              className={`px-6 py-2 rounded text-white ${
                isCancelable
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => setOpenCancelModal(true)}
            >
              Cancel Event
            </button>

            <button
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
          </div>

          <CancelEventPopUp
            open={openCancelModal}
            onClose={() => setOpenCancelModal(false)}
            onConfirm={async () => {
              try {
                await cancelEvent(event.event_id);
                setOpenCancelModal(false);
                // optional: redirect or refresh
                navigate(-1);
                // OR refetch event detail if you prefer
              } catch (error) {
                console.error("Failed to cancel event:", error);
                alert("Failed to cancel event. Please try again.");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewDetailPage;
