import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const SectionUpdate = ({ section, onClose }) => {
  const { code } = useParams();
  const { name, day, start_time, end_time, room, id, professor } = section;

  const [p, setP] = useState([]); // List of professors
  const [filteredProfessors, setFilteredProfessors] = useState([]); // Filtered list for suggestions
  const [professorName, setProfessorName] = useState(""); // Professor input field
  const [formData, setFormData] = useState({
    firstname: "",
    midname: "",
    lastname: "",
    emp_id: "", // Add professor_id for backend mapping
    name: "",
    day: "",
    start_time: "",
    end_time: "",
    room_name: "",
  });

  // Initialize formData with section data
  useEffect(() => {
    const assignedProfessor = professor?.[0]?.employee || {};

    setFormData({
      firstname: assignedProfessor.firstname || "",
      midname: assignedProfessor.midname || "",
      lastname: assignedProfessor.lastname || "",
      emp_id: assignedProfessor.id || "", // Store professor ID
      name: section?.name || "",
      day: section?.day || "",
      start_time: section?.start_time || "",
      end_time: section?.end_time || "",
      room_name: section?.room?.name || "",
    });

    setProfessorName(
      assignedProfessor.firstname && assignedProfessor.lastname
        ? `${assignedProfessor.firstname} ${assignedProfessor.lastname}`
        : ""
    );
  }, [section, professor]);

  // Fetch list of professors
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

  // Input changes handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle professor search input
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

  // Select professor from suggestions
  const handleProfessorSelect = (prof) => {
    setFormData((prev) => ({
      ...prev,
      firstname: prof.firstname,
      midname: prof.middlename,
      lastname: prof.lastname,
      emp_id: prof.id, // Set professor ID
    }));
    setProfessorName(`${prof.firstname} ${prof.lastname}`);
    setFilteredProfessors([]);
  };

  // Submit updated section data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated data to backend
      const response = await axiosInstance.post(
        `employ/updateSection/${code}/${section.id}`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Section updated successfully:", response.data);
        onClose(); // Close the modal
        location.reload(); // Reload the page
      } else {
        console.error("Failed to update section:", response.status);
      }
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Failed to update the section. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[450px] md:w-[400px] sm:w-[350px]">
        <h2 className="text-center text-xl text-[#D4A015] font-semibold mb-4">
          Update Section
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Professor Name Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Professor Name"
                value={professorName}
                onChange={handleProfessorNameChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {filteredProfessors.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto w-full">
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
              placeholder="Section Name"
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              placeholder="Day"
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="text"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              placeholder="Start Time (e.g., 16:00:00)"
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              placeholder="End Time (e.g., 18:00:00)"
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="text"
              name="room_name"
              value={formData.room_name}
              onChange={handleInputChange}
              placeholder="Room Name"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-[45%] py-2 text-black border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[45%] py-2 text-white bg-[#D4A015] rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionUpdate;
