import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";

const YourEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menu, setMenu] = useState("joined"); // joined | created
  const [filter, setFilter] = useState("all");

  /* ================= DUMMY DATA ================= */
  const joinedEvents = [
    {
      slug: "the-legend-of-blue-sea",
      organizer: "Yayasan Laut Hijau",
      location: "Yogyakarta, Indonesia",
      date: "April, 2025",
    },
  ];

  const createdEvents = [
    {
      slug: "the-legend-of-blue-sea",
      organizer: "Yayasan Laut Hijau",
      location: "Yogyakarta, Indonesia",
      date: "April, 2025",
      status: "approved",
    },
    {
      slug: "coastal-cleanup",
      organizer: "Eco Wave",
      location: "Bali, Indonesia",
      date: "Mei, 2025",
      status: "pending",
    },
    {
      slug: "mangrove-restoration",
      organizer: "Green Action",
      location: "Jakarta, Indonesia",
      date: "Juni, 2025",
      status: "not-approved",
    },
  ];

  /* ================= FILTERED EVENTS ================= */
  const displayedEvents =
    menu === "joined"
      ? joinedEvents
      : createdEvents.filter((e) =>
          filter === "all" ? true : e.status === filter
        );

  /* ================= HANDLER ================= */
  const handleView = (slug, isHost) => {
    if (isHost) {
      navigate(`/manage-event/${slug}`);
    } else {
      navigate(`/event/${slug}`);
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
                    className={`cursor-pointer transition ${
                      menu === "joined" && filter === i
                        ? "font-bold text-green-600"
                        : "text-gray-600 hover:text-green-600"
                    }`}
                    onClick={() => {
                      setMenu("joined");
                      setFilter(i);
                    }}
                  >
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </li>
                )
              )}
            </ul>

            <h2 className="font-bold text-lg mb-4">Created Event</h2>

            <ul className="space-y-2">
              {["approved", "pending", "not-approved", "cancelled"].map((i) => (
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
                  {i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {displayedEvents.length === 0 && (
              <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                Tidak ada event untuk kategori ini
              </div>
            )}

            {displayedEvents.map((event) => (
              <div
                key={event.slug}
                className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
              >
                {/* INFO */}
                <div>
                  <h3 className="font-bold text-lg">{event.organizer}</h3>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-gray-700 capitalize">
                    {event.slug.replace(/-/g, " ")}
                  </p>

                  {/* STATUS BADGE (CREATED ONLY) */}
                  {menu === "created" && (
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                        ${
                          event.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : event.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {event.status.replace("-", " ")}
                    </span>
                  )}
                </div>

                {/* ACTION */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">{event.date}</p>

                  {/* JOINED → VIEW */}
                  {menu === "joined" && (
                    <button
                      className="px-4 py-2 bg-green-700 text-white rounded-lg mt-3"
                      onClick={() => handleView(event.slug, false)}
                    >
                      View Details
                    </button>
                  )}

                  {/* CREATED + APPROVED → MANAGE */}
                  {menu === "created" && event.status === "approved" && (
                    <button
                      className="px-4 py-2 bg-green-700 text-white rounded-lg mt-3"
                      onClick={() => handleView(event.slug, true)}
                    >
                      Manage Event
                    </button>
                  )}

                  {/* CREATED BUT NOT APPROVED */}
                  {menu === "created" && event.status !== "approved" && (
                    <p className="mt-3 text-sm text-gray-400 italic">
                      Event belum disetujui
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
