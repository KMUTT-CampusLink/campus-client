import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";

export default function AdministratorLostAndFound() {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
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
    setFloorData([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lostAndFoundData = {
      floor_id: parseInt(floor, 10),
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
            <h1 className="text-2xl font-bold text-gray-800">Lost And Found</h1>
            <button
              className="p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300"
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
                  onChange={(e) => setFloor(e.target.value)}
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
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div className="mt-2 flex space-x-4">
                {["Lost", "Found", "Returned"].map((s) => (
                  <label key={s} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">{s}</span>
                  </label>
                ))}
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
                placeholder="Provide details about the lost or found item"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md shadow hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
