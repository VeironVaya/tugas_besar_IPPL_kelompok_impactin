import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import { getEventDetailAPI, reportEventAPI } from "../../api/event";

import { MapPin, Calendar, Clock, Users, TriangleAlert } from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [joined, setJoined] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // 🔴 REPORT STATE
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  /* ================= FORMAT AGE ================= */
  const formatAgeRange = (minAge, maxAge) => {
    if (minAge === 0 && maxAge === 0) return "All Age";
    if (minAge === 0 && maxAge > 0) return `Below ${maxAge + 1} years`;
    if (minAge > 0 && maxAge === 0) return `Above ${minAge - 1} years`;
    if (minAge === maxAge) return `${minAge} years`;
    return `${minAge} - ${maxAge} years`;
  };

  /* ================= FORMAT DATE ================= */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventDetailAPI(id);

        setEvent({
          id: res.event_id,
          title: res.title,
          organizer: res.host_name,
          location: res.location,

          dateRange: `${formatDate(res.start_date)} - ${formatDate(
            res.end_date
          )}`,
          time: `${res.start_time} - ${res.end_time}`,
          ageGroup: formatAgeRange(res.min_age, res.max_age),

          imageUrl: res.cover_image || MOCK_CARD_IMAGE,
          description: res.description,
          termsAndConditions: res.terms,

          // 🔑 FLAG BARU
          isHost: res.is_host,
          isApplicant: res.is_applicant,
          isParticipant: res.is_participant,

          // 🔗 GROUP LINK
          groupLink: res.group_link,

          status: res.status,
          subStatus: res.sub_status,
        });

        setJoined(
          res.is_host === true ||
            res.status === "pending" ||
            res.status === "approved"
        );
      } catch (err) {
        console.error("Fetch event detail failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Event not found
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <div className="w-full px-6 py-10">
          <div className="bg-white rounded-xl overflow-hidden border relative">
            {/* 🔴 REPORT BUTTON */}
            {!event.isHost && (
              <button
                onClick={() => setShowReport(true)}
                className="absolute top-6 right-6 flex items-center gap-2
                           text-sm text-red-600 font-semibold bg-red-50
                           px-3 py-1 rounded-full hover:bg-red-100"
              >
                <TriangleAlert className="w-4 h-4" />
                Report Event
              </button>
            )}

            {/* TOP */}
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-[420px] object-cover"
                />
              </div>

              <div className="p-8 flex-1">
                <h1 className="text-4xl font-extrabold">{event.title}</h1>
                <p className="text-lg text-gray-600 mt-2 mb-8">
                  {event.organizer}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-700" />
                    <span>{event.location}</span>
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
                    <span>{event.ageGroup}</span>
                  </div>
                </div>

                {event.isParticipant && event.groupLink && (
                  <div className="mt-6">
                    <label className="text-xs font-semibold text-gray-600">
                      Group Link
                    </label>
                    <div className="border rounded-md px-3 py-2 bg-gray-100">
                      <a
                        href={event.groupLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline break-all text-sm text-green-700 hover:text-green-900"
                      >
                        {event.groupLink}
                      </a>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowTerms(true)}
                  className="mt-8 px-4 py-2 border rounded-lg text-green-700"
                >
                  Terms & Conditions
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="p-8 border-t">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p>{event.description}</p>
            </div>
          </div>
        </div>

        {/* JOIN */}
        <div className="p-8 flex justify-end">
          <button
            disabled={joined}
            className={`px-10 py-3 rounded-lg font-bold transition
              ${
                joined
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
          >
            {event.isHost
              ? "YOU ARE THE HOST"
              : event.status === "pending"
              ? "WAITING FOR APPROVAL"
              : event.status === "approved"
              ? "JOINED"
              : "JOIN EVENT"}
          </button>
        </div>

        {/* TERMS MODAL */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-xl">
              <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
              <p className="whitespace-pre-line">{event.termsAndConditions}</p>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* REPORT MODAL */}
        {showReport && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold text-red-600 mb-4">
                Report Event
              </h2>

              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Explain why you are reporting this event..."
                className="w-full border rounded-lg p-3 h-32 resize-none"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setShowReport(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  disabled={reportLoading || !reportReason.trim()}
                  onClick={async () => {
                    try {
                      setReportLoading(true);
                      await reportEventAPI(event.id, reportReason);
                      alert("Event reported successfully ✅");
                      setShowReport(false);
                      setReportReason("");
                    } catch (err) {
                      alert(
                        err.response?.data?.message || "Failed to report event"
                      );
                    } finally {
                      setReportLoading(false);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-white
                    ${
                      reportLoading || !reportReason.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {reportLoading ? "Reporting..." : "Report"}
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
