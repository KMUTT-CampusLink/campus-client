import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { FaMapMarkerAlt, FaBus, FaShuttleVan, FaBicycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";

function HomePage() {
  const [fromStop, setFromStop] = useState(2);
  const [toStop, setToStop] = useState(3);

  const [transportMode, setTransportMode] = useState("");
  const handleSelectMode = (mode) => {
    setTransportMode(mode);
    console.log(`Selected Mode: ${mode}`);
  };

  // useEffect(() => {
  // const fetch = async () => {
  //   const data = await axiosInstance
  //     .post("transport/user/routesConnectingStops", {
  //       start_stop_id: fromStop,
  //       end_stio_id: toStop,
  //     })
  //     .then((res) => res.data);
  //   console.log(data);
  // };
  //   fetch();
  // }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        <div className="flex flex-col justify-center items-center space-y-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800">Get Routes</h1>

          {/* Route Selection Input Fields */}
          <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm">
              {/* From Route Input */}
              <div className="relative mb-4">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  placeholder="From Route"
                  className="w-full py-2 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>

              {/* To Route Input */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  placeholder="To Route"
                  className="w-full py-2 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Transport Mode Icons */}
          <div className="flex space-x-6 mt-4">
            {/* Bus Icon */}
            <div
              className={`cursor-pointer p-4 rounded-full shadow-lg ${
                transportMode === "bus"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleSelectMode("bus")}
            >
              <FaBus className="text-3xl" />
            </div>

            {/* Mini Van Icon */}
            <div
              className={`cursor-pointer p-4 rounded-full shadow-lg ${
                transportMode === "van"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleSelectMode("van")}
            >
              <FaShuttleVan className="text-3xl" />
            </div>

            {/* Bicycle Icon */}
            <div
              className={`cursor-pointer p-4 rounded-full shadow-lg ${
                transportMode === "bicycle"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleSelectMode("bicycle")}
            >
              <FaBicycle className="text-3xl" />
            </div>
          </div>

          {/* Google Map iframe (Map Box) */}
          <div className="w-full max-w-4xl mt-6">
            <iframe
              className="w-full h-[400px] rounded-lg"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=126%20Pracha%20Uthit%20Rd.,%20Bang%20Mod,%20Thung%20Khru,%20Bangkok%2010140,%20Thailand+(sit%20integrated%20transport%20project)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              allowFullScreen
            />
          </div>

          {/* Booking Schedule Button */}
          <Link
            to={{
              pathname: "/transport/test",
            }}
            state={{ start_stop_id: fromStop, end_stop_id: toStop }}
          >
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
              Search routes
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
