import React, { useMemo, useState, useRef, useEffect } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm.jsx";
import TableOverview from "../../components/table_overview.jsx";

const mockEvents = [
  { id: "1", title: "BlueWave Coastal Restoration", status: "approved" },
  { id: "2", title: "Urban Forest Revival", status: "declined" },
];

const AcceptedPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("approved");
  const [firstHeaderHeight, setFirstHeaderHeight] = useState(0);
  const firstHeaderRef = useRef(null);

  // FILTER + SEARCH LOGIC
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const baseFiltered = mockEvents.filter(
      (e) => e.status.toLowerCase() === filter.toLowerCase()
    );

    if (!q) return baseFiltered;

    return baseFiltered.filter(
      (e) =>
        String(e.id).toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q)
    );
  }, [query, filter]);

  // measure header height on mount and on resize
  useEffect(() => {
    const measure = () => {
      if (firstHeaderRef.current) {
        setFirstHeaderHeight(firstHeaderRef.current.offsetHeight || 0);
      }
    };

    measure(); // initial
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ensure top is a number (navbar assumed 64px height)
  const navbarHeight = 64;
  const topOffset = navbarHeight + (Number(firstHeaderHeight) || 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        {/* removed overflow-hidden so sticky works correctly */}
        <div className="bg-white rounded-xl shadow-lg">

          {/* FIRST STICKY HEADER */}
          <div
            ref={firstHeaderRef}
            className="sticky top-[64px] z-40 bg-white flex items-center justify-between px-8 py-6 border-b"
          >
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

            {/* FILTER BUTTONS */}
            <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold ml-40">
              <button
                onClick={() => setFilter("approved")}
                className={`px-12 py-2 border-r border-gray-400 ${
                  filter === "approved"
                    ? "bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Approved
              </button>

              <button
                onClick={() => setFilter("declined")}
                className={`px-12 py-2 ${
                  filter === "declined"
                    ? "bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Declined
              </button>
            </div>

            {/* SEARCH */}
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

          {/* SECOND STICKY TABLE HEADER */}
          <div
            className="sticky z-30 bg-gray-600 text-white py-4 px-6 grid grid-cols-[180px_1fr_200px] items-center"
            style={{ top: topOffset }}
          >
            <div className="font-semibold">ID Event</div>
            <div className="text-center font-semibold">Event Name</div>
            <div></div>
          </div>

          {/* TABLE CONTENT */}
          <div>
            {filtered.length > 0 ? (
              filtered.map((event, idx) => (
                <TableOverview
                  key={event.id ?? idx} // event.id is unique in mockEvents above
                  eventId={event.id}
                  eventTitle={event.title}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                {filter === "approved"
                  ? "There are no approved events"
                  : "There are no events that were declined"}
              </div>
            )}
          </div>

          <div className="h-6" />
        </div>
      </main>
    </div>
  );
};

export default AcceptedPage;
