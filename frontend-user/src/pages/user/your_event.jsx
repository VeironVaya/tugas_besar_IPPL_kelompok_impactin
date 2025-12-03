// src/pages/user/your_event.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/navbar.jsx";

const YourEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menu, setMenu] = useState("joined"); // joined | created
  const [filter, setFilter] = useState("all");

  // Dummy data – nanti diganti API
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
  ];

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

        {/* Sidebar */}
        <div className="col-span-3 bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-bold text-lg mb-4">Joined Event</h2>

          <ul className="space-y-2 mb-6">
            {["all", "ongoing", "upcoming", "completed", "cancelled"].map((i) => (
              <li
                key={i}
                className={`cursor-pointer ${
                  filter === i ? "font-bold text-green-600" : "text-gray-600"
                }`}
                onClick={() => {
                  setMenu("joined");
                  setFilter(i);
                }}
              >
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </li>
            ))}
          </ul>

          <h2 className="font-bold text-lg mb-4">Created Event</h2>

          <ul className="space-y-2">
            {["approved", "pending", "not-approved", "cancelled"].map((i) => (
              <li
                key={i}
                className={`cursor-pointer ${
                  filter === i ? "font-bold text-green-600" : "text-gray-600"
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

        {/* Content */}
        <div className="col-span-9 space-y-6">
          {(menu === "joined" ? joinedEvents : createdEvents).map((event) => (
            <div
              key={event.slug}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{event.organizer}</h3>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-gray-700">{event.slug.replace(/-/g, " ")}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">{event.date}</p>

                <button
                  className="px-4 py-2 bg-green-700 text-white rounded-lg mt-3"
                  onClick={() =>
                    handleView(event.slug, menu === "created")
                  }
                >
                  {menu === "created" ? "Manage Event" : "View Details"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
  );
};

export default YourEventPage;
