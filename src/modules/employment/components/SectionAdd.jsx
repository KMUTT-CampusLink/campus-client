import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const SectionAdd = ({ onClose, onAdd }) => {
  const { code } = useParams();
  const [p, setP] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [professorName, setProfessorName] = useState(""); // New state for input field
  const [formData, setFormData] = useState({
    firstname: "",
    midname: "",
    lastname: "",
    name: "",
    day: "",
    start_time: "",
    end_time: "",
    room_name: "",
    id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "start_time" || name === "end_time") {
      const formattedTime = value.length === 5 ? `${value}:00` : value; // Ensure HH:MM:SS
      setFormData({ ...formData, [name]: formattedTime });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProfessorNameChange = (e) => {
    const value = e.target.value;
    setProfessorName(value);
    setFilteredProfessors(
      p.filter((prof) =>
        `${prof.firstname} ${prof.middlename} ${prof.lastname}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const handleProfessorSelect = (prof) => {
    setFormData({
      ...formData,
      firstname: prof.firstname,
      midname: prof.middlename,
      lastname: prof.lastname,
      id: prof.id,
    });
    setProfessor(prof);
    setProfessorName(`${prof.firstname}  ${prof.lastname}`); // Update input field
    setFilteredProfessors([]); // Hide suggestions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend with formData
      const response = await axiosInstance.post(
        `employ/postSection/${code}`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Section added successfully:", response.data); // Optional: Notify parent component about the new section
        onClose(); // Close the form modal
        location.reload();
      } else {
        console.error("Failed to add section. Status:", response.status);
        alert("Failed to add section. Please try again.");
      }
    } catch (error) {
      console.error("Error adding section:", error);
      alert(
        "An error occurred while adding the section. Please check the inputs and try again."
      );
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const result = await axiosInstance.get(`employ/fetchProfessor`);
        setP(result.data);
      } catch (error) {
        console.error("Error fetching professor data:", error);
      }
    };
    fetchEmployeeData();
  }, []);
  console.log(professor);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[450px] md:w-[400px] sm:w-[350px] max-h-[75vh] lg:max-h-[100vh] overflow-y-scroll">
        <h2 className="text-center text-xl text-[#D4A015] md:text-2xl font-semibold mb-4 font-geologica">
          Add Section
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 font-geologica">
            <div className="relative">
              <input
                type="text"
                placeholder="Professor Name"
                value={professorName} // Bind input value to professorName state
                onChange={handleProfessorNameChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {filteredProfessors.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto w-full">
                  {filteredProfessors.map((prof) => (
                    <li
                      key={prof.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleProfessorSelect(prof)}
                    >
                      {prof.firstname} {prof.middlename} {prof.lastname}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Section"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              placeholder="Day"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              placeholder="Start Time"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              placeholder="End Time"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="room_name"
              value={formData.room_name}
              onChange={handleInputChange}
              placeholder="Classroom"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-[45%] py-2 text-black font-opensans font-semibold border border-gray-300 rounded-md hover:shadow-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-[45%] py-2 text-white font-opensans bg-[#D4A015] font-semibold rounded-md hover:shadow-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionAdd;
