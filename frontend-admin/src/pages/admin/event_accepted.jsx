import React, { useMemo, useState, useRef, useEffect } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm.jsx";
import TableOverview from "../../components/table_overview.jsx";
import api from "../../api/api"; // import axios instance

const AcceptedPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("approved");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstHeaderHeight, setFirstHeaderHeight] = useState(0);
  const firstHeaderRef = useRef(null);

  // Fetch events when filter changes
  useEffect(() => {
    setLoading(true);
    api.get(`/admin/events?status=${filter}`)
      .then((res) => {
        // Make sure it's always an array
        setEvents(res.data?.events || []);
      })
      .catch((err) => {
        console.error(err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [filter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (e) =>
        String(e.event_id).toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q)
    );
  }, [query, events]);

  // measure header height on mount and resize
  useEffect(() => {
    const measure = () => {
      if (firstHeaderRef.current) {
        setFirstHeaderHeight(firstHeaderRef.current.offsetHeight || 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navbarHeight = 64;
  const topOffset = navbarHeight + (Number(firstHeaderHeight) || 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 py-8">
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
                <div className="text-sm text-gray-500">Total Event:</div>
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
            {loading ? (
              <div className="py-10 text-center text-gray-500 text-sm">
                Loading events...
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((event, idx) => (
                <TableOverview
                  key={event.event_id ?? idx}
                  eventId={event.event_id}
                  eventTitle={event.title}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                {filter === "approved"
                  ? "There are no approved events"
                  : "There are no declined events"}
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
