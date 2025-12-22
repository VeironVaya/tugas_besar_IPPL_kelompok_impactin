import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import EventCard from "../../components/event_card.jsx";
import HERO_IMAGE from "../../assets/hero news.png";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

/* ================= MOCK EVENTS ================= */
const mockEvents = [
  {
    id: 1,
    title: "DeepBlue Movement",
    date: "SEP 18",
    location: "Yogyakarta Indonesia",
    organizer: "Sea Care Indonesia",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Environment",
  },
  {
    id: 2,
    title: "Ocean Cleanup",
    date: "OCT 05",
    location: "Bali Indonesia",
    organizer: "CleanSea Org",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Environment",
  },
  {
    id: 3,
    title: "Mangrove Planting",
    date: "NOV 12",
    location: "Jakarta Indonesia",
    organizer: "GreenAction",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Community",
  },
  {
    id: 4,
    title: "Beach Awareness",
    date: "DEC 01",
    location: "Lombok Indonesia",
    organizer: "EcoWave",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Education",
  },
  {
    id: 5,
    title: "Public Health Campaign",
    date: "JAN 20",
    location: "Bandung Indonesia",
    organizer: "HealthFirst",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Health",
  },
];

const categories = ["Environment", "Health", "Education", "Community"];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Environment");

  const featuredEvent = mockEvents[0];

  const filteredEvents = mockEvents.filter(
    (event) => event.category === activeCategory
  );

  return (
    <>
      <main className="relative bg-slate-50">
        <Header />

        {/* ================= HERO (AMAN) ================= */}
        <section
          className="relative min-h-screen w-full flex bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
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

                {/* SEE DETAILS → EVENT DETAIL */}
                <button
                  onClick={() =>
                    navigate(`/event/${featuredEvent.id}`)
                  }
                  className="bg-gradient-to-r from-green-700 to-blue-500 px-8 py-3 rounded-full
                             text-sm md:text-base font-semibold text-white shadow-lg
                             hover:shadow-xl hover:scale-[1.02] transition-transform"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORY TABS ================= */}
        <section className="w-full py-12">
          <div className="mx-auto px-6 lg:px-16">
            <div className="flex flex-wrap gap-4 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition
                    ${
                      activeCategory === cat
                        ? "bg-green-700 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
