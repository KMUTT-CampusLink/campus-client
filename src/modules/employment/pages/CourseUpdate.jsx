import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import CourseUpdatePopUp from "../components/CourseUpdatePopUp";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const CourseUpdate = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [courseImage, setCourseImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imgURL, setimgURL] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [course, setCourse] = useState([]);

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
    navigate(`/employ/courseDetail/${code}`);
  };
  const handleAddClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setCourseImage(file || null); // Set to null if no file is selected
    if (file) {
      console.log("File selected:", file); // Debugging info
      const a = URL.createObjectURL(file); // Create a temporary URL for the image
      setimgURL(a);
    }
    setErrors((prevErrors) => ({ ...prevErrors, clubImage: "" })); // Clear errors
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const result = await axiosInstance.get(`employ/getProgram`);
        setPrograms(result.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const result = await axiosInstance.get(
          `employ/getCourseDetail/${code}`
        );
        setCourse(result.data);
        setFormData({
          program_id: result.data.program_id || "",
          name: result.data.name || "",
          description: result.data.description || "",
          objective: result.data.objective || "",
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourse();
    fetchPrograms();
  }, [code]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setShowPopup(false);

    const courseData = { ...formData };

    const filteredCourseData = Object.fromEntries(
      Object.entries(courseData).filter(([key, value]) => value)
    );

    const form = new FormData();
    form.append("data", JSON.stringify(filteredCourseData));
    form.append("courseImage", courseImage);

    try {
      const response = await axiosInstance.postForm(
        `employ/updateCourse/${code}`,
        form
      );

      if (response.status === 200) {
        setShowPopup(false);
        navigate(`/employ/courseDetail/${code}`);
      } else {
        console.error("Error updating Course:", response.data);
      }
    } catch (error) {
      console.error("Cannot update Course:", error);
    }
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-20 md:pt-24 px-7 sm:px-16 lg:px-40">
        <div className="flex justify-center">
          <img
            src={
              imgURL ||
              `${import.meta.env.VITE_MINIO_URL}${
                import.meta.env.VITE_MINIO_BUCKET_NAME
              }/${course.image}`
            }
            alt="course picture"
            className="rounded-lg w-52 h-32 md:w-64 md:h-40 object-cover"
          />
          <label
            htmlFor="fileInput"
            >
              <FontAwesomeIcon icon={faPenToSquare}  className="hover:text-blue-700 ml-2 md:ml-3"/>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden hover:shadow-lg"
                onChange={onFileChange}
              />
            </label>
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
                <select
                  name="program_id"
                  value={formData.program_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                >
                  <option value="" disabled>
                    Select Program
                  </option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
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
              Update
            </button>
          </div>
        </div>
      </main>

      {showPopup && (
        <CourseUpdatePopUp a={handleSumbit} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default CourseUpdate;
