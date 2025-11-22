import React, { useMemo, useState } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm.jsx";
import EventCard from "../../components/event_card.jsx";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

 const mockEvents = [
  /*{
    id: 1,
    title: "DeepBlue Movement",
    date: "SEP 18",
    location: "Yogyakarta Indonesia",
    organizer: "Sea Care Indonesia",
    imageUrl: MOCK_CARD_IMAGE,
    category: "LAUT",
  },
  {
    id: 2,
    title: "Ocean Cleanup",
    date: "OCT 05",
    location: "Bali Indonesia",
    organizer: "CleanSea Org",
    imageUrl: MOCK_CARD_IMAGE,
    category: "LAUT",
  },
  {
    id: 3,
    title: "Mangrove Planting",
    date: "NOV 12",
    location: "Jakarta Indonesia",
    organizer: "GreenAction",
    imageUrl: MOCK_CARD_IMAGE,
    category: "HIJAU",
  },
  {
    id: 4,
    title: "Beach Awareness",
    date: "DEC 01",
    location: "Lombok Indonesia",
    organizer: "EcoWave",
    imageUrl: MOCK_CARD_IMAGE,
    category: "EDUKASI",
  }, */
]; 

const AcceptedPage = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockEvents;
    return mockEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        {/* White rounded card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Top row: total + search*/}
          <div className="flex items-center justify-between px-8 py-6 border-b">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <div className="text-sm text-gray-500">Total Event:</div>
                <div className="text-xl font-bold text-gray-900">
                  {filtered.length}{" "}
                  <span className="text-base font-medium text-gray-600">
                    Events
                  </span>
                </div>
              </div>
            </div>

            <div className="w-72">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Event"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8">
            {filtered.length === 0 ? (
              <div className="col-span-2 text-center py-20 text-gray-500 text-lg">
                No events found.
              </div>
                ) : (
              filtered.map((event) => (
                <EventCard key={event.id} {...event} />
              ))
            )}
          </div>
          <div className="h-6" />
        </div>
      </main>
    </div>
  );
};

export default AcceptedPage;
