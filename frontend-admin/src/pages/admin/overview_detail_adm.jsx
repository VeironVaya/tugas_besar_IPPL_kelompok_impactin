import React from "react";
import AdminNavbar from "../../components/navbar_adm";
import { useParams } from "react-router-dom";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import { useState } from "react";
import CancelEventPopUp from "../../components/cancel_event.jsx";

const sampleEvents = [
  {
    id: "1",
    status: "accepted",
    title: "BlueWave Coastal Restoration",
    category: "Konservasi Laut",
    location: "Makassar, Indonesia",
    address: "Pantai Losari – Area Konservasi",
    addressUrl: "https://maps.app.goo.gl/xt92B3t7DsL9as8A7",
    startDate: "10 Januari 2026",
    endDate: "12 Januari 2026",
    startTime: "08.00",
    endTime: "15.00",
    maxParticipant: 80,
    coverFileName: MOCK_CARD_IMAGE,
    description:
      "BlueWave Coastal Restoration adalah kegiatan restorasi garis pantai yang berfokus pada penanaman kembali vegetasi pesisir serta pembersihan area laut dangkal. Program ini bertujuan menjaga ekosistem pesisir dari abrasi dan menumbuhkan kesadaran masyarakat tentang pentingnya wilayah pesisir yang sehat.",
    terms: `1. Peserta berusia minimal 18 tahun.
2. Mengikuti briefing keselamatan sebelum kegiatan.
3. Wajib menggunakan perlengkapan keselamatan yang disediakan panitia.
4. Dilarang membawa atau membuang sampah plastik sekali pakai selama acara.
5. Dokumentasi kegiatan dapat digunakan untuk publikasi oleh penyelenggara.`,
    minAge: 18,
    maxAge: "-",
    groupLink: "https://chat.whatsapp.com/AbCdEfG123456",
  },

  {
    id: "2",
    status: "not accepted",
    title: "Urban Forest Revival",
    category: "Reboisasi Perkotaan",
    location: "Surabaya, Indonesia",
    address: "Hutan Kota Pakuwon",
    addressUrl: "https://maps.app.goo.gl/s71kL3v5Fg8HkPyT6",
    startDate: "25 Februari 2026",
    endDate: "25 Februari 2026",
    startTime: "07.00",
    endTime: "12.00",
    maxParticipant: 200,
    coverFileName: MOCK_CARD_IMAGE,
    description: `Urban Forest Revival merupakan inisiatif besar yang berfokus pada pemulihan dan perluasan ruang hijau di kawasan perkotaan. 
Acara ini hadir sebagai bentuk respon terhadap polusi udara yang meningkat dan semakin minimnya kawasan resapan air di kota besar seperti Surabaya. 
Melalui kegiatan penanaman pohon, perawatan bibit, pembersihan area taman kota, serta edukasi lingkungan, program ini mengajak masyarakat untuk berkontribusi langsung dalam menciptakan kawasan perkotaan yang lebih sehat, asri, dan berkelanjutan.

Selama kegiatan berlangsung, peserta akan bekerja sama dalam kelompok kecil untuk melakukan berbagai aktivitas, mulai dari memindahkan bibit pohon, membuat lubang tanam, menata kembali area hijau, hingga memeriksa kesehatan beberapa tanaman eksisting. 
Selain itu, akan ada sesi edukasi singkat dari ahli ekologi perkotaan mengenai manfaat ruang hijau bagi kesehatan manusia, peran pohon terhadap kualitas udara, serta strategi reboisasi yang efektif untuk kota padat penduduk.

Urban Forest Revival bukan sekadar acara tanam pohon, tetapi gerakan kolaboratif yang menghadirkan kesempatan bagi masyarakat untuk memahami pentingnya keterlibatan jangka panjang dalam menjaga keberlanjutan lingkungan. 
Kami percaya bahwa perubahan di kota besar hanya dapat tercipta melalui tindakan nyata yang terus-menerus, dan kegiatan ini menjadi langkah awal menuju kota yang lebih hijau bagi generasi mendatang.`,
    
    terms: `1. Kegiatan terbuka untuk peserta dari berbagai usia, namun peserta di bawah 18 tahun wajib hadir bersama wali atau pendamping.
2. Peserta wajib melakukan registrasi online sebelum mengikuti kegiatan dan menunjukkan bukti registrasi saat melakukan check-in.
3. Disarankan menggunakan pakaian yang nyaman untuk aktivitas luar ruangan serta sepatu tertutup yang aman untuk berjalan di area berumput atau tanah.
4. Peserta diwajibkan membawa perlengkapan pribadi seperti topi, handuk kecil, tabir surya, dan botol minum. Panitia menyediakan stasiun isi ulang air minum untuk mengurangi penggunaan plastik.
5. Para peserta harus mengikuti briefing keselamatan mengenai cara penanaman yang benar, cara mengangkat bibit tanpa merusak akar, serta prosedur penggunaan alat.
6. Setiap kelompok akan dipandu oleh koordinator lapangan yang bertanggung jawab memastikan kegiatan berjalan tertib dan aman.
7. Peserta tidak diperbolehkan merusak fasilitas taman kota, memetik tanaman tanpa izin, atau membuang sampah sembarangan.
8. Peserta wajib menjaga perilaku yang sopan selama acara dan menghindari tindakan yang dapat mengganggu ketertiban umum.
9. Dokumentasi berupa foto dan video yang diambil oleh panitia dapat digunakan untuk keperluan publikasi program, kampanye lingkungan, dan materi edukasi.
10. Jika terjadi hujan lebat, kondisi cuaca ekstrem, atau keadaan darurat lainnya, panitia berhak menunda, mengubah jadwal, atau menghentikan kegiatan demi keselamatan seluruh peserta.`,

    minAge: 16,
    maxAge: "-",
    groupLink: "https://chat.whatsapp.com/HjKlMnP987654",
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

const OverviewDetailPage = () => {
  const { id } = useParams();
  const event = sampleEvents.find((e) => e.id === String(id));
  const [openCancelModal, setOpenCancelModal] = useState(false);

  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <AdminNavbar />
      </nav>

      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-5xl mx-auto">

          <h2 className="text-lg font-semibold">Event Information for ID: {event.id}</h2>

          {/* Title */}
          <Field label="Event Title">{event.title}</Field>

          {/* Category + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Event Category">{event.category}</Field>
            <Field label="Location">{event.location}</Field>
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Event Start Date">{event.startDate}</Field>
            <Field label="Event End Date">{event.endDate}</Field>
            <Field label="Event Start Time">{event.startTime}</Field>
            <Field label="Event End Time">{event.endTime}</Field>
          </div>

          {/* Max Participant + Cover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Maximum Participant">{event.maxParticipant}</Field>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Event Cover</label>
              <div className="border rounded-md px-3 py-2 bg-gray-100 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4" />
                </svg>
                <a
                  href={MOCK_CARD_IMAGE}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline text-blue-600 text-sm"
                >
                  {event.coverFileName}
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Event Description</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {event.description}
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Terms & Conditions</label>
            <div className="border rounded-md p-3 bg-gray-100 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm mt-1">
              {event.terms}
            </div>
          </div>

          {/* Ages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Minimum Age">{event.minAge}</Field>
            <Field label="Maximum Age">{event.maxAge}</Field>
          </div>

          {/* Group Link */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Group Link</label>
            <div className="border rounded-md px-3 py-2 bg-gray-100">
              <a
                href={event.groupLink}
                target="_blank"
                rel="noreferrer noopener"
                className="underline break-all text-sm"
              >
                {event.groupLink}
              </a>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={event.status !== "accepted"}
              className={`px-6 py-2 rounded text-white 
                ${event.status === "accepted" ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"}
              `}
              onClick={() => event.status === "accepted" && setOpenCancelModal(true)}
            >
              Cancel Event
            </button>
          </div>

          <CancelEventPopUp
            open={openCancelModal}
            onClose={() => setOpenCancelModal(false)}
            onConfirm={() => {
              console.log("Cancelled");
              setOpenCancelModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewDetailPage;
