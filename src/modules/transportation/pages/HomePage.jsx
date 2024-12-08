import React, { useEffect, useState } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  fetchAllStops,
  fetchRoutesConnectingStops,
  fetchTripsByRouteID,
} from "../services/api";
import StopSelector from "../components/StopSelector";
import RouteList from "../components/RouteList";
import TripList from "../components/ScheduleList";

function HomePage() {
  const [startStop, setStartStop] = useState({ id: null, name: "" });
  const [endStop, setEndStop] = useState({ id: null, name: "" });
  const [stops, setStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({});
  const [trips, setTrips] = useState([]);

  //fetch routes connecting the selected stops
  const handleRouteSearch = () => {
    fetchRoutesConnectingStops(startStop.id, endStop.id).then((data) => {
      // console.log(data.routes);
      setRoutes(data.routes);
    });
  };

  //fetch stops for dropdown menus
  useEffect(() => {
    fetchAllStops().then((data) => {
      setStops(data.stops);
    });
  }, []);

  //fetch routes when start and end stops are selected
  useEffect(() => {
    if (startStop.id && endStop.id) {
      setSelectedRoute({});
      handleRouteSearch();
    }
  }, [startStop, endStop]);

  //fetch Trip/trips for selected route
  useEffect(() => {
    if (!selectedRoute.id) return;
    fetchTripsByRouteID(selectedRoute.id).then((data) => {
      setTrips(data.trips);
      // console.log(`trips for route: ${data.trips}`);
    });
  }, [selectedRoute]);

  return (
    <div className="min-h-screen font-geologica">
      <NavBar />

      <main className="mx-auto max-w-7xl pt-20 pb-6 w-4/5">
        <div className="flex flex-col justify-center items-center space-y-6">
          {/* Heading and Route Selection Input Fields */}
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            Search Routes
          </h1>

          {/* Route Selection Dropdowns */}
          <div className="w-full max-w-4xl">
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
          <div className="w-full max-w-4xl mt-6 max-h-[25rem] overflow-y-auto p-4 border-[2px] rounded">
            <RouteList
              routes={routes}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
          </div>

          {/* Trip List for selected route */}
          {selectedRoute.id && (
            <div className="w-full max-w-4xl mt-6 max-h-[25rem] overflow-y-auto p-4 border-[2px] rounded">
              <h2 className="text-xl font-semibold mb-4">
                Trips for Route: {selectedRoute.name}
              </h2>
              <TripList trips={trips} />
            </div>
          )}

          {/* Booking Trip Button */}
          {/* <div>
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
              Book
            </button>
          </div> */}

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
