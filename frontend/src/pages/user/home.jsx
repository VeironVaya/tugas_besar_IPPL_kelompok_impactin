import React from "react";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import EventCard from "../../components/event_card.jsx";
import HERO_IMAGE from "../../assets/hero news.png";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

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

const topEvents = Array(8)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);
const peduliLautEvents = Array(4)
  .fill(0)
  .map((_, i) => mockEvents[i % mockEvents.length]);

const HomePage = () => {
  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        {/* Hero Banner */}
        <section
          className="relative h-[80vh] w-full flex items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Container teks kiri */}
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-16">
            <div className="max-w-xl">
              <h1 className="font-inter text-6xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                DeepBlue Movement
              </h1>

              <p className="font-inter text-lg md:text-2xl font-light text-white/90 mt-3 mb-8">
                Protect the Depths, Preserve the Future
              </p>

              <button className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3 rounded-full text-sm md:text-base font-semibold text-white shadow-xl hover:scale-105 transition-transform">
                Explore Event
              </button>
            </div>
          </div>
        </section>

        {/* Top Event Section */}
        <section className="w-full bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-gray-900 text-3xl font-bold flex items-center gap-2 mb-8">
              <span className="text-gray-900 text-xl">↑</span> Top Event
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {topEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Peduli Laut */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900">
            <span className="text-green-700">🌊</span> Peduli Laut
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {peduliLautEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
