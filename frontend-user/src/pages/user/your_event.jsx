import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";

const YourEventPage = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState("joined"); // joined | created
  const [filter, setFilter] = useState("approved");

  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= DUMMY JOINED EVENTS ================= */
  const joinedEvents = [
    {
      id: 1,
      title: "The Legend of Blue Sea",
      organizer: "Yayasan Laut Hijau",
      location: "Yogyakarta, Indonesia",
      date: "April 2025",
    },
  ];

  /* ================= FETCH CREATED EVENTS ================= */
  const fetchCreatedEvents = async (filterValue) => {
    try {
      setLoading(true);

      // completed = approved + sub_status completed
      const apiStatus = filterValue === "completed" ? "approved" : filterValue;

      const res = await api.get("/user/events/your", {
        params: { status: apiStatus },
      });

      let mapped =
        res.data?.data?.map((e) => ({
          id: e.event_id,
          title: e.title,
          organizer: e.host_name,
          location: e.location,
          date: new Date(e.start_date).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          }),
          status: e.status,
          subStatus: e.sub_status, // ⬅️ PENTING
        })) || [];

      // FRONTEND FILTERING FOR COMPLETED
      if (filterValue === "completed") {
        mapped = mapped.filter((e) => e.subStatus === "completed");
      }

      // APPROVED TAPI BUKAN COMPLETED
      if (filterValue === "approved") {
        mapped = mapped.filter((e) => e.subStatus !== "completed");
      }

      setCreatedEvents(mapped);
    } catch (err) {
      console.error("Failed to fetch created events:", err);
      setCreatedEvents([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    if (menu === "created") {
      fetchCreatedEvents(filter);
    }
  }, [menu, filter]);

  /* ================= DISPLAYED EVENTS ================= */
  const displayedEvents = menu === "joined" ? joinedEvents : createdEvents;

  /* ================= HANDLER ================= */
  const handleView = (id, isHost) => {
    if (isHost) {
      navigate(`/manage-event/${id}`);
    } else {
      navigate(`/event/${id}`);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
          {/* ================= SIDEBAR ================= */}
          <div className="col-span-12 md:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h2 className="font-bold text-lg mb-4">Joined Event</h2>

            <ul className="space-y-2 mb-6">
              {["all", "ongoing", "upcoming", "completed", "cancelled"].map(
                (i) => (
                  <li
                    key={i}
                    className="cursor-pointer text-gray-600 hover:text-green-600"
                    onClick={() => {
                      setMenu("joined");
                      setFilter("all");
                    }}
                  >
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </li>
                )
              )}
            </ul>

            <h2 className="font-bold text-lg mb-4">Created Event</h2>

            <ul className="space-y-2">
              {[
                "approved",
                "pending",
                "cancelled",
                "declined",
                "completed",
              ].map((i) => (
                <li
                  key={i}
                  className={`cursor-pointer transition ${
                    menu === "created" && filter === i
                      ? "font-bold text-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                  onClick={() => {
                    setMenu("created");
                    setFilter(i);
                  }}
                >
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {loading && (
              <div className="bg-white p-10 rounded-xl shadow text-center">
                Loading event...
              </div>
            )}

            {!loading && displayedEvents.length === 0 && (
              <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                Tidak ada event untuk kategori ini
              </div>
            )}

            {!loading &&
              displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
                >
                  {/* INFO */}
                  <div>
                    <h3 className="font-bold text-lg">{event.organizer}</h3>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-700 capitalize">{event.title}</p>

                    {menu === "created" && (
                      <span
                        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                          event.subStatus === "completed"
                            ? "bg-gray-200 text-gray-700"
                            : event.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : event.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {event.subStatus === "completed"
                          ? "completed"
                          : event.status}
                      </span>
                    )}
                  </div>

                  {/* ACTION */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{event.date}</p>

                    {menu === "created" &&
                      event.status === "approved" &&
                      event.subStatus !== "completed" && (
                        <button
                          className="px-4 py-2 bg-green-700 text-white rounded-lg mt-3"
                          onClick={() => handleView(event.id, true)}
                        >
                          Manage Event
                        </button>
                      )}

                    {menu === "created" && event.subStatus === "completed" && (
                      <p className="mt-3 text-sm text-gray-400 italic">
                        Event telah selesai
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default YourEventPage;
