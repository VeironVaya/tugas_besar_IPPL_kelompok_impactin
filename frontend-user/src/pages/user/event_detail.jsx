import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import { getEventDetailAPI } from "../../api/event";

import { MapPin, Calendar, Clock, Users, TriangleAlert } from "lucide-react";

const EventDetailPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTerms, setShowTerms] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showJoinConfirm, setShowJoinConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [joined, setJoined] = useState(false);

  // ================= FETCH EVENT DETAIL =================
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventDetailAPI(id);

        setEvent({
          id: res.event_id,
          title: res.title,
          organizer: res.host_name,
          location: res.location,
          dateRange: `${new Date(
            res.start_date
          ).toLocaleDateString()} - ${new Date(
            res.end_date
          ).toLocaleDateString()}`,
          time: `${res.start_time} - ${res.end_time}`,
          ageGroup: `${res.min_age} - ${res.max_age} years`,
          imageUrl: res.cover_image || MOCK_CARD_IMAGE,
          description: res.description,
          termsAndConditions: res.terms,
          isHost: res.is_host,
          status: res.status,
        });

        setJoined(res.status !== "approved");
      } catch (err) {
        console.error(err);
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
        <div className="w-full px-6 lg:px-0 py-10 lg:py-0">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            {/* TOP */}
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  className="w-full h-[420px] object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>

              <div className="p-8 flex-1 relative">
                <span
                  onClick={() => setShowReport(true)}
                  className="absolute top-6 right-6 flex items-center gap-1
                             text-sm text-red-600 font-semibold bg-red-50
                             px-3 py-1 rounded-full cursor-pointer"
                >
                  <TriangleAlert className="w-4 h-4" /> Report Event
                </span>

                <h1 className="text-4xl font-extrabold text-gray-900 break-words">
                  {event.title}
                </h1>

                <p className="text-lg text-gray-600 font-medium mt-2 mb-8">
                  {event.organizer}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
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

                <button
                  onClick={() => setShowTerms(true)}
                  className="mt-8 px-4 py-2 text-sm font-semibold
                             text-green-700 border border-green-300 rounded-lg"
                >
                  Terms & Conditions
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="p-8 border-t">
              <h2 className="text-2xl font-extrabold mb-4">Description</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            {/* JOIN */}
            <div className="p-8 border-t flex justify-end">
              <button
                disabled={joined}
                onClick={() => setShowJoinConfirm(true)}
                className={`px-10 py-3 rounded-lg font-bold transition
                  ${
                    joined
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
              >
                {joined ? "WAITING FOR APPROVAL" : "JOIN EVENT"}
              </button>
            </div>
          </div>
        </div>

        {/* MODALS — TETAP */}
        {/* Terms */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-xl w-full">
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
      </main>

      <Footer />
    </>
  );
};

export default EventDetailPage;
