import React, { useMemo, useState, useRef, useEffect } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm";
import TableApproval from "../../components/table_approval";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

const sampleEvents = [
  { id: "1", title: "DeepBlue Movement" },
];

const ApprovalPage = () => {
  const [query, setQuery] = useState("");
  const [firstHeaderHeight, setFirstHeaderHeight] = useState(0);
  const firstHeaderRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleEvents;

    return sampleEvents.filter(
      (e) =>
        String(e.id).toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (firstHeaderRef.current) {
      setFirstHeaderHeight(firstHeaderRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg">

          {/* First sticky header */}
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

          {/* Table header (sticky below first header) */}
          <div
            className="sticky z-30 bg-gray-600 text-white py-4 px-6 grid grid-cols-[180px_1fr_200px] items-center"
            style={{ top: 64 + firstHeaderHeight }}
          >
            <div className="font-semibold">ID Event</div>
            <div className="text-center font-semibold">Event Name</div>
            <div></div>
          </div>

          <div>
            {filtered.length > 0 ? (
              filtered.map((ev) => (
                <TableApproval
                  key={ev.id}
                  eventId={ev.id}
                  eventTitle={ev.title}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                No events waiting for approval.
              </div>
            )}
          </div>

          <div className="h-6" />
        </div>
      </main>
    </div>
  );
};

export default ApprovalPage;
