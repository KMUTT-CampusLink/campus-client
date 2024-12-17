import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import UpdatePopUp from "../components/UpdatePopUp";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const jobTitles = ["Professor", "Management", "Staff", "Driver"];

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [empImage, setempImage] = useState(null);
  const [error, setError] = useState({});
  const [imgURL, setimgURL] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    midname: "",
    lastname: "",
    faculty_id: "",
    job_title: "",
    position: "",
    salary: "",
    gender: "",
    date_of_birth: "",
    identification_no: "",
    phone: "",
    address: "",
    sub_district: "",
    district: "",
    province: "",
    postal_code: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const result = await axiosInstance.get(`employ/getEmp/${id}`);
        setEmployees(result.data);
        setFormData({
          firstname: result.data.firstname || "",
          midname: result.data.midname || "",
          lastname: result.data.lastname || "",
          faculty_id: result.data.faculty_id || "",
          job_title: result.data.job_title || "",
          position: result.data.position || "",
          salary: result.data.salary || "",
          gender: result.data.gender || "",
          date_of_birth: result.data.date_of_birth || "",
          identification_no: result.data.identification_no || "",
          phone: result.data.phone || "",
          address: result.data.address.address || "",
          sub_district: result.data.address.sub_district || "",
          district: result.data.address.district || "",
          province: result.data.address.province || "",
          postal_code: result.data.address.postal_code || "",
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    const fetchFacultyList = async () => {
      try {
        const response = await axiosInstance.get(`employ/getFaculty`);
        setFacultyList(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchEmployeeData();
    fetchFacultyList();
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (formData.firstname && !/^[a-zA-Z]+$/.test(formData.firstname))
      errors.firstname = "First name must contain only letters";
    if (formData.midname && !/^[a-zA-Z]+$/.test(formData.midname))
      errors.midname = "Middle name must contain only letters";
    if (formData.lastname && !/^[a-zA-Z]+$/.test(formData.lastname))
      errors.lastname = "Last name must contain only letters";
    if (formData.position && !/^[a-zA-Z\s]+$/.test(formData.position))
      errors.position = "Position must contain only letters and spaces";
    if (
      formData.identification_no &&
      !/^[a-zA-Z0-9]+$/.test(formData.identification_no)
    )
      errors.identification_no = "Identification number must be alphanumeric";
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone))
      errors.phone = "Phone number must be between 10 and 15 digits";
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob > today) {
        errors.date_of_birth = "Date of birth cannot be in the future";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickback = () => {
    navigate(`/employ/employeeDetail/${id}`);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setempImage(file || null); // Set to null if no file is selected
    if (file) {
      console.log("File selected:", file); // Debugging info
      const a = URL.createObjectURL(file); // Create a temporary URL for the image
      setimgURL(a);
    }
    //setErrors((prevErrors) => ({ ...prevErrors, clubImage: "" })); // Clear errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowPopup(false);

    const employeeData = { ...formData };

    const filteredEmployeeData = Object.fromEntries(
      Object.entries(employeeData).filter(([key, value]) => value)
    );

    const form = new FormData();
    form.append("data", JSON.stringify(filteredEmployeeData));
    form.append("empImage", empImage);

    //console.log("Filtered Employee Data:", filteredEmployeeData);

    try {
      const response = await axiosInstance.postForm(
        `employ/updateEmp/${id}`,
        form
      );
      if (response.status === 200) {
        //  console.log("Employee updated successfully");
        navigate(`/employ/employeeDetail/${id}`);
      } else {
        console.error("Error updating employee:", response.data);
      }
    } catch (error) {
      console.error("Cannot update user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-16 md:pt-20 px-5 md:px-20 ">
        <div className=" space-y-5 md:space-y-7 mt-2 md:mt-4">
          <div className="flex justify-center">
            <img
              src={
                imgURL ||
                `${import.meta.env.VITE_MINIO_URL}${
                  import.meta.env.VITE_MINIO_BUCKET_NAME
                }/${employees.image}`
              }
              alt="Employee Avatar"
              className="rounded-full w-36 h-36 md:w-42 md:h-42 object-cover"
            />
            <label
            htmlFor="fileInput"
            >
              <FontAwesomeIcon icon={faPenToSquare}  className="hover:text-blue-700"/>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden hover:shadow-lg"
                onChange={onFileChange}
              />
            </label>
          </div>


          <div className="flex justify-center">{id}</div>

          <form className=" text-[#7F483C]">
            <div className="sm:flex sm:gap-10 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24">
              <div className="w-full">
                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    First Name
                  </label>
                  <input
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs">{errors.firstname}</p>
                  )}
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Middle Name
                  </label>
                  <div className="flex items-center">
                    <input
                      name="midname"
                      type="text"
                      value={formData.midname}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Last Name
                  </label>
                  <div className="flex items-center">
                    <input
                      name="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Faculty
                  </label>
                  <select
                    name="faculty_id"
                    value={formData.faculty_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  >
                    <option value="" disabled>
                      Select Faculty
                    </option>
                    {facultyList.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Role
                  </label>
                  <select
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {jobTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Position
                  </label>
                  <input
                    name="position"
                    type="text"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-xs">{errors.position}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Salary
                  </label>
                  <input
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Identification No
                  </label>
                  <input
                    type="text"
                    name="identification_no"
                    value={formData.identification_no}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.identification_no && (
                    <p className="text-red-500 text-xs">
                      {errors.identification_no}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Gender
                  </label>
                  <div className="flex items-center">
                    <label htmlFor="Male">Male</label>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      onChange={handleChange}
                      checked={formData.gender === "Male"}
                      className="ml-1 mr-5"
                    />
                    <label htmlFor="Female" className="ml-5 md:ml-8">
                      Female
                    </label>
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      onChange={handleChange}
                      checked={formData.gender === "Female"}
                      className="ml-1 mr-5"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name={"date_of_birth"}
                    value={
                      formData.date_of_birth
                        ? formatDate(formData.date_of_birth)
                        : ""
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-xs">
                      {errors.date_of_birth}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Phone No
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>

                <div className="border rounded-md px-9 ">
                  <div className="mb-4 mt-4">
                    <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                      Address
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                      Sub-district
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="sub_district"
                        value={formData.sub_district}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                      District
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                      Province
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                      Postal Code
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
              <button
                onClick={handleClickback}
                className="bg-[#D9D9D9] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateClick}
                className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>

      {showPopup && <UpdatePopUp a={handleSubmit} onClose={handleClosePopup} />}
    </div>
  );
};

export default EmployeeUpdate;
