import React from "react";
import { useParams } from "react-router-dom"; // Untuk mengambil slug dari URL
import Header from "../../components/navbar.jsx"; // Adjust path if needed
import Footer from "../../components/footer.jsx"; // Adjust path if needed
import MOCK_CARD_IMAGE from "../../assets/hero news.png";

// Ikon dari lucide-react
import { MapPin, Calendar, Clock, Users, TriangleAlert } from "lucide-react";

// --- DUMMY DATA UNTUK HALAMAN DETAIL ---
// Anda akan mengganti ini dengan data yang diambil dari API berdasarkan 'slug'
const dummyEventDetails = {
  id: 1,
  title: "DeepBlue Movement",
  organizer: "Sea Care Indonesia",
  location: "Yogyakarta, Indonesia",
  fullLocation: "The Legend of Blue Sea",
  dateRange: "18-23 September 2025",
  time: "09.00-14.00 WIB",
  ageGroup: "All Age",
  imageUrl: MOCK_CARD_IMAGE, // Ganti dengan gambar Hero Detail yang relevan
  description: `The DeepBlue Movement is a collective call to action aimed at maintaining the health and sustainability of Indonesia's marine ecosystems. This event invites all volunteers, divers, communities, and concerned individuals to get directly involved in conservation efforts across our coastal and aquatic areas. Ranging from the cleanup of non-organic waste on beaches and mangrove areas, to public education about the dangers of microplastics to marine life. join this movement, donate your time and energy, and become part of the solution to ensure our oceans remain blue, abundant, and sustainable for future generations.`,
  termsAndConditions: "T & C applies. Read more here.",
};
// --- END DUMMY DATA ---

const EventDetailPage = () => {
  const { slug } = useParams(); // Ambil slug dari URL

  // Untuk saat ini, kita akan menggunakan dummy data.
  // Di aplikasi nyata, Anda akan melakukan fetch data berdasarkan 'slug' ini.
  const event = dummyEventDetails;
  // Jika Anda memiliki banyak event di dummyEventDetails, Anda bisa mencari berdasarkan slug:
  // const event = someArrayOfEvents.find(e => e.slug === slug);
  // Untuk tujuan demo ini, kita hanya menggunakan satu dummy event.

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-10 text-center text-xl bg-white rounded-lg shadow-md">
          Event <span className="font-bold text-red-700">'{slug}'</span> tidak
          ditemukan.
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-20">
        {" "}
        {/* Latar belakang terang, mirip homepage */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Card Utama Event Detail */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Bagian Atas: Gambar & Info Singkat */}
            <div className="md:flex">
              <div className="md:flex-shrink-0 w-full md:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
              <div className="p-6 md:p-8 flex-1 relative">
                <h1 className="mt-9 text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {event.title}
                </h1>
                <p className="text-lg text-gray-600 font-medium mb-6">
                  {event.organizer}
                </p>

                {/* Badge Report Event */}
                <span className="absolute top-6 right-6 flex items-center gap-1 text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full">
                  <TriangleAlert className="w-4 h-4" /> Report Event
                </span>

                {/* Detail Ikon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 text-base mb-8">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-700" />
                    <span>
                      {event.location},{" "}
                      <span className="font-semibold">
                        {event.fullLocation}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-700" />
                    <span>{event.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-700" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-700" />
                    <span>
                      Age:{" "}
                      <span className="font-semibold">{event.ageGroup}</span>
                    </span>
                  </div>
                </div>

                {/* Tombol Terms and Conditions */}
                <button className="text-sm font-semibold text-gray-700 hover:text-green-700 transition">
                  terms and conditions
                </button>
              </div>
            </div>

            {/* Bagian Deskripsi */}
            <div className="p-6 md:p-8 border-t border-gray-100 mt-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {event.description}
              </p>
            </div>

            {/* Tombol Join Event */}
            <div className="p-6 md:p-8 border-t border-gray-100 flex justify-end">
              <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                JOIN EVENT
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventDetailPage;
