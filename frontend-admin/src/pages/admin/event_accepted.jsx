import React, { useMemo, useState } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm.jsx";
import TableOverview from "../../components/table_overview.jsx";

const mockEvents = [
  {
    id: "1",
    title: "BlueWave Coastal Restoration",
    status: "accepted",
  },
  {
    id: "2",
    title: "Urban Forest Revival",
    status: "not accepted",
  },
  {
    id: "3",
    title: "Solar Light Charity Run",
    status: "accepted",
  },
];

const AcceptedPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("accepted"); // default filter

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1️⃣ Filter by status first (same as sampleReport)
    const baseFiltered = mockEvents.filter(
      (e) => e.status.toLowerCase() === filter.toLowerCase()
    );

    // 2️⃣ If search is empty → return base list
    if (!q) return baseFiltered;

    // 3️⃣ Search inside filtered list
    return baseFiltered.filter(
      (e) =>
        String(e.id).toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q)
    );
  }, [query, filter]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <div className="text-sm text-gray-500">Total Events:</div>
                <div className="text-xl font-bold text-gray-900">
                  {filtered.length}
                  <span className="text-base font-medium text-gray-600">
                    {" "}Events
                  </span>
                </div>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold ml-40">
              <button
                onClick={() => setFilter("accepted")}
                className={`px-12 py-2 border-r border-gray-400 ${
                  filter === "accepted"
                    ? "bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Accepted
              </button>

              <button
                onClick={() => setFilter("not accepted")}
                className={`px-8 py-2 ${
                  filter === "not accepted"
                    ? "bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Not Accepted
              </button>
            </div>

            {/* Search */}
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

          {/* Table Header */}
          <div className="bg-gray-600 text-white py-4 px-6 grid grid-cols-[180px_1fr_200px] items-center">
            <div className="font-semibold">ID Event</div>
            <div className="text-center font-semibold">Event Name</div>
            <div></div>
          </div>

          {/* Table Content */}
          <div className="divide-y">
            {filtered.length > 0 ? (
              filtered.map((event) => (
                <TableOverview
                  key={event.id}
                  eventId={event.id}
                  eventTitle={event.title}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                {filter === "accepted"
                  ? "There are no accepted events"
                  : "There are no events that were not accepted"}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AcceptedPage;
