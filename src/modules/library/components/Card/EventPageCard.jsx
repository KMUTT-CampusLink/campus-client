import React from "react";
import { Link } from "react-router-dom";

function EventPageCard({
  title,
  description,
  event_date,
  location,
  image,
  source,
}) {
  const formattedDate = new Date(event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-4 px-4 flex">
      <div className="flex flex-col rounded-lg bg-white shadow-lg overflow-hidden max-w-md lg:max-w-2xl p-6 min-w-[100%]">
        {/* Date and Tag Section */}
        <div className="flex flex-row justify-between mb-2 text-sm text-gray-500 font-semibold">
          <span className="uppercase text-orange-600">#Event</span>
          <span>{formattedDate}</span>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
            {title}
          </h2>
          <p className="my-3">{location}</p>
          <p className="text-gray-600 text-sm leading-tight line-clamp-3">
            {description}
          </p>
        </div>

        {/* Button Section */}
        <div className="flex justify-start">
          <Link
            to={`/library/event/${title}`}
            state={{ title, description, event_date, location, image, source }}
          >
            <button className="flex items-center justify-center py-2 px-4 bg-orange-100 rounded-full font-semibold text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventPageCard;
