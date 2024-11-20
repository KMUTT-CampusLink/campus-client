import React, { useState, useEffect } from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function StudentMaintenanceRequest() {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Pending");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axiosInstance.get(
          "/security//buildingsWithRoom"
        );
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
    setBuilding(event.target.value);
    setFloor("");
    setRoom("");
    setFloorData([]);
    setRoomData([]);

    try {
      const response = await axiosInstance.get(
        `/security/floors/${event.target.value}`
      );
      setFloorData(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching floors:", error);
      setError("Failed to load floor data.");
    }
  };

  const handleFloorChange = async (event) => {
    setFloor(event.target.value);
    setRoom("");

    try {
      const response = await axiosInstance.get(
        `/security/rooms/${event.target.value}`
      );
      setRoomData(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load room data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maintenanceRequest = {
      room_id: parseInt(room, 10),
      type,
      priority,
      status,
      description,
    };

    try {
      await axiosInstance.post(
        "/security/addMaintenanceList",
        maintenanceRequest
      );
      alert("Maintenance request submitted successfully!");
      setError(null); // Clear errors
      navigate("/security/student/list");
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
      setError("Failed to submit the request.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={() => navigate("/security/student/")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-[#864E41]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </button>

            <h1 className="text-2xl font-bold">Maintenance Request</h1>

            <button
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={() => navigate("/security/student/list")}
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

          <div className="flex space-x-4 mb-4">
            <div className="form-control flex-1">
              <label htmlFor="building">Building</label>
              <select
                id="building"
                value={building}
                onChange={handleBuildingChange}
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

            <div className="form-control flex-1">
              <label htmlFor="floor">Floor</label>
              <select
                id="floor"
                value={floor}
                onChange={handleFloorChange}
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

          <div className="form-control mb-4">
            <label htmlFor="room">Room</label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
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
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="form-control flex-1">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="HVAC">HVAC</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-control flex-1">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-control mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the maintenance issue"
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
