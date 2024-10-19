import React from "react";
import { Link } from "react-router-dom";

// Function to truncate the description
const truncateDescription = (description, maxLength = 200) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "...";
  }
  return description;
};

function EventCard({ event }) {
  return (
    <div className="flex justify-center p-6">
      <div className="card card-compact bg-base-100 w-96 shadow-xl h-full hover:scale-105 duration-300">
        {/* h-full ensures card takes full height */}
        <figure>
          <img
            src={event.image}
            alt={event.title}
            className="h-48 w-full object-cover" // Ensures the image is of consistent height and fills the card width
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title">{event.title}</h2>
          <p>{truncateDescription(event.description)}</p>{" "}
          {/* Truncate the description */}
          <div className="card-actions justify-end">
            <Link
              to={`/library/event/${event.title}`}
              state={{ event }} // Pass the event data as state
            >
              <button className="btn btn-primary bg-orange-500 border-none rounded-full text-white hover:bg-orange-700">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
