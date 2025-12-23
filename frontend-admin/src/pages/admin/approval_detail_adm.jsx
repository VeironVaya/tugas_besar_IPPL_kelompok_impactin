import React, { useState } from "react";
import AdminNavbar from "../../components/navbar_adm";
import { useParams } from "react-router-dom";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";



const sampleEvents = [
  {
      id: "1",
      title: "DeepBlue Movement",
      host: "ipan",
      category: "Ekosistem Laut",
      location: "Yogyakarta, Indonesia",
      specific: "The Legend of Blue Sea",
      address: "The Legend of Blue Sea",
      addressUrl: "https://maps.app.goo.gl/srGVs65T4DmvcwPV8",
      startDate: "18 September 2025",
      endDate: "23 September 2025",
      startTime: "09.00",
      endTime: "14.00",
      maxParticipant: 100,
      coverFileName: MOCK_CARD_IMAGE,
      description: "The DeepBlue Movement is a collective call to action aimed at maintaining the health and sustainability of Indonesia's marine ecosystems. This event invites all volunteers, divers, communities, and concerned individuals to get directly involved in conservation efforts across our coastal and aquatic areas.",
      terms: `bisa berenang`,
      minAge: 17,
      maxAge: 0,
      groupLink: "https://chat.whatsapp.com/DmGBacX2CPNYRU?mode=wwc",
    }
];

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="border rounded-md px-3 py-2 bg-gray-100 text-gray-800 min-h-[40px] leading-relaxed">
      {children}
    </div>
  </div>
);

const ApprovalDetailPage = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "accept" | "reject"

  const openConfirm = (type) => {
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (actionType === "accept") {
      console.log("Event accepted:", event.id);
      // TODO: API accept logic
    } else {
      console.log("Event rejected:", event.id);
      // TODO: API reject logic
    }
    setConfirmOpen(false);
  };

  const { id } = useParams();
  const event = sampleEvents.find((e) => e.id === String(id));

  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-5xl mx-auto">

          <h2 className="text-lg font-semibold">Event Information for ID: {event.id}</h2>

          {/* Title */}
          <Field label="Event Title">{event.title}</Field>

          {/* Host */}
          <Field label="Event Host">{event.host}</Field>

          {/* Category */}
          <Field label="Event Category">{event.category}</Field>

          {/* Location + Specific Location */}
            <Field label="Location">{event.location}</Field>
            <Field label="Specific Location">{event.specific}</Field>

          {/* Group Link */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Address URL</label>
            <div className="border rounded-md px-3 py-2 bg-gray-100">
              <a
                href={event.addressUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline break-all text-sm"
              >
                {event.addressUrl}
              </a>
            </div>
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Event Start Date">{event.startDate}</Field>
            <Field label="Event End Date">{event.endDate}</Field>
            <Field label="Event Start Time">{event.startTime}</Field>
            <Field label="Event End Time">{event.endTime}</Field>
          </div>

          {/* Max Participant + Cover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Maximum Participant">{event.maxParticipant}</Field>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Event Cover</label>
              <div className="border rounded-md px-3 py-2 bg-gray-100 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4" />
                </svg>
                <a
                  href={MOCK_CARD_IMAGE}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline text-blue-600 text-sm"
                >
                  click to preview image
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Event Description</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {event.description}
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Terms & Conditions</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {event.terms}
            </div>
          </div>

          {/* Ages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Minimum Age">{event.minAge}</Field>
            <Field label="Maximum Age">{event.maxAge}</Field>
          </div>

          {/* Group Link */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Group Link</label>
            <div className="border rounded-md px-3 py-2 bg-gray-100">
              <a
                href={event.groupLink}
                target="_blank"
                rel="noreferrer noopener"
                className="underline break-all text-sm"
              >
                {event.groupLink}
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => openConfirm("accept")}
              className="px-6 py-2 rounded bg-green-600 text-white"
            >
              Accept
            </button>

            <button
              onClick={() => openConfirm("reject")}
              className="px-6 py-2 rounded bg-red-600 text-white"
            >
              Reject
            </button>
          </div>
          {confirmOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
              <h3 className="text-lg font-semibold mb-3">
                Confirm {actionType === "accept" ? "Acceptance" : "Rejection"}
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to{" "}
                <span className="font-semibold">
                  {actionType === "accept" ? "accept" : "reject"}
                </span>{" "}
                this event?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 rounded border text-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 rounded text-white ${
                    actionType === "accept"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalDetailPage;