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
      to={`/event/${id}`}
      className="group relative bg-white rounded-2xl overflow-hidden 
             shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover 
                 group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Category */}
        <span
          className={`absolute top-3 left-3 ${bg} text-white text-xs px-3 py-1 rounded-full font-semibold`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {date}
          </span>

          <span className={`flex items-center gap-1 ${text} font-semibold`}>
            <MapPin className="w-4 h-4" />
            {location.split(" ")[0]}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User className="w-4 h-4" />
          <span>{organizer}</span>
        </div>
      </div>

      {/* Hover CTA */}
      <div
        className="absolute inset-0 flex items-end justify-center 
                  bg-black/0 group-hover:bg-black/10 transition"
      >
        <span
          className="mb-4 opacity-0 group-hover:opacity-100 
                     text-white bg-black/70 px-4 py-1 rounded-full text-sm"
        >
          View Detail →
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
