import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbar_adm";
import CancelEventPopUp from "../../components/cancel_event.jsx";

const sampleReports = [
  {
    id: "1",
    reporter: "Ipan",
    date: "17/10/2025",
    eventId: "10337320",
    eventName: "DeepBlue Movement",
    creator: "Sea Care Indonesia",
    description:
      "event palsu saya dan beberapa participiant sudah datang ke tempat lalu tidak ada satupun dari pihak penyelenggara yang datang",
    status: "pending",
  },
  {
    id: "2",
    reporter: "Veiron",
    date: "17/10/2025",
    eventId: "10337320",
    eventName: "DeepBlue Movement",
    creator: "Sea Care Indonesia",
    description:
      "Event palsu. Saya dan beberapa participant sudah datang ke tempat sesuai jadwal, namun setelah menunggu hampir satu jam, tidak ada satupun dari pihak penyelenggara yang muncul atau memberikan informasi. Kami mencoba menghubungi kontak yang tertera di poster, tetapi nomor tersebut tidak aktif. Beberapa peserta lain juga terlihat bingung dan akhirnya pulang begitu saja. Hal ini sangat mengecewakan karena kami sudah meluangkan waktu dan biaya untuk hadir. Mohon agar pihak Impactin dapat menindaklanjuti dan melakukan verifikasi terhadap penyelenggara agar kejadian serupa tidak terjadi lagi di masa mendatang.event palsu saya dan beberapa participiant sudah datang ke tempat lalu tidak ada satupun dari pihak penyelenggara yang datang",
    status: "resolved",
    resolvedOn: "18/10/2025",
    adminNotes: "Sudah diperiksa dan diputuskan tidak melakukan tindakan"
  }
];

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="border rounded-md px-3 py-2 bg-gray-100 text-gray-800 min-h-[40px] leading-relaxed">
      {children}
    </div>
  </div>
);

const ReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = sampleReports.find((r) => r.id === String(id));
  const MAX_NOTES = 500;
  const WARNING_THRESHOLD = 490;

  const isResolved = report?.status === "resolved";

  const [adminNotes, setAdminNotes] = useState(report?.adminNotes || "");
  const [openCancelModal, setOpenCancelModal] = useState(false);

  if (!report) return <div className="p-6">Report not found.</div>;

  const handleResolve = () => {
    if (!adminNotes.trim()) {
      alert("Please fill admin notes before resolving");
      return;
    }
    console.log("Resolved with notes:", adminNotes);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-5xl mx-auto">

          <h2 className="text-lg font-semibold">Event Report</h2>

          <Field label="Reporter">{report.reporter}</Field>
          <Field label="Date Of Report">{report.date}</Field>
          <Field label="Event ID">{report.eventId}</Field>
          <Field label="Event Name">{report.eventName}</Field>
          <Field label="Creator">{report.creator}</Field>

          <div>
            <label className="text-xs font-semibold text-gray-600">Report Description</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {report.description}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600">
              Admin Notes {isResolved ? "" : <span className="text-red-600">*</span>}
            </label>
            <textarea
              readOnly={isResolved}
              maxLength={MAX_NOTES}
              className={`w-full min-h-[150px] border rounded-md p-3 focus:outline-none bg-white
                ${adminNotes.length >= WARNING_THRESHOLD ? "border-red-500" : "border-gray-300"}
              `}
              placeholder="please fill your notes here"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
            {adminNotes.length >= WARNING_THRESHOLD && (
            <div className="text-right text-xs text-red-600 mt-1">
              {adminNotes.length}/{MAX_NOTES} characters
            </div>
          )}
          </div>

          {/* buttons / resolved info */}
          {!isResolved ? (
            <div className="flex justify-between pt-3">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => setOpenCancelModal(true)}
              >
                Cancel Event
              </button>

              <div className="flex gap-3">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={handleResolve}
                >
                  Resolve
                </button>

                <button
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={() => navigate(-1)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-1 text-base font-semibold text-gray-800">
              Resolved on: {report.resolvedOn}
            </div>
          )}

        </div>
      </div>

      <CancelEventPopUp
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        onConfirm={(reason) => {
          if (!reason.trim()) {
            alert("Please fill reason of cancellation");
            return;
          }
          console.log("Cancelled with reason:", reason);
          setOpenCancelModal(false);
        }}
      />
    </div>
  );
};

export default ReportDetailPage;
