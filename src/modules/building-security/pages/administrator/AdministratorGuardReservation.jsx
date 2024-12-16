import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import CenteredBox from "../../components/CenteredBox";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function AdministratorGuardReservation() {
  const [buildingData, setBuildingData] = useState([]);
  const [guardData, setGuardData] = useState([]);
  const [building, setBuilding] = useState("");
  const [guard, setGuard] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGBuildingData = async () => {
      try {
        const response = await axiosInstance.get("/security/gbuildings");
        const sortedBuildings = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setBuildingData(sortedBuildings);
      } catch (error) {
        console.error("Error fetching building data:", error);
        setError("Failed to load building data. Please try again.");
      }
    };

    fetchGBuildingData();
  }, []);

  const handleBuildingChange = async (event) => {
    const selectedBuildingId = event.target.value;
    setBuilding(selectedBuildingId);
    setGuard("");
  };

  const handleGuardChange = async (event) => {
    const selectedGuardId = event.target.value;
    setGuard(selectedGuardId);
  };

  useEffect(() => {
    const fetchGuardData = async () => {
      try {
        const response = await axiosInstance.get("/security/guards");
        setGuardData(response.data);
      } catch (error) {
        console.error("Error fetching guard data:", error);
        setError("Failed to load guard data. Please try again.");
      }
    };

    fetchGuardData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      buildingId: building,
      guardId: guard,
      details: description,
    };

    console.log("Booking Data:", bookingData);

    try {
      const response = await axiosInstance.post(
        "/security/gbookings",
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
            onClick={() => navigate("/security/administrator/guardreservationlist")}
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

          <h1 className="absolute text-2xl font-bold top-5">
            Guard Reservation
          </h1>
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

            {/* Guard Select */}
            <div className="w-full form-control">
              <label className="label" htmlFor="guard">
                <span className="label-text">Guard</span>
              </label>
              <select
                id="guard"
                value={guard}
                onChange={handleGuardChange}
                className="w-full select select-bordered"
              >
                <option value="" disabled>
                  Select Guard
                </option>
                {guardData.length > 0 ? (
                  guardData.map((guard) => (
                    <option key={guard.id} value={guard.id}>
                      {guard.fullName}{" "}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
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
