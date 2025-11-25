import React, { useMemo, useState } from "react";
import { Users, Search } from "lucide-react";
import AdminNavbar from "../../components/navbar_adm";
import TableReport from "../../components/table_report";

const sampleReport = [
   {
    reportId: "1",
    reportDate: "17/10/2025",
    reporterName: "Ipan",
    status: "pending"
  },
  {
    reportId: "2",
    reportDate: "17/10/2025",
    reporterName: "veiron",
    status: "resolved"
  },
  {
    reportId: "3",
    reportDate: "17/10/2025",
    reporterName: "Bila",
    status: "pending"
  },
  {
    reportId: "4",
    reportDate: "17/10/2025",
    reporterName: "Gavin",
    status: "pending"
  } 
];

const ReportedPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("pending"); // NEW STATE

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    const baseFiltered = sampleReport.filter((e) => e.status === filter);

    if (!q) return baseFiltered;

    return baseFiltered.filter(
      (e) =>
        e.reportId.toLowerCase().includes(q) ||
        e.reportDate.toLowerCase().includes(q) ||
        e.reporterName.toLowerCase().includes(q)
    );
  }, [query, filter]);

  const onDetails = (reportId) => {
    alert(`See details for ${reportId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <main className="max-w-[1500px] mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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

            {/* PENDING / RESOLVED BUTTON */}
            <div className="flex border border-gray-400 rounded-md overflow-hidden text-sm font-semibold ml-40">
              <button
                onClick={() => setFilter("pending")}
                className={`px-10 py-2 border-r border-gray-400
                ${filter === "pending"
                    ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                Pending
              </button>

              <button
                onClick={() => setFilter("resolved")}
                className={`px-10 py-2 
                ${filter === "resolved"
                    ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                Resolved
              </button>
            </div>

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

          {/* TABLE HEADER */}
          <div className="px-0 pt-0 pb-0">
            <div className="bg-gray-600 text-white py-4 px-6 rounded-md grid grid-cols-[180px_1fr_200px] items-center">
              <div className="font-semibold">Report Date</div>
              <div className="text-center font-semibold">Reporter Name</div>
              <div className="text-right font-semibold"> </div>
            </div>
          </div>

          {/* TABLE LIST */}
          <div className="divide-y">
            {filtered.length > 0 ? (
              filtered.map((rep) => (
                <TableReport
                  key={rep.reportId}
                  reportId={rep.reportId}
                  reportDate={rep.reportDate}
                  reporterName={rep.reporterName}
                  onDetails={onDetails}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm">
                {filter === "pending"
                  ? "There are no pending report"
                  : "There are no resolved report"}
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
