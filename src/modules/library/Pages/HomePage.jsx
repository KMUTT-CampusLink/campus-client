import React, { useState, useEffect } from "react";
import MainWallpaper from "../components/MainWallpaper";
import AnnouncementCard from "../components/Card/AnnouncementCard";
import EventCard from "../components/Card/EventCard";
import BrowsebookCard from "../components/Card/BrowsebookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import {
  fetchAnnouncements,
  fetchEvents,
  getData,
  getDuplicate,
} from "../services/api";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function HomePage() {
  const [sortedAnnouncements, setSortedAnnouncements] = useState([]);
  const [libraryEvents, setLibraryEvents] = useState([]);
  const [data, setData] = useState([]);
  const [bookDuplicate, setBookDuplicate] = useState([]);
  const navigate = useNavigate();

  // Fetch announcements data
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const sortedAnnouncements = await fetchAnnouncements(); // Use fetchAnnouncements from api.js
        setSortedAnnouncements(sortedAnnouncements); // Set sorted announcements
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    loadAnnouncements();
  }, []);

  // Fetch events data
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents(); // Use fetchEvents from api.js
        setLibraryEvents(events); // Set events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    loadEvents();
  }, []);

  // Fetch books data
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await getData(); // Use getData from api.js
        setData(books); // Set books data
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, []);

  // Fetch duplicate books data
  useEffect(() => {
    const loadBookDuplicates = async () => {
      try {
        const duplicates = await getDuplicate(); // Use getDuplicate from api.js
        setBookDuplicate(duplicates); // Set book duplicates
      } catch (error) {
        console.error("Error fetching book duplicates:", error);
      }
    };

    loadBookDuplicates();
  }, []);

  return (
    <div className="min-w-[850px]">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10 font-nunito">
        <MainWallpaper className="hidden md:block" />
        <MainNavbar />

        {/* Announcements Section */}
        <div className="bg-white mx-auto">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {sortedAnnouncements.map((announcement, index) => (
              <SwiperSlide key={index}>
                <AnnouncementCard announcement={announcement} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="container  mx-auto text-gray-900 font-bold mt-12 w-[90%]">
          <h1 className="text-4xl font-bold mb-3">Current Events</h1>
          <h3 className="text-2xl text-gray-500 font-semibold">
            Join our event now!
          </h3>

          <div className="container mx-auto bg-white h-full overflow-hidden my-3">
            <Swiper
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
            >
              {libraryEvents.map((event, index) => (
                <SwiperSlide key={index}>
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <h1 className="text-4xl font-bold mb-3">New Arrival</h1>
          <h3 className="text-2xl text-gray-500 font-semibold">
            Did you read our latest book yet?
          </h3>

          {/* Book Container */}
          <div className="container mx-auto p-6 flex flex-col gap-6 items-center rounded-2xl ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
              {data
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 6)
                .map((book) => (
                  <BrowsebookCard
                    key={book.id}
                    book={book}
                    bookDuplicate={bookDuplicate}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
