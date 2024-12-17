import React, { useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const SectionAdd = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    midname:  "",
    lastname:"",
    name: "",
    day: "",
    start_time: "",
    end_time: "",
    room_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {...formData};
    
        try {
          const response = await axiosInstance.post(
            `/employ/updateSection/${code}`,
            data
          );
          console.log("Update Response:", response.data);
          onClose(); 
        } catch (error) {
          console.error("Error Create section:", error.response?.data || error);
        }
    onClose()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[450px] md:w-[400px] sm:w-[350px] max-h-[75vh] lg:max-h-[100vh] overflow-y-scroll">
        <h2 className="text-center text-xl text-[#D4A015] md:text-2xl font-semibold mb-4 font-geologica">Add Section</h2>
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
              name="room_id"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionAdd;
