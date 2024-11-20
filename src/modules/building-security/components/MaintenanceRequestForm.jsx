import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MaintenanceRequestForm() {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const userId = "2dbd2251-6dcf-4aab-914c-2ecdda5eadd7"; // Temporary user_id

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/security/buildings"
        );
        if (!response.ok) throw new Error("Failed to fetch building data");
        const data = await response.json();
        setBuildingData(data.sort((a, b) => a.name.localeCompare(b.name)));
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
      const response = await fetch(
        `http://localhost:3000/api/security/floors/${event.target.value}`
      );
      if (!response.ok) throw new Error("Failed to fetch floors");
      const data = await response.json();
      setFloorData(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching floors:", error);
      setError("Failed to load floor data.");
    }
  };

  const handleFloorChange = async (event) => {
    setFloor(event.target.value);
    setRoom("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/security/rooms/${event.target.value}`
      );
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRoomData(data.sort((a, b) => a.name.localeCompare(b.name)));
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

    const maintenanceRequest = {
      user_id: userId,
      location: room,
      type,
      priority,
      status,
      description,
      created_at: formattedTimestamp,
      updated_at: formattedTimestamp,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/security/addMaintenanceList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(maintenanceRequest),
        }
      );

      if (!response.ok) throw new Error("Failed to submit maintenance request");
      alert("Maintenance request submitted successfully!");
      navigate("/security/administrator/list");
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
      setError("Failed to submit the request.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative"
    >
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
          onClick={() => navigate("/security/administrator/list")}
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

        <div className="form-control flex-1">
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

      <div className="form-control mb-4">
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
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="form-control flex-1">
          <label className="label" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select select-bordered"
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
          <label className="label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select select-bordered"
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
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered"
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
  );
}
