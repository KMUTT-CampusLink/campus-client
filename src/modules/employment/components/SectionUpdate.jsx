import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import CourseUpdatePopUp from "./CourseUpdatePopUp";

const SectionUpdate = ({ section, professor, onClose, onUpdate }) => {
  const { code } = useParams();

  const {p, setP} = useState({});
  const [showPopup, setShowPopup] = useState(false);
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
  console.log(section);
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
      id: section.id, // Ensure room_id is an ID
    });
  }, [professor, section]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPopup(true);
    }
  };


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const result = await axiosInstance.get(employ/fetchProfessor);
        setP(result.data);
      } catch (error) {
        console.error("Error fetching professor data:", error);
      }
    };
    fetchEmployeeData();
  },);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   emp_id: formData.emp_id, // Ensure this is available
    //   name: formData.name,
    //   day: formData.day,
    //   start_time: formData.start_time,
    //   end_time: formData.end_time,
    //   room_name: formData.room_id,
    //   id: formData.id,
    // };

    const payload = { ...formData };
    const filteredSectionData = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value)
    );

    try {
      const response = await axiosInstance.post(
        `/employ/updateSection/${code}`,
        filteredSectionData
      );
      console.log("Update Response:", response.data);
      onUpdate(response.data); // Pass the updated data to the parent component
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating section:", error.response?.data || error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[450px] md:w-[400px] sm:w-[350px] max-h-[75vh] lg:max-h-[100vh] overflow-y-scroll">
        <h2 className="text-center text-xl text-[#D4A015] md:text-2xl font-semibold mb-4 font-geologica">
          Update Section
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 font-geologica">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="midname"
              value={formData.midname}
              onChange={handleInputChange}
              placeholder="Middle Name"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

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
              value={
                formData.date_of_birth ? formatTime(formData.start_time) : ""
              }
              onChange={handleInputChange}
              placeholder="Start Time"
              className="border border-gray-300 rounded-md p-2 w-full"
            />

            <input
              type="text"
              name="end_time"
              value={
                formatTime(formData.end_time)
              }
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
              //onClick={handleUpdateClick}
              className="w-[45%] py-2 text-white font-opensans bg-[#D4A015] font-semibold rounded-md hover:shadow-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {/* {showPopup && (
        <CourseUpdatePopUp a={handleSubmit} onClose={handleClosePopup} />
      )} */}
    </div>
  );
};

export default SectionUpdate;
