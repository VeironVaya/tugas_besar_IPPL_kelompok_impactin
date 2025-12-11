import React from "react";
import AdminNavbar from "../../components/navbar_adm";
import { useParams } from "react-router-dom";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

const sampleEvents = [
  {
      id: "1",
      title: "DeepBlue Movement",
      category: "Ekosistem Laut",
      location: "Yogyakarta, Indonesia",
      address: "The Legend of Blue Sea",
      addressUrl: "https://maps.app.goo.gl/srGVs65T4DmvcwPV8",
      startDate: "18 September 2025",
      endDate: "23 September 2025",
      startTime: "09.00",
      endTime: "14.00",
      maxParticipant: 100,
      coverFileName: MOCK_CARD_IMAGE,
      description: "The DeepBlue Movement is a collective call to action aimed at maintaining the health and sustainability of Indonesia's marine ecosystems. This event invites all volunteers, divers, communities, and concerned individuals to get directly involved in conservation efforts across our coastal and aquatic areas.",
      terms: `1. Usia Minimum: Peserta harus berusia minimal 17 tahun...`,
      minAge: 17,
      maxAge: "-",
      groupLink: "https://chat.whatsapp.com/DmGBacX2CPNYRU?mode=wwc",
    },
    {
        id: "2",
        title: "GreenCity Tree Planting Day",
        category: "Lingkungan & Reboisasi",
        location: "Bandung, Indonesia",
        address: "Taman Hutan Kota Babakan Siliwangi",
        addressUrl: "https://maps.app.goo.gl/7bUo7Hh6k5w2VJ8x5",
        startDate: "12 Oktober 2025",
        endDate: "12 Oktober 2025",
        startTime: "07.30",
        endTime: "13.00",
        maxParticipant: 150,
        coverFileName: MOCK_CARD_IMAGE,
        description: `GreenCity Tree Planting Day adalah program kolaboratif yang bertujuan untuk meningkatkan kesadaran masyarakat terhadap pentingnya ruang hijau di wilayah perkotaan.
        Acara ini hadir sebagai respon atas semakin menurunnya kualitas udara dan meningkatnya kebutuhan terhadap lingkungan yang berkelanjutan. Melalui kegiatan penanaman pohon, edukasi lingkungan, serta kolaborasi berbagai komunitas, acara ini mendorong partisipasi aktif masyarakat dalam menjaga bumi.

        Peserta akan dibagi ke dalam beberapa kelompok dan setiap kelompok akan bertanggung jawab atas area penanaman tertentu. Selain kegiatan penanaman,
        akan ada sesi diskusi singkat bersama ahli lingkungan mengenai dampak perubahan iklim, praktik reboisasi yang tepat, serta langkah-langkah kecil yang bisa dilakukan setiap individu dalam kehidupan sehari-hari.

        Kami percaya bahwa perubahan besar dimulai dari langkah-langkah kecil dan nyata. Dengan berpartisipasi dalam kegiatan ini, Anda berperan langsung dalam
        menciptakan masa depan yang lebih hijau untuk kota dan generasi berikutnya. Yuk, ikut bersama ratusan relawan yang telah berkomitmen untuk menjadikan kota kita lebih baik!`,
        terms: `1. Kepesertaan terbuka untuk masyarakat umum dan tidak dipungut biaya.
        2. Peserta diwajibkan melakukan registrasi melalui formulir online dan memastikan kehadiran pada hari kegiatan.
        3. Peserta harus mengikuti briefing keselamatan mengenai prosedur penanaman dan pembagian peralatan.
        4. Menggunakan pakaian yang nyaman dan sesuai untuk kegiatan lapangan (disarankan memakai sepatu tertutup, topi, dan sarung tangan).
        5. Peserta dilarang merusak fasilitas umum dan wajib menjaga kebersihan area sebelum, selama, dan setelah kegiatan berlangsung.
        6. Menggunakan botol minum pribadi dan diharapkan menghindari penggunaan plastik sekali pakai.
        7. Peserta wajib mengikuti instruksi dari koordinator lapangan, mulai dari pembagian bibit, metode penanaman, hingga penataan kembali area yang sudah digunakan.
        8. Dilarang membawa atau mengonsumsi alkohol, obat terlarang, atau melakukan tindakan yang mengganggu ketertiban umum selama acara.
        9. Dokumentasi acara berupa foto dan video dapat digunakan untuk kepentingan publikasi kegiatan dan kampanye lingkungan oleh penyelenggara.
        10. Jika terjadi kondisi cuaca ekstrem atau keadaan darurat, penyelenggara berhak mengubah jadwal atau menghentikan kegiatan demi keamanan seluruh peserta.`,

        minAge: 15,
        maxAge: "-",
        groupLink: "https://chat.whatsapp.com/KfJbdC23PLNTY4?mode=join"
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

const ApprovalDetailPage = () => {
  const { id } = useParams();
  const event = sampleEvents.find((e) => e.id === String(id));

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

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button className="px-6 py-2 rounded bg-green-600 text-white">Accept</button>
            <button className="px-6 py-2 rounded bg-red-600 text-white">Reject</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApprovalDetailPage;