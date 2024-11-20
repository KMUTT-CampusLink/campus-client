import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./EventCard.css";
// Helper functions
const truncateDescription = (description, maxLength = 100) => {
  return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
};

const formatDate = (isoString) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(isoString).toLocaleDateString("en-US", options);
};

function EventCard({ event }) {
  return (
    <Link to={`/library/event/${event.title}`} state={{ event }}>
      <div className="hover:scale-105 active:scale-95 duration-300 relative bg-white text-black h-96 rounded-3xl overflow-hidden shadow-lg mx-auto group my-6 ">
        {/* Background Image */}
        <img
          src={event.image}
          alt={event.title}
          className="h-[60%] w-full object-cover"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 h-[60%] bg-gradient-to-t from-black opacity-70"></div>

        {/* Main Content */}
        <div className="absolute bottom-5 w-full bg-white rounded-b-3xl p-4">
          <div className="">
            <h2 className="text-lg font-bold text-gray-900">{event.title}</h2>
          </div>

          {/* Event Date and Time */}
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
            <FontAwesomeIcon
              icon="faCalendarDays"
              className="text-neutral-600"
            />
            <span>{formatDate(event.event_date)}</span>
          </div>

          {/* Event Location */}
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <FontAwesomeIcon
              icon="faLocationDot"
              className="text-neutral-600"
            />
            <span>{event.location}</span>
          </div>
          <span className="badge badge-outline text-orange-500 outline-orange-500">
            Event
          </span>
        </div>

        {/* Hover Description Overlay */}
        <div className="absolute inset-0 bg-gray-900  text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6">
          <h2 className="text-lg font-bold mb-2">{event.title}</h2>
          <p className="text-sm text-gray-400 text-center">
            {truncateDescription(event.description, 150)}
          </p>
          <div className="custom-shape-divider-bottom-1731055800">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
