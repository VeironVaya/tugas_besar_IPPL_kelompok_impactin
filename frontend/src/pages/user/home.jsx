import React from "react";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import EventCard from "../../components/event_card.jsx";
import HERO_IMAGE from "../../assets/hero news.png";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";
import { MapPin, Calendar, Users } from "lucide-react"; // Import ikon dari lucide/react

// dummy data acara
const mockEvents = [
  {
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
  },
];

const topEvents = Array(10)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);
const peduliLautEvents = Array(4)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);

const HomePage = () => {
  return (
    <>
      <Header />

      {/* Terapkan Gradasi Hutan Halus pada Latar Belakang Main */}
      <main className="min-h-screen bg-gradient-to-br from-[#C0E0F0] via-[#D6F4D6] to-[#B3D3B3]">
        {/* Hero Banner */}
        <section
          className="relative h-[80vh] w-full flex items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Container teks kiri. max-w-6xl mx-auto tetap di tengah, tapi isinya kita paksa rata kiri. */}
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-16">
            {/* Tambahkan text-left ke div ini untuk memastikan semua konten di dalamnya rata kiri */}
            {/* Hapus max-w-xl agar teks bisa menggunakan lebar yang lebih luas (jika diperlukan) */}
            <div className="text-left">
              <h1 className="font-inter text-6xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-left">
                DeepBlue Movement
              </h1>

              <p className="font-inter text-lg md:text-2xl font-light text-white/90 mt-3 mb-8 text-left">
                Protect the Depths, Preserve the Future
              </p>

              <button className="bg-gradient-to-r from-green-700 to-blue-500 px-8 py-3 rounded-full text-sm md:text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform">
                Explore Event
              </button>
            </div>
          </div>
        </section>

        {/* Top Event Section */}
        <section className="w-full py-16">
          {/* SAMAKAN padding horizontal (lg:px-16) agar sejajar dengan Hero */}
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <h2 className="text-gray-900 text-3xl font-extrabold mb-10 border-b-2 border-green-500 pb-2 inline-block">
              Top Event
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {topEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Peduli Laut Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          {/* SAMAKAN padding horizontal (lg:px-16) agar sejajar dengan Hero */}
          <h2 className="text-3xl font-extrabold mb-10 flex items-center gap-3 text-gray-900 border-b-2 border-blue-500 pb-2 inline-block">
            <span className="text-blue-600">🌊</span> Peduli Laut
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {peduliLautEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          {/* Tombol Lihat Semua: Ubah text-center menjadi text-left agar tombol ikut minggir ke kiri */}
          <div className="text-left mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-teal-400 px-10 py-3 rounded-lg text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform">
              Lihat Semua Event Laut
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
