import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import CourseAddPopUp from "../components/CourseAddPopUp";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const CourseAdd = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    program_id: "",
    name: "",
    description: "",
    objective: "",
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickback = () => {
    navigate(`/employ/course`);
  };
  const handleAddClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-20 md:pt-24 px-7 sm:px-16 lg:px-40">
        <div className="flex justify-center">
          <img               
            src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
            alt="course picture"
            className="rounded-lg w-52 h-32 md:w-64 md:h-40 object-cover"
          />
        </div>
        <div className=" space-y-5 md:space-y-7">
          <form>
              <div className="grid grid-cols-2 gap-6 mt-4 md:mt-8">
                <div className="sm:col-span-1 col-span-2">
                  <label
                    htmlFor="program_id"
                    className="block text-md md:text-lg font-medium font-geologica "
                  >
                    Program Name
                  </label>
                  <input
                    type="text"
                    id="program_id"
                    name="program_id"
                    value={formData.program_id}
                    onChange={handleChange}
                    className="border-gray-300 border w-full rounded-md shadow-sm text-sm h-9 p-1 "
                    placeholder="Enter program name"
                  />
                </div>

                <div className="sm:col-span-1 col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-md md:text-lg font-medium font-geologica"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-gray-300 border w-full rounded-md shadow-sm text-sm h-9 p-1 "
                    placeholder="Enter course name"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-md md:text-lg font-medium font-geologica"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="border-gray-300 border w-full rounded-md shadow-sm text-sm h-20 sm:h-32 p-1 "
                    placeholder="Enter course description"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="objective"
                    className="block text-md md:text-lg font-medium font-geologica"
                  >
                    Objective
                  </label>
                  <textarea
                    id="objective"
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    rows="4"
                    className="border-gray-300 border h-20 sm:h-32 rounded-md shadow-sm text-sm  p-1 w-full"
                    placeholder="Enter course objective"
                  ></textarea>
                </div>
              </div>
              
            </form>

            {/* Buttons Section */}
            <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
              <button
                onClick={handleClickback}
                className="bg-[#D9D9D9] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddClick}
                className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
              >
                Add
              </button>
            </div>
        </div>
      </main>

      {showPopup && <CourseAddPopUp onClose={handleClosePopup} />}
    </div>
  );
};

export default CourseAdd;
