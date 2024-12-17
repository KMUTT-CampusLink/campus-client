import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const SectionUpdate = ({ section, professor, onClose }) => {
  const { code } = useParams();
<<<<<<< HEAD
  const [showPopup, setShowPopup] = useState(false);
  const [p, setP] = useState([]);
=======

  const [p, setP] = useState([]);
  const [pro, setPro] = useState(null); // Final selected professor
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [professorName, setProfessorName] = useState(""); // Input field for Professor Name
>>>>>>> 65935f2166a3e2ed4979269be8fa4d77ca8cc0b3
  const [formData, setFormData] = useState({
    firstname: "",
    midname: "",
    lastname: "",
    name: "",
    day: "",
    start_time: "",
    end_time: "",
    room_name: "",
    id: section.id,
  });

  useEffect(() => {
    setFormData({
      firstname: professor?.firstname || "",
      midname: professor?.midname || "",
      lastname: professor?.lastname || "",
      name: section?.name || "",
      day: section?.day || "",
      start_time: section?.start_time || "",
      end_time: section?.end_time || "",
      room_name: section?.room?.name || "",
      id: section.id,
    });

    setPro(professor || null);
    setProfessorName(
      professor
        ? `${professor.firstname} ${professor.midname} ${professor.lastname}`
        : ""
    );
  }, [professor, section]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    });
    setPro(prof);
    setProfessorName(`${prof.firstname} ${prof.middlename} ${prof.lastname}`);
    setFilteredProfessors([]);
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
<<<<<<< HEAD
  },);

  
=======
  }, []);
>>>>>>> 65935f2166a3e2ed4979269be8fa4d77ca8cc0b3

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    const filteredSectionData = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value)
    );

    try {
      const response = await axiosInstance.post(
        `/employ/updateSection/${code}/${id}`,
        filteredSectionData
      );
      console.log("Update Response:", response.data);

      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating section:", error.response?.data || error);
    }
  };
  console.log(pro)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[450px] md:w-[400px] sm:w-[350px] max-h-[75vh] lg:max-h-[100vh] overflow-y-scroll">
        <h2 className="text-center text-xl text-[#D4A015] md:text-2xl font-semibold mb-4 font-geologica">
          Update Section
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 font-geologica">
            <div className="relative">
              <input
                type="text"
                placeholder="Professor Name"
                value={professorName}
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
              className="w-[45%] py-2 text-white font-opensans bg-[#D4A015] font-semibold rounded-md hover:shadow-lg"
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
