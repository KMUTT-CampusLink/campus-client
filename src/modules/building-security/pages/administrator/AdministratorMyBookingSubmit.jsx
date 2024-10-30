import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import buildingData from "../administrator/building_data.json";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";

export default function AdministratorMyBookingSubmit() {
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00 a.m.");
  const [endTime, setEndTime] = useState("11:30 a.m.");

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
    setFloor(""); // Reset floor and room when building changes
    setRoom("");
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
    setRoom(""); // Reset room when floor changes
  };

  const handleRoomChange = (event) => setRoom(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);

  // Find selected building and floor to fetch the appropriate data
  const selectedBuilding = buildingData.buildings.find(
    (bldg) => bldg.id === building
  );
  const selectedFloor = selectedBuilding?.floors.find(
    (flr) => flr.id === floor
  );

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <CenteredBox>
        <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
          <button
            className="absolute top-4 right-4 text-primary bg-white p-2 rounded-full hover:bg-gray-100"
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

          <h1 className="absolute top-5 text-2xl font-bold">My Booking Form</h1>
          <p className="absolute top-12 text-sm">Detailed Information</p>
          <hr className="w-full mt-12 my-3" />

          <form className="flex flex-col gap-4 w-full max-w-md">
            <div className="form-control w-full">
              <label className="label" htmlFor="building">
                <span className="label-text">Building</span>
              </label>
              <select
                id="building"
                value={building}
                onChange={handleBuildingChange}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select Building
                </option>
                {buildingData.buildings.map((bldg) => (
                  <option key={bldg.id} value={bldg.id}>
                    {bldg.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="floor">
                <span className="label-text">Floor</span>
              </label>
              <select
                id="floor"
                value={floor}
                onChange={handleFloorChange}
                className="select select-bordered w-full"
                disabled={!building} // Enabled only if a building is selected
              >
                <option value="" disabled>
                  Select Floor
                </option>
                {selectedBuilding?.floors.map((flr) => (
                  <option key={flr.id} value={flr.id}>
                    {flr.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="room">
                <span className="label-text">Room No.</span>
              </label>
              <select
                id="room"
                value={room}
                onChange={handleRoomChange}
                className="select select-bordered w-full"
                disabled={!floor} // Enabled only if a floor is selected
              >
                <option value="" disabled>
                  Select Room
                </option>
                {selectedFloor?.rooms.map((rm) => (
                  <option key={rm.id} value={rm.id}>
                    {rm.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="date">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-between gap-4">
              <div className="form-control w-1/2">
                <label className="label" htmlFor="start-time">
                  <span className="label-text">Start Time</span>
                </label>
                <select
                  id="start-time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="select select-bordered w-full"
                >
                  <option value="08:00 a.m.">08:00 a.m.</option>
                  <option value="09:00 a.m.">09:00 a.m.</option>
                  <option value="10:00 a.m.">10:00 a.m.</option>
                </select>
              </div>

              <div className="form-control w-1/2">
                <label className="label" htmlFor="end-time">
                  <span className="label-text">End Time</span>
                </label>
                <select
                  id="end-time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  className="select select-bordered w-full"
                >
                  <option value="11:00 a.m.">11:00 a.m.</option>
                  <option value="11:30 a.m.">11:30 a.m.</option>
                  <option value="12:00 p.m.">12:00 p.m.</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary bg-[#864E41] hover:bg-[#6e3f35] w-full"
              onClick={() => navigate("/security/administrator/mybookinglist")}
            >
              Submit
            </button>
          </form>
        </div>
      </CenteredBox>
    </>
  );
}
