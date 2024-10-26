import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { FaMapMarkerAlt, FaBus, FaShuttleVan, FaBicycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";
import { list } from "postcss";

function HomePage() {
  const [startStop, setStartStop] = useState({ id: null, name: "" });
  const [endStop, setEndstop] = useState({ id: null, name: "" });
  const [stops, setStops] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance.get("/transport/user/queryAllStops");
      return response.data;
    };

    fetch().then((data) => {
      setStops(data.stops);
    });
  }, []);

  const [transportMode, setTransportMode] = useState("");

  const handleSelectMode = (mode) => {
    setTransportMode(mode);
    console.log(`Selected Mode: ${mode}`);
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        <div className="flex flex-col justify-center items-center space-y-6">
          {/* Heading and Route Selection Input Fields */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Search Routes
          </h1>

          {/* Route Selection Dropdowns */}
          <div className="flex mt-4 w-full max-w-3xl">
            <div className="flex-1">
              {/* From Route Dropdown */}
              <div className="relative mb-4">
                {/* Start Stop input */}
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                <select
                  value={startStop.id || ""}
                  onChange={(e) => {
                    const selectedOption =
                      e.target.options[e.target.selectedIndex];
                    setStartStop({
                      ...startStop,
                      id: selectedOption.value,
                      name: selectedOption.text,
                    });
                  }}
                  className="w-full py-2 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:border-orange-400"
                  style={{ borderRadius: "0.25rem", width: "100%" }} // Full width
                >
                  <option value="" disabled>
                    From
                  </option>
                  {stops.map((stop, index) => (
                    <option key={index} value={stop.id}>
                      {stop.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Stop Input */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />

                <select
                  value={endStop.id || ""}
                  onChange={(e) => {
                    const selectedOption =
                      e.target.options[e.target.selectedIndex];
                    setEndstop({
                      ...endStop,
                      id: selectedOption.value,
                      name: selectedOption.text,
                    });
                  }}
                  className="w-full py-2 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:border-orange-400"
                  style={{ borderRadius: "0.25rem", width: "100%" }} // Full width
                >
                  <option value="" disabled>
                    To
                  </option>
                  {stops.map((stop, index) => (
                    <option key={index} value={stop.id}>
                      {stop.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Box for Transport Mode Icons */}
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
              Transport Mode
            </h2>

            {/* Transport Mode Icons */}
            <div className="flex space-x-4 mt-2 justify-center">
              {/* Bus Icon */}
              <div
                className={`cursor-pointer p-2 rounded-full shadow-lg ${
                  transportMode === "bus"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectMode("bus")}
              >
                <FaBus className="text-2xl" />
              </div>

              {/* Mini Van Icon */}
              <div
                className={`cursor-pointer p-2 rounded-full shadow-lg ${
                  transportMode === "van"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectMode("van")}
              >
                <FaShuttleVan className="text-2xl" />
              </div>

              {/* Bicycle Icon */}
              <div
                className={`cursor-pointer p-2 rounded-full shadow-lg ${
                  transportMode === "bicycle"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectMode("bicycle")}
              >
                <FaBicycle className="text-2xl" />
              </div>
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
            state={{ startStop: startStop, endStop: endStop }}
          >
            <button
              //className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
              className={`${
                !startStop.id || !endStop.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-500"
              } text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300`}
              disabled={!startStop.id || !endStop.id}
              title={
                !startStop.id || !endStop.id ? "Please select both stops" : ""
              }
            >
              Search
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;