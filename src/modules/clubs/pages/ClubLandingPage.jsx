import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import ClubCard from "../components/ClubCard"; // Assuming you have a ClubCard component
import { useNavigate } from "react-router-dom";

function ClubLandingPage() {
  // State to hold the search input and clubs data
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState([]); // Initialize clubs as an empty array
  const navigate = useNavigate();
  // Fetch clubs data from backend

  const isLoggedIn = true; // ???Do we need??

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
        <div className="flex items-center justify-between w-[65%] mb-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <span className="absolute left-[0.8rem] top-1/2 transform -translate-y-1/2">
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
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Create Club Button */}
          {isLoggedIn && (
            <button
              className="ml-4 bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
              onClick={() => navigate("/clubs/admin/club-create")}
            >
              Create Club
            </button>
          )}
        </div>

        {/* Displaying filtered clubs */}
        <div className="bg-white mt-12 flex flex-wrap justify-center items-center p-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-8">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id} // Use a unique key (id)
                clubName={club.name}
                imageSrc={`${
                  import.meta.env.VITE_MINIO_URL +
                  import.meta.env.VITE_MINIO_BUCKET_NAME
                }/${club.club_img}`}
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
