import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { fetchAllStops, fetchRoutesConnectingStops } from "../services/api";
import StopSelector from "../components/stopSelector";
import RouteList from "../components/RouteList";

function HomePage() {
  const [startStop, setStartStop] = useState({ id: null, name: "" });
  const [endStop, setEndStop] = useState({ id: null, name: "" });
  const [stops, setStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({});

  // const routes = [
  //   { id: 1, name: "Route 1", description: "" },
  //   { id: 2, name: "Route 2", description: "" },
  //   { id: 3, name: "Route 3", description: "" },
  //   { id: 4, name: "Route 4", description: "" },
  //   { id: 5, name: "Route 5", description: "" },
  // ];

  const handleRouteSearch = () => {
    fetchRoutesConnectingStops(startStop.id, endStop.id).then((data) => {
      setRoutes(data.routes);
    });
  };

  useEffect(() => {
    fetchAllStops().then((data) => {
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
          <div className="w-full max-w-4xl p-2 shadow-md border rounded">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                <StopSelector
                  stops={stops}
                  stop={startStop}
                  setStop={setStartStop}
                  placeholder="From:"
                />
              </div>

              {/* End Stop Input */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                <StopSelector
                  stops={stops}
                  stop={endStop}
                  setStop={setEndStop}
                  placeholder="To:"
                />
              </div>
            </div>
          </div>

          {/* Route List */}
          <div className="w-full max-w-4xl mt-6 max-h-72 overflow-y-auto shadow-md p-4 border rounded">
            <RouteList
              routes={routes}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
          </div>

          {/* Booking Schedule Button */}
          <div>
            <button
              onClick={handleRouteSearch}
              className={
                startStop.id && endStop.id
                  ? "bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
                  : "bg-gray-400 cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
              }
              disabled={!(startStop.id && endStop.id)}
              title={
                !(startStop.id && endStop.id) ? "Please select stops first" : ""
              }
            >
              Search
            </button>
          </div>
          {/* Google Map iframe (Map Box) */}
          <div className="w-full max-w-4xl mt-6">
            <iframe
              className="w-full h-[400px] rounded-lg"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=126%20Pracha%20Uthit%20Rd.,%20Bang%20Mod,%20Thung%20Khru,%20Bangkok%2010140,%20Thailand+(sit%20integrated%20transport%20project)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
