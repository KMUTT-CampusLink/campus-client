import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function AdministratorLostAndFoundForm() {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Lost"); // Default status
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axiosInstance.get("/security/buildings");
        setBuildingData(
          response.data.sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        console.error("Error fetching building data:", error);
        setError("Failed to load building data.");
      }
    };

    fetchBuildingData();
  }, []);

  const handleBuildingChange = async (event) => {
    const selectedBuildingId = event.target.value;
    setBuilding(selectedBuildingId);
    setFloor("");
    setRoom("");
    setFloorData([]);
    setRoomData([]);

    try {
      const response = await axiosInstance.get(
        `/security/floors/${selectedBuildingId}`
      );
      setFloorData(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching floors:", error);
      setError("Failed to load floor data.");
    }
  };

  const handleFloorChange = async (event) => {
    const selectedFloorId = event.target.value;
    setFloor(selectedFloorId);
    setRoom("");

    try {
      const response = await axiosInstance.get(
        `/security/rooms/${selectedFloorId}`
      );
      setRoomData(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load room data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const offset = currentTime.getTimezoneOffset() + 420; // Adjust to UTC+7
    const localTime = new Date(currentTime.getTime() + offset * 60000);
    const formattedTimestamp =
      localTime.toISOString().replace("T", " ").split(".")[0] + ".0000000";

    const lostAndFoundData = {
      floor,
      description,
      status,
    };

    try {
      await axiosInstance.post(
        "/security/addLostAndFoundList",
        lostAndFoundData
      );
      alert("Lost and Found request submitted successfully!");
      navigate("/security/administrator/lostandfoundlist");
    } catch (error) {
      console.error("Error submitting Lost and Found request:", error);
      setError("Failed to submit the request.");
    }
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Lost And Found Form</h1>
        <p>Detailed information</p>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative"
        >
          {/* Navigation Icons */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={() => navigate("/security/administrator")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#864E41]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>

            <h1 className="text-2xl font-bold">Lost And Found</h1>

            <button
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={() =>
                navigate("/security/administrator/lostandfoundlist")
              }
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#864E41]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h12M6 12h12m-6 6h6"
                />
              </svg>
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Building and Floor on the same line */}
          <div className="flex space-x-4 mb-4">
            <div className="form-control w-1/2">
              <label className="label" htmlFor="building">
                Building
              </label>
              <select
                id="building"
                value={building}
                onChange={handleBuildingChange}
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select Building
                </option>
                {buildingData.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-1/2">
              <label className="label" htmlFor="floor">
                Floor
              </label>
              <select
                id="floor"
                value={floor}
                onChange={handleFloorChange}
                className="select select-bordered"
                disabled={!building}
                required
              >
                <option value="" disabled>
                  Select Floor
                </option>
                {floorData.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="form-control mb-4">
        <label className="label" htmlFor="room">
          Room
        </label>
        <select
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="select select-bordered"
          disabled={!floor}
          required
        >
          <option value="" disabled>
            Select Room
          </option>
          {roomData.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div> */}

          <div className="form-control mb-4">
            <label className="label">Status</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value="Lost"
                  checked={status === "Lost"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="radio"
                />
                <span>Lost</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value="Found"
                  checked={status === "Found"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="radio"
                />
                <span>Found</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value="Returned"
                  checked={status === "Returned"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="radio"
                />
                <span>Returned</span>
              </label>
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered"
              placeholder="Provide details about the lost or found item"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-full bg-[#864E41] hover:bg-[#6e3f35] text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
