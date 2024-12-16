import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function AdministratorGuardReservation() {
  const [buildingData, setBuildingData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [availableStartTimes, setAvailableStartTimes] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableEndTimes, setAvailableEndTimes] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Define possible 30-minute time slots from 8:30 AM to 7:00 PM
  const timeSlots = Array.from({ length: 23 }, (_, i) =>
    new Date(0, 0, 0, 8, 30 + i * 30).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  // Fetch building data on component mount
  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axiosInstance.get("/security/buildings");
        const sortedBuildings = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setBuildingData(sortedBuildings);
      } catch (error) {
        console.error("Error fetching building data:", error);
        setError("Failed to load building data. Please try again.");
      }
    };

    fetchBuildingData();
  }, []);

  // Fetch floors based on selected building
  const handleBuildingChange = async (event) => {
    const selectedBuildingId = event.target.value;
    setBuilding(selectedBuildingId);
    setFloor("");
    setRoom("");
    setRoomData([]);

    try {
      const response = await axiosInstance.get(
        `/security/floors/${selectedBuildingId}`
      );
      const sortedFloors = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFloorData(sortedFloors);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  // Fetch rooms based on selected floor
  const handleFloorChange = async (event) => {
    const selectedFloorId = event.target.value;
    setFloor(selectedFloorId);
    setRoom(""); // Reset room selection

    try {
      const response = await axiosInstance.get(
        `/security/rooms/${selectedFloorId}`
      );
      console.log("Rooms API response:", response.data); // Log the response

      const sortedRooms = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setRoomData(sortedRooms);
      console.log("Sorted rooms:", sortedRooms); // Log sorted rooms
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRoomChange = (event) => setRoom(event.target.value);

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    if (room && selectedDate) {
      fetchAvailableTimes(room, selectedDate);
    }
  };

  const fetchAvailableTimes = async (roomId, date) => {
    try {
      const response = await axiosInstance.get(`/security/getAvailableTimes`, {
        params: { roomId, date },
      });

      if (
        response.data.message === "No bookings available for this room and date"
      ) {
        setAvailableStartTimes(timeSlots);
        setAvailableEndTimes([]);
        return;
      }

      setAvailableStartTimes(response.data.availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setError("An error occurred while fetching available times.");
    }
  };

  const handleStartTimeChange = (event) => {
    const selectedStart = event.target.value;
    setStartTime(selectedStart);

    // Find the selected start time index in the timeSlots array
    const startIndex = timeSlots.indexOf(selectedStart);

    // Set available end times from the selected start time onwards, up to 7:30 PM
    setAvailableEndTimes(timeSlots.slice(startIndex + 1));
  };

  const handleEndTimeChange = (event) => setEndTime(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      roomId: room,
      bookingDate: date,
      startTime: `${date}T${startTime}`,
      endTime: `${date}T${endTime}`,
    };

    console.log("Booking Data:", bookingData); // Log the data being sent to the server

    try {
      const response = await axiosInstance.post(
        "/security/bookings",
        bookingData
      );

      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/security/administrator/mybookinglist");
      } else {
        setError(response.data.message || "An error occurred during booking.");
      }
    } catch (error) {
      console.error(
        "Error submitting booking:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      <NavBar />
      <CenteredBox>
        <div className="relative flex flex-col items-center w-full h-full p-6">
          <br />
          {/* Back Icon */}
          <button
            className="absolute p-2 bg-white rounded-full top-4 left-4 text-primary hover:bg-gray-100"
            onClick={() => navigate("/security/administrator")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-[#864E41] size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>

          {/* List Icon */}
          <button
            className="absolute p-2 bg-white rounded-full top-4 right-4 text-primary hover:bg-gray-100"
            onClick={() => navigate("/security/administrator/mybookinglist")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[#864E41]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 6h12M6 12h12m-6 6h6"
              />
            </svg>
          </button>

          <h1 className="absolute text-2xl font-bold top-5">Guard Reservation</h1>
          <p className="absolute text-sm top-12">Detailed Information</p>
          <hr className="w-full my-3 mt-12" />

          <form
            className="flex flex-col w-full max-w-md gap-4"
            onSubmit={handleSubmit}
          >
            {/* Building Select */}
            <div className="w-full form-control">
              <label className="label" htmlFor="building">
                <span className="label-text">Building</span>
              </label>
              <select
                id="building"
                value={building}
                onChange={handleBuildingChange}
                className="w-full select select-bordered"
              >
                <option value="" disabled>
                  Select Building
                </option>
                {buildingData.length > 0 ? (
                  buildingData.map((bldg) => (
                    <option key={bldg.id} value={bldg.id}>
                      {bldg.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>

            {/* Floor Select */}
            <div className="w-full form-control">
              <label className="label" htmlFor="floor">
                <span className="label-text">Floor</span>
              </label>
              <select
                id="floor"
                value={floor}
                onChange={handleFloorChange}
                className="w-full select select-bordered"
                disabled={!building}
              >
                <option value="" disabled>
                  Select Floor
                </option>
                {floorData.map((flr) => (
                  <option key={flr.id} value={flr.id}>
                    {flr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Select */}
            <div className="w-full form-control">
              <label className="label" htmlFor="room">
                <span className="label-text">Room No.</span>
              </label>
              <select
                id="room"
                value={room}
                onChange={handleRoomChange}
                className="w-full select select-bordered"
                disabled={!floor}
              >
                <option value="" disabled>
                  Select Room
                </option>
                {roomData.map((rm) => (
                  <option key={rm.id} value={rm.id}>
                    {rm.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div className="w-full form-control">
              <label className="label" htmlFor="date">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                className="w-full input input-bordered"
              />
            </div>

            {/* Time Inputs */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2 form-control">
                <label className="label" htmlFor="start-time">
                  <span className="label-text">Start Time</span>
                </label>
                <select
                  id="start-time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="w-full select select-bordered"
                  disabled={!date || availableStartTimes.length === 0} // Enable if there are start times
                >
                  <option value="" disabled>
                    Select Start Time
                  </option>
                  {availableStartTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2 form-control">
                <label className="label" htmlFor="end-time">
                  <span className="label-text">End Time</span>
                </label>
                <select
                  id="end-time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  className="w-full select select-bordered"
                  disabled={!startTime || !availableEndTimes.length}
                >
                  <option value="" disabled>
                    Select End Time
                  </option>
                  {availableEndTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary bg-[#864E41] hover:bg-[#6e3f35] w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </CenteredBox>
    </>
  );
}
