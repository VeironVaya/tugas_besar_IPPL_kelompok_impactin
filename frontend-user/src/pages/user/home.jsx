import React from "react";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import EventCard from "../../components/event_card.jsx";
import HERO_IMAGE from "../../assets/hero news.png";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

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

const topEvents = Array(8)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);

const peduliLautEvents = Array(8)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);

const HomePage = () => {
  return (
    <>
      {/* ✅ MAIN = SCROLL CONTEXT */}
      <main className="relative bg-slate-50">

        {/* ✅ HEADER HARUS DI DALAM MAIN */}
        <Header />

        {/* ================= HERO ================= */}
        <section
          className="relative min-h-screen w-full flex bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative flex w-full">
            <div className="max-w-6xl mx-auto px-6 lg:px-16 flex items-center min-h-screen">
              <div>
                <h1 className="font-inter text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                  DeepBlue Movement
                </h1>

                <p className="font-inter text-lg md:text-2xl font-light text-white/90 mt-3 mb-8">
                  Protect the Depths, Preserve the Future
                </p>

                <button className="bg-gradient-to-r from-green-700 to-blue-500 px-8 py-3 rounded-full text-sm md:text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform">
                  See Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TOP EVENT ================= */}
        <section className="w-full py-16">
          <div className="mx-auto px-6 lg:px-16">
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

        {/* ================= PEDULI LAUT ================= */}
        <section className="mx-auto px-6 lg:px-16 py-16">
          <h2 className="text-3xl font-extrabold mb-10 flex items-center gap-3 text-gray-900 border-b-2 border-blue-500 pb-2 inline-block">
            <span className="text-blue-600">🌊</span> Peduli Laut
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {peduliLautEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default HomePage;
