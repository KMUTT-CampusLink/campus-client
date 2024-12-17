import React, { useState, useEffect } from "react";
import AnnouncementCard from "../components/Card/AnnouncementPageCard";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import { getAnnouncements } from "../services/api";

function AnnouncementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest"); // Default is "newest"
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  const announcementData = async () => {
    const response = await getAnnouncements();
    setAnnouncements(response || []); // Ensure announcements is always an array
    setFilteredAnnouncements(response || []); // Ensure filteredAnnouncements is always an array
  };

  useEffect(() => {
    announcementData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = [...announcements];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (announcement) =>
          announcement.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          announcement.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "newest") {
      // Sort by newest to oldest
      filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (sortOption === "oldest") {
      // Sort by oldest to newest
      filtered.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    }

    setFilteredAnnouncements(filtered);
  }, [searchQuery, sortOption, announcements]);

  // Group announcements by date
  const groupedAnnouncements = (filteredAnnouncements || []).reduce(
    (acc, announcement) => {
      const date = new Date(announcement.updated_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(announcement);
      return acc;
    },
    {}
  );

  return (
    <div className="min-w-[850px]">
      <NavBar />
      <main className=" pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="mx-auto p-4 bg-white min-w-[530px] container">
          {/* Search and sort section */}
          
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full max-w-sm"
            />

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded-md ml-4"
            >
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>

          {/* Announcements grouped by date */}
          {Object.keys(groupedAnnouncements).map((date) => (
            <div key={date}>
              <h3 className="text-xl font-semibold mb-4">{date}</h3>
              <div>
                {groupedAnnouncements[date].map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    title={announcement.title}
                    description={announcement.description}
                    updated={announcement.updated_at}
                    date={announcement.date}
                    location={announcement.location}
                    image={announcement.image}
                    source={announcement.source}
                    duration={announcement.duration}
                    announcement={announcement}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AnnouncementPage;
