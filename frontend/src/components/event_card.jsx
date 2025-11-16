import React from "react";
import { Link } from "react-router-dom"; // <-- PENTING: Import Link
import { MapPin, User, Calendar } from "lucide-react";

// Fungsi sederhana untuk memetakan kategori ke warna Tailwind (dibiarkan sama)
const getCategoryColors = (category) => {
  switch (category) {
    case "LAUT":
      return { bg: "bg-blue-600", text: "text-blue-600" };
    case "HIJAU":
      return { bg: "bg-green-600", text: "text-green-600" };
    case "EDUKASI":
      return { bg: "bg-yellow-500", text: "text-yellow-500" };
    default:
      return { bg: "bg-gray-500", text: "text-gray-500" };
  }
};

const EventCard = ({
  // Pastikan Anda menerima 'id' dari props (jika data mock Anda memiliki id)
  id,
  title,
  date,
  location,
  organizer,
  imageUrl,
  category,
}) => {
  const { bg, text } = getCategoryColors(category);

  // Fungsi untuk membuat slug dari judul (misal: "DeepBlue Movement" -> "deepblue-movement")
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  // Ganti <div> pembungkus utama dengan <Link>
  return (
    <Link
      to={`/event/${id || slug}`} // Mengarahkan ke path dinamis
      className="block bg-white rounded-xl overflow-hidden shadow-lg 
                 hover:shadow-2xl hover:scale-[1.03] 
                 transition duration-300 cursor-pointer"
    >
      {/* Isi Card (sama seperti sebelumnya) */}
      <div
        className="h-32 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <span
          className={`absolute top-2 right-2 ${bg} text-white text-[11px] 
                         px-3 py-1 rounded-full font-bold uppercase tracking-wider`}
        >
          {category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-extrabold text-base mb-2 text-gray-900">{title}</h3>

        {/* Detail Lokasi & Tanggal */}
        <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1.5 text-gray-600 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            {date}
          </span>
          <span className={`flex items-center gap-1 ${text} font-bold`}>
            <MapPin className="w-3.5 h-3.5" />
            {location.split(" ")[0]}
          </span>
        </div>

        {/* Organizer */}
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{organizer}</span>
        </div>
      </div>
    </Link> // <-- Penutup Link
  );
};

export default EventCard;
