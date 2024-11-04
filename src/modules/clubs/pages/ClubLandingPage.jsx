import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance"
import ClubCard from "../components/ClubCard"; // Assuming you have a ClubCard component

function ClubLandingPage() {
  // State to hold the search input and clubs data
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState([]); // Initialize clubs as an empty array

  // Fetch clubs data from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axiosInstance.get("/clubs/");
        // Ensure you're getting the correct part of the response
        setClubs(response.data?.data || []); // Fallback to an empty array if response.data.data is undefined
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setClubs([]); // In case of error, set clubs to an empty array to prevent undefined issues
      }
    };
    fetchClubs();
  }, []);

  // Filter clubs based on the search term
  const filteredClubs = Array.isArray(clubs)
    ? clubs.filter((club) =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []; // Ensure filteredClubs is an array even if clubs is not

  return (
    <>
      <div className="mx-auto w-full pt-10 pb-6 bg-white flex flex-col items-center justify-center">
        {/* Search Bar */}
        <div className="flex items-center justify-center w-[65%]">
          <div className="relative">
            <span className="absolute left-[0.8rem] -top-[0.5rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10A7 7 0 1 0 3 10a7 7 0 0 0 14 0z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Displaying filtered clubs */}
        <div className="bg-white mt-12 flex flex-wrap justify-center items-center p-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-8">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id} // Use a unique key (id)
                clubName={club.name}
                imageSrc={club.club_img}
                clubId={club.id} // Pass the club id for dynamic URL generation
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubLandingPage;