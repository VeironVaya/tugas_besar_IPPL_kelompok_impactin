import { useParams } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import React, { useState } from "react";
import { MapPin, Calendar, Clock, Users, TriangleAlert } from "lucide-react";

const dummyEventDetails = {
  id: 1,
  title: "DeepBlue Movement",
  organizer: "Sea Care Indonesia",
  location: "Yogyakarta, Indonesia",
  dateRange: "18-23 September 2025",
  time: "09.00-14.00 WIB",
  ageGroup: "All Age",
  imageUrl: MOCK_CARD_IMAGE,
  description: `The DeepBlue Movement is a collective call to action aimed at maintaining the health and sustainability of Indonesia's marine ecosystems. This event invites all volunteers, divers, communities, and concerned individuals to get directly involved in conservation efforts across our coastal and aquatic areas.`,
  termsAndConditions: `T & C applies. Read more here.`,
};

const EventDetailPage = () => {
  const { slug } = useParams();
  const [showTerms, setShowTerms] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showJoinConfirm, setShowJoinConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [joined, setJoined] = useState(false);

  const event = dummyEventDetails;

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-10 text-center text-xl bg-white rounded-lg shadow-md">
          Event <span className="font-bold text-red-700">'{slug}'</span> tidak
          ditemukan.
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">

        {/* Event Detail Container */}
        <div className="w-full px-6 lg:px-0 py-10 lg:py-0">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            {/* TOP: Image + Info */}
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>

              {/* Info */}
              <div className="p-8 flex-1 relative">
                {/* Report Badge */}
                <span
                  onClick={() => setShowReport(true)}
                  className="absolute top-6 right-6 flex items-center gap-1 text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full cursor-pointer hover:bg-red-100 transition"
                >
                  <TriangleAlert className="w-4 h-4" /> Report Event
                </span>

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  {event.title}
                </h1>

                {/* Organizer */}
                <p className="text-lg text-gray-600 font-medium mt-2 mb-8">
                  {event.organizer}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700 text-base">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-700" />
                    <span>
                      {event.location},{" "}
                      <span className="font-semibold">
                        {event.fullLocation}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-700" />
                    <span>{event.dateRange}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-700" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-700" />
                    <span>
                      Age:{" "}
                      <span className="font-semibold">{event.ageGroup}</span>
                    </span>
                  </div>
                </div>

                {/* Terms & Conditions Button */}
                <button
                  onClick={() => setShowTerms(true)}
                  className="mt-8 inline-block px-4 py-2 text-sm font-semibold text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition"
                >
                  Terms & Conditions
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-8 border-t border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Join Event Button */}
            <div className="p-8 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowJoinConfirm(true)}
                disabled={joined}
                className={`py-3 px-10 rounded-lg font-bold shadow-md transition duration-300
    ${
      joined
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-700 hover:bg-green-800 text-white"
    }
  `}
              >
                {joined ? "WAITING FOR APPROVAL" : "JOIN EVENT"}
              </button>
            </div>
          </div>
        </div>
        {/* TERMS MODAL */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {event.termsAndConditions}
              </p>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-6 px-6 py-2 rounded-lg bg-green-600 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showReport && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl border-4 border-green-900 px-8 py-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowReport(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold mb-3">Report Event</h2>
              <p className="text-gray-700 mb-4">
                Tell us your reason for reporting this event
              </p>

              {/* Textarea */}
              <textarea
                value={reportText}
                onChange={(e) => {
                  setReportText(e.target.value);
                  setErrorMsg(""); // clear error when typing
                }}
                placeholder="Eg: false information, wrong details, inappropriate content..."
                className="w-full h-64 border border-gray-400 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-green-700 outline-none"
              />

              {/* Error message RIGHT under textarea */}
              {errorMsg && (
                <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
              )}

              {/* Submit Button */}
              <div className="flex justify-end mt-5">
                <button
                  onClick={() => {
                    if (!reportText.trim()) {
                      setErrorMsg("Please fill your report.");
                      return;
                    }

                    setErrorMsg("");
                    console.log("Report submitted:", reportText);

                    setShowReport(false);
                    setReportText("");
                    setShowSuccess(true);

                    // Auto hide notification
                    setTimeout(() => setShowSuccess(false), 3000);
                  }}
                  className="bg-green-800 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-900 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Thank you for your reporting!
          </div>
        )}

        {/* JOIN CONFIRMATION MODAL */}
        {showJoinConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-xl px-8 py-6 relative">
              {/* Close */}
              <button
                onClick={() => {
                  setShowJoinConfirm(false);
                  setAgreed(false);
                }}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-3">Before You Join</h2>
              <p className="text-gray-700 mb-4">
                Please read the recruitment details and terms & conditions
                before joining this event.
              </p>

              {/* Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="w-4 h-4"
                />
                <span className="text-gray-800 text-sm">
                  I have read and agree to all event terms & conditions.
                </span>
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowJoinConfirm(false);
                    setAgreed(false);
                  }}
                  className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  disabled={!agreed}
                  onClick={() => {
                    setShowJoinConfirm(false);
                    setJoined(true);
                    setAgreed(false);
                  }}
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition
            ${
              agreed
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default EventDetailPage;
