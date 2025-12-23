import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";
import EventCard from "../../components/event_card.jsx";
import HERO_IMAGE from "../../assets/hero news.png";
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

import {
  Leaf,
  BookOpen,
  Users,
  HeartPulse,
} from "lucide-react";

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
    id: 8,
    title: "DeepBlue Movement",
    date: "SEP 18",
    location: "Yogyakarta Indonesia",
    organizer: "Sea Care Indonesia",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Environment",
  },
  {
    id: 9,
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
    id: 7,
    title: "Mangrove Planting",
    date: "NOV 12",
    location: "Jakarta Indonesia",
    organizer: "GreenAction",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Community",
  },
  {
    id: 10,
    title: "Mangrove Planting",
    date: "NOV 12",
    location: "Jakarta Indonesia",
    organizer: "GreenAction",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Community",
  },
  {
    id: 11,
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
    id: 12,
    title: "Beach Awareness",
    date: "DEC 01",
    location: "Lombok Indonesia",
    organizer: "EcoWave",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Education",
  },{
    id: 13,
    title: "Beach Awareness",
    date: "DEC 01",
    location: "Lombok Indonesia",
    organizer: "EcoWave",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Education",
  },{
    id: 14,
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
  {
    id: 15,
    title: "Public Health Campaign",
    date: "JAN 20",
    location: "Bandung Indonesia",
    organizer: "HealthFirst",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Health",
  },
  {
    id: 16,
    title: "Public Health Campaign",
    date: "JAN 20",
    location: "Bandung Indonesia",
    organizer: "HealthFirst",
    imageUrl: MOCK_CARD_IMAGE,
    category: "Health",
  },

];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="bg-[#225740]  text-white">
        <Header variant="hero" />

        {/* ================= HERO ================= */}
        <section
          className="relative min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-16 flex items-center min-h-screen">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                DeepBlue Movement
              </h1>

              <p className="mt-4 text-white/80 text-lg">
                Platform kolaborasi untuk aksi lingkungan dan sosial
                yang berdampak nyata.
              </p>

              <button
                onClick={() => navigate(`/event/${mockEvents[0].id}`)}
                className="mt-8 bg-green-600 hover:bg-green-700
                           px-8 py-3 rounded-full font-semibold
                           shadow-xl transition hover:scale-[1.05]"
              >
                See Details
              </button>
            </div>
          </div>
        </section>
{/* ================= CATEGORY HIGHLIGHT (HOVER ANIMATION) ================= */}
<section className="py-20">
  <div className="text-center max-w-7xl mx-auto px-6 lg:px-20">
    <h2 className="text-3xl font-extrabold mb-6">
      Focus Areas
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Environment",
          desc: "Aksi nyata untuk menjaga alam, laut, dan ekosistem demi keberlanjutan masa depan.",
          Icon: Leaf,
        },
        {
          title: "Education",
          desc: "Meningkatkan kesadaran dan pengetahuan melalui edukasi yang inklusif.",
          Icon: BookOpen,
        },
        {
          title: "Community",
          desc: "Menguatkan komunitas lokal melalui kolaborasi dan aksi bersama.",
          Icon: Users,
        },
        {
          title: "Health",
          desc: "Mendukung kesehatan fisik dan mental masyarakat melalui kampanye preventif.",
          Icon: HeartPulse,
        },
      ].map(({ title, desc, Icon }) => (
        <div
          key={title}
          className="group relative overflow-hidden
                     bg-white/10 backdrop-blur-xl
                     border border-white/20
                     rounded-3xl p-8
                     transition-all duration-300
                     hover:bg-white/20
                     hover:-translate-y-2
                     hover:shadow-2xl"
        >
          {/* ICON + TITLE */}
          <div className="transition-all duration-300
                          group-hover:opacity-0
                          group-hover:translate-y-4">
            <Icon size={42} className="text-white mb-4" />
            <h3 className="text-xl font-bold">
              {title}
            </h3>
          </div>

          {/* DESCRIPTION (HOVER) */}
          <div
            className="absolute inset-0 p-8
                       flex items-center justify-center text-center
                       opacity-0
                       transition-all duration-300
                       group-hover:opacity-100"
          >
            <p className="text-sm text-white/90">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* ================= EVENTS BY CATEGORY ================= */}
<section className="py-4 space-y-24">
  {[
    {
      title: "Environment",
      category: "Environment",
    },
    {
      title: "Education",
      category: "Education",
    },
    {
      title: "Community",
      category: "Community",
    },
    {
      title: "Health",
      category: "Health",
    },
  ].map(({ title, subtitle, category }) => {
    const events = mockEvents
      .filter((e) => e.category === category)
      .slice(0, 16); // 4–6 card

    if (events.length === 0) return null;

    return (
      <div key={category} className="w-full px-6 lg:px-20">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold">
            {title}
          </h2>
          <p className="text-white/70 mt-1">
            {subtitle}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-xl
                         hover:shadow-2xl transition
                         hover:-translate-y-1"
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
    );
  })}
</section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-28 text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Make an Impact?
          </h2>
          <button
            onClick={() => navigate("/create-event")}
            className="bg-green-600 hover:bg-green-700
                       px-10 py-4 rounded-full font-semibold
                       shadow-xl hover:scale-[1.05] transition"
          >
            Create an Event
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
