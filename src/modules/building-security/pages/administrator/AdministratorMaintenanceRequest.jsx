import React, { useState, useEffect } from "react";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function AdministratorMaintenanceRequest() {
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
        const response = await axiosInstance.get("/security/buildingsWithRoom");
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
      navigate("/security/administrator/list");
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
      setError("Failed to submit the request.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <br />
        <br />
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <button
              className="p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300"
              onClick={() => navigate("/security/administrator")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 011 12h-3"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Maintenance Request
            </h1>
            <button
              className="p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300"
              onClick={() => navigate("/security/administrator/list")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h12M6 12h12m-6 6h6"
                />
              </svg>
            </button>
          </div>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="building"
                  className="block text-sm font-medium text-gray-700"
                >
                  Building
                </label>
                <select
                  id="building"
                  value={building}
                  onChange={handleBuildingChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

              <div className="flex-1">
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Floor
                </label>
                <select
                  id="floor"
                  value={floor}
                  onChange={handleFloorChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

            <div>
              <label
                htmlFor="room"
                className="block text-sm font-medium text-gray-700"
              >
                Room
              </label>
              <select
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

              <div className="flex-1">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Provide details about the maintenance issue"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
