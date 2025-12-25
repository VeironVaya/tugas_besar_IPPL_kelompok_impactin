import React, { useMemo, useState, useRef, useEffect } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm";
import TableReport from "../../components/table_report";
import { getReports } from "../../api/report";


const ReportedPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("pending");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);


  const [firstHeaderHeight, setFirstHeaderHeight] = useState(0);
  const firstHeaderRef = useRef(null);

  // FILTER + SEARCH
  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return reports;

  return reports.filter(
    (e) =>
      e.reportId.toLowerCase().includes(q) ||
      e.reportDate.toLowerCase().includes(q) ||
      e.reporterName.toLowerCase().includes(q)
  );
}, [query, reports]);


  // MEASURE FIRST HEADER HEIGHT
  useEffect(() => {
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await getReports(filter);

      // Map backend → frontend shape
      const mapped = res.data.events.map((r) => ({
        reportId: String(r.report_id),
        reportDate: new Date(r.reported_date).toLocaleDateString("id-ID"),
        reporterName: r.reporter_name,
      }));

      setReports(mapped);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  fetchReports();
}, [filter]);


  const navbarHeight = 64;
  const topOffset = navbarHeight + (Number(firstHeaderHeight) || 0);

  const onDetails = (reportId) => {
    alert(`See details for ${reportId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        {/* MUST NOT HAVE overflow-hidden */}
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
                <div className="text-sm text-gray-500">Total Report:</div>
                <div className="text-xl font-bold text-gray-900">
                  {filtered.length}
                  <span className="text-base font-medium text-gray-600"> Reports</span>
                </div>
              </div>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold ml-40">
              <button
                onClick={() => setFilter("pending")}
                className={`px-10 py-2 border-r border-gray-400 ${
                  filter === "pending" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>

              <button
                onClick={() => setFilter("resolved")}
                className={`px-10 py-2 ${
                  filter === "resolved" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Resolved
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
                  placeholder="Search"
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
            <div className="font-semibold">Report Date</div>
            <div className="text-center font-semibold">Reporter Name</div>
            <div></div>
          </div>

          {/* TABLE ROWS */}
          <div>
            {loading ? (
            <div className="py-10 text-center text-gray-500 text-sm">
              Loading reports...
            </div>
          ) : filtered.length > 0 ? (
              filtered.map((rep, idx) => (
                <TableReport
                  key={rep.reportId ?? idx}
                  reportId={rep.reportId}
                  reportDate={rep.reportDate}
                  reporterName={rep.reporterName}
                  onDetails={onDetails}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                {filter === "pending"
                  ? "There are no pending reports"
                  : "There are no resolved reports"}
              </div>
            )}
          </div>

          <div className="h-6" />
        </div>
      </main>
    </div>
  );
};

export default ReportedPage;
