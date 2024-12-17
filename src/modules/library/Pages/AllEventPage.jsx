import React, { useState, useEffect } from "react";
import EventPageCard from "../components/Card/EventPageCard"; // Create an EventCard component if not already present
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainNavbar from "../components/MainNavbar";
import { fetchEvents } from "../services/api"; // Import the fetchEvents function

function AllEventPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest"); // Default is "newest"
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fetch events data
  const getEventData = async () => {
    const response = await fetchEvents();
    setEvents(response || []); // Ensure events is always an array
    setFilteredEvents(response || []); // Ensure filteredEvents is always an array
  };

  useEffect(() => {
    getEventData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "newest") {
      // Sort by newest to oldest
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "oldest") {
      // Sort by oldest to newest
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredEvents(filtered);
  }, [searchQuery, sortOption, events]);

  // Group events by date
  const groupedEvents = (filteredEvents || []).reduce((acc, event) => {
    const date = new Date(event.updated_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  return (
    <div className="min-w-[850px]">
      <NavBar />
      <main className="pt-20 pb-6 mx-auto -z-10">
        <MainNavbar />
        <div className="mx-auto p-4 bg-white min-w-[530px] container">
          {/* Search and sort section */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search events..."
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

          {/* Events grouped by date */}
          {Object.keys(groupedEvents).map((date) => (
            <div key={date}>
              <h3 className="text-xl font-semibold mb-4">{date}</h3>
              <div>
                {groupedEvents[date].map((event) => (
                  <EventPageCard
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    event_date={event.event_date}
                    location={event.location}
                    image={event.image}
                    source={event.source}
                    event={event}
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

export default AllEventPage;
