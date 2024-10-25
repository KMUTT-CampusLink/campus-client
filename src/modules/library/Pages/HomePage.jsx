import React, { useState, useEffect, useRef } from "react";
import MainWallpaper from "../components/MainWallpaper";
import AnnouncementCard from "../components/Card/AnnouncementCard";
import EventCard from "../components/Card/EventCard";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";

function HomePage() {
  const [libraryAnnouncement, setLibraryAnnouncement] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/library/announce`
        );
        setLibraryAnnouncement(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const [libraryEvents, setlibraryEvents] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/library/event`
        );
        setlibraryEvents(response.data);
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className=" pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <MainWallpaper className="hidden md:block" />
        {/* Announcements Section */}
        <div className="bg-orange-500">
          <div className="p-6 mx-auto max-w-[1600px]">
            <AnnouncementCard announcements={libraryAnnouncement} />
          </div>
        </div>

        {/* Events Section */}
        <div className="">
          <div className="container mx-auto p-6 ">
            <h1 className="font-semibold text-4xl">
              Library <span className="text-orange-600">Events</span>
            </h1>
          </div>
          <div className="bg-neutral-100 p-6 rounded-xl">
            <div className="container mx-auto bg-white h-full overflow-hidden">
              <Swiper
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {libraryEvents.map((event, index) => (
                  <SwiperSlide key={index}>
                    <EventCard event={event} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
