import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faBolt,
  faUsers,
  faCheck,
  faExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchEvents, reserveEventSeat } from "../services/api";
function EventPage() {
  const scrollToTicket = () => {
    const ticketSection = document.querySelector(".ticket-section");
    ticketSection?.scrollIntoView({ behavior: "smooth" });
  };
  const [reservationStatus, setReservationStatus] = useState(null);

  const [libraryEvents, setLibraryEvents] = useState([]);
  const location = useLocation();
  const { event } = location.state; // Retrieve the passed event data
  // Fetch events data
  useEffect(() => {
    const fetchLibraryEvents = async () => {
      try {
        const events = await fetchEvents(); // Use the fetchEvents function from your API
        setLibraryEvents(events); // Set the fetched events data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchLibraryEvents();
  }, []);
  // Format the event date
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const eventDate = new Date(event.event_date); // Event date
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Calculate the time left until the event
  function calculateTimeLeft() {
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { weeks, days, hours, minutes, seconds };
  }

  // Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [eventDate]);

  const handleReserveSeat = async () => {
    try {
      const response = await reserveEventSeat(event.id);
      setReservationStatus({
        type: "success",
        message: "Seat reserved successfully!",
      });
    } catch (error) {
      console.error("Error reserving seat:", error);
      setReservationStatus({
        type: "error",
        message: error.response?.data?.error || "Failed to reserve seat.",
      });
    }
  };

  const [remainingSeats, setRemainingSeats] = useState(
    event.total_seat - event.reserve_seat
  );

  return (
    <div className="min-w-[850px] font-nunito">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto">
        <MainNavbar />
        <div className="container mx-auto px-4 md:px-8 lg:w-[70%]">
          <div className="bg-white border-gray-300 rounded-lg p-6">
            {/* Image Banner */}
            <div className="w-full h-[30rem] flex justify-center items-center rounded-md shadow-lg mb-6 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-6 p-3 items-center flex justify-between">
              <h1 className="text-xl underline-offset-[19px] underline decoration-2 decoration-orange-500">
                INFO
              </h1>
              {/* <button
                onClick={scrollToTicket}
                className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-full px-7"
              >
                Get Ticket
              </button> */}
            </div>
            {/* Event Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
              {event.title}
            </h1>

            {/* Date and Location */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 text-gray-700 text-center sm:text-left mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-600"
                />
                <p className="text-lg">{formattedDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-gray-600"
                />

                <p className="text-lg">{event.location}</p>
              </div>
            </div>

            {/* Event Details */}
            <div className="px-2 md:px-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Event Details
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-center m-12 scale-125">
              <div className="flex gap-4">
                <div className="flex flex-col items-center border rounded-lg p-4 w-20">
                  <span className="text-2xl font-bold">{timeLeft.weeks}</span>
                  <span className="text-sm text-gray-500">WEEKS</span>
                </div>
                <div className="flex flex-col items-center border rounded-lg p-4 w-20">
                  <span className="text-2xl font-bold">{timeLeft.days}</span>
                  <span className="text-sm text-gray-500">DAYS</span>
                </div>
                <div className="flex flex-col items-center border rounded-lg p-4 w-20">
                  <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  <span className="text-sm text-gray-500">HOURS</span>
                </div>
                <div className="flex flex-col items-center border rounded-lg p-4 w-20">
                  <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-sm text-gray-500">MINUTES</span>
                </div>
                <div className="flex flex-col items-center border rounded-lg p-4 w-20">
                  <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-sm text-gray-500">SECONDS</span>
                </div>
              </div>
            </div>

            <div className="container mx-auto py-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
                Upcoming Events
              </h1>
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {libraryEvents.map((event) => (
                  <SwiperSlide key={event.id}>
                    <div className="bg-neutral-100  flex flex-col justify-between rounded-lg shadow-lg overflow-hidden hover:bg-orange-500 hover:text-white p-6 duration-300 h-[20rem] w-[20rem] mx-auto">
                      <div className="flex flex-col">
                        <h3 className="text-5xl font-light mb-2">
                          {new Date(event.event_date).getDate()}
                        </h3>
                        <p className="uppercase text-sm">
                          {new Date(event.event_date).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-semibold mb-2 ">
                          {event.title}
                        </h3>
                        <p className="text-xl  ">{event.location}</p>
                      </div>

                      {/* <div className="bg-blue-500 text-white text-center p-4">
                        <h3 className="text-4xl font-bold">
                          {new Date(event.event_date).getDate()}
                        </h3>
                        <p className="uppercase text-sm">
                          {new Date(event.event_date).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </p>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {event.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.location}
                        </p>
                      </div> */}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Ticket */}
            <div
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="ticket-section border-l-4 border-orange-500 p-6 my-12 bg-white rounded-lg shadow-xl hover:scale-105 active:scale-95 duration-300"
            >
              {/* Badge Section */}
              <div className="inline-block mb-4">
                <span className="badge text-orange-500 border border-orange-500 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                  Ticket
                </span>
              </div>

              {/* Title and Location Section */}
              <div className="mb-6 ">
                <h1 className="text-lg font-bold text-gray-800">
                  {event.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              </div>

              {/* Divider */}
              <hr className="border-gray-300 my-4" />

              {/* Footer Section */}
              <div className="flex justify-between items-center">
                <h1 className="text-sm font-medium text-gray-600">
                  {remainingSeats} Seats Left
                </h1>
                <h1 className="text-sm font-bold text-orange-500">
                  Free Ticket
                </h1>
              </div>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                {reservationStatus && (
                  <div
                    role="alert"
                    className={`alert ${
                      reservationStatus.type === "success"
                        ? "alert-success bg-green-400"
                        : "alert-error"
                    }`}
                  >
                    <span>
                      {reservationStatus.type === "success" ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                      )}
                    </span>
                    <span>
                      {reservationStatus.type === "success"
                        ? "Success!"
                        : "Error!"}{" "}
                      {reservationStatus.message}
                    </span>
                  </div>
                )}
                <FontAwesomeIcon
                  style={{ width: "8rem", height: "8rem" }}
                  className="flex items-center justify-center mx-auto py-6 "
                  icon={faUsers}
                />
                <h3 className="font-bold text-2xl text-center">Join Event</h3>
                <p className="py-4 text-xl text-center">
                  Are you sure you want to join <strong>{event.title}</strong>{" "}
                  event? By joining this event, you cannot cancel later.
                </p>
                <div className="modal-action flex justify-center">
                  <button
                    onClick={handleReserveSeat}
                    className="btn bg-orange-500 text-white hover:bg-orange-600 mx-4"
                  >
                    Confirm
                  </button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventPage;
