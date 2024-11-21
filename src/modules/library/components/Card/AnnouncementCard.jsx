import React from "react";
import { Link } from "react-router-dom";

function AnnouncementCard({ announcement }) {
  return (
    <Link
      to={`/library/announcement/${announcement.title}`}
      state={{
        title: announcement.title,
        description: announcement.description,
        updated: announcement.updated,
        location: announcement.location,
        image: announcement.image,
        source: announcement.source,
        duration: announcement.duration,
        date: announcement.updated_at,
      }}
    >
      <div className="active:scale-90 relative w-full mx-auto overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 m-6">
        {/* Background Image */}
        <img
          src={announcement.image}
          alt={announcement.title}
          className="w-full h-64 object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-2xl font-bold text-white mb-2">
            {announcement.title}
            {announcement.isNew && (
              <span className="text-orange-500 text-sm font-semibold ml-2">
                NEW!
              </span>
            )}
          </h2>
          <span className="badge mb-2 badge-outline text-orange-500 outline-orange-500">Announcement</span>
          <h3 className="text-white text-sm">
            {new Date(announcement.updated_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <p className="text-sm text-gray-300 mb-4 line-clamp-3">
            {announcement.description}
          </p>
          <div className="flex items-center justify-between">
            {/* Additional elements like rating, genre tags can be added here */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AnnouncementCard;
