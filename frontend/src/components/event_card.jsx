import React from "react";
import { MapPin, User } from "lucide-react";

const EventCard = ({
  title,
  date,
  location,
  organizer,
  imageUrl,
  category,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
      {/* Image */}
      <div
        className="h-32 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Badge */}
        <span className="absolute top-2 right-2 bg-green-700 text-white text-[10px] px-2 py-1 rounded-md font-semibold">
          {category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="font-bold text-sm">{title}</h3>

        <p className="text-gray-600 text-xs mt-1">{location}</p>

        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>📅 {date}</span>
          <span>👤 {organizer}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
