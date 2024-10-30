import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
function EventPage() {
  const location = useLocation();
  const { event } = location.state; // Retrieve the passed event data

  // Format the event date
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className=" pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        {/* Code here */}
        <div className="bg-neutral-100 p-6 min-w-[530px]">
          <div className="p-6 md:p-8 max-w-4xl mx-auto bg-white shadow-2xl ">
            {/* Container: Adds padding and centers the content */}
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
              {event.title}
            </h1>
            {/* Title: Adjusts font size and adds margin at different screen sizes */}

            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto rounded-lg shadow-xl mb-4"
            />
            {/* Image: Full width, auto height, rounded corners, and shadow */}

            <div className="text-lg md:text-xl mb-4 flex flex-col justify-center md:items-start items-center">
              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Location
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {event.location}
              </p>
              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Date
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {formattedDate}
              </p>

              <h1 className="text-2xl underline underline-offset-[0.7rem] decoration-orange-500 mt-6">
                Description
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-4 leading-relaxed text-center md:text-left">
                {event.description}
              </p>
            </div>
            {/* Description: Scales font size with leading (line-height) for readability */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventPage;
