import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import AddPopUp from "../components/AddPopUp";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { z } from "zod";

const schema = z.object({
  poster: z
    .any()
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file[0]?.size < 10_485_760, "Poster file at most 5MB")
    .refine((file) => {
      const fileType = file[0]?.type.split("/").pop();
      const allowedExtension = /^(jpe?g|png|gif|webp|avif)$/;
      return allowedExtension.test(fileType);
    }, "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, AVIF."),
});

const jobTitles = ["Professor", "Management", "Staff", "Driver"];

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [faculties, setFaculties] = useState([]);

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

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const result = await axiosInstance.get(`employ/getFaculty`);
        setFaculties(result.data);
        //console.log(result.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const validateForm = () => {
    const errors = {};
    const namePattern = /^[a-zA-Z\s'-]+$/;
    const positionPattern = /^[a-zA-Z\s'-]+$/;
    const phonePattern = /^[0-9]{10,15}$/;
    const idPattern = /^[a-zA-Z0-9]+$/;
    const postalCodePattern = /^[0-9]{5}$/;

    // Validate name fields
    if (!formData.firstname || !namePattern.test(formData.firstname)) {
      errors.firstname =
        "First name is required and should contain only letters.";
    }
    if (formData.midname && !namePattern.test(formData.midname)) {
      errors.midname = "Middle name should contain only letters.";
    }
    if (!formData.lastname || !namePattern.test(formData.lastname)) {
      errors.lastname =
        "Last name is required and should contain only letters.";
    }

    // Validate faculty
    if (!formData.faculty_id) {
      errors.faculty_id = "Please select a faculty.";
    }

    // Validate job title
    if (!formData.job_title) {
      errors.job_title = "Job title is required.";
    }

    // Validate position
    if (!formData.position) {
      // Required validation for position
      errors.position = "Position is required.";
    } else if (!positionPattern.test(formData.position)) {
      errors.position = "Position should contain only letters.";
    }

    // Validate salary
    if (!formData.salary || formData.salary <= 0) {
      errors.salary = "Salary is required and must be a positive number.";
    }

    // Validate gender
    if (!formData.gender || !["Male", "Female"].includes(formData.gender)) {
      errors.gender = "Gender must be selected.";
    }

    // Validate date of birth
    if (!formData.date_of_birth) {
      errors.date_of_birth = "Date of birth is required.";
    } else {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob > today) {
        errors.date_of_birth = "Date of birth cannot be in the future.";
      }
    }

    // Validate identification number
    if (
      !formData.identification_no ||
      !idPattern.test(formData.identification_no)
    ) {
      errors.identification_no =
        "Identification number is required and should be alphanumeric.";
    }

    // Validate phone number
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      errors.phone =
        "Phone number is required and should contain 10-15 digits.";
    }

    // --- New Address Field Validations ---
    if (!formData.address) {
      errors.address = "Address is required.";
    }
    if (!formData.sub_district) {
      errors.sub_district = "Sub-district is required.";
    }
    if (!formData.district) {
      errors.district = "District is required.";
    }
    if (!formData.province) {
      errors.province = "Province is required.";
    }
    if (
      !formData.postal_code ||
      !postalCodePattern.test(formData.postal_code)
    ) {
      errors.postal_code = "Postal Code is required and must be 5 digits.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClickback = () => {
    navigate(`/employ/employee`);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only show popup if form is valid
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    //console.log("Submit button clicked");
    // Debugging: Check if this logs
    setShowPopup(false);

    //const facultyNumber = facultyMapping[formData.faculty_id];
    // console.log(facultyNumber);
    //console.log(formData.faculty_id);

    const employeeData = {
      firstname: formData.firstname,
      midname: formData.midname,
      lastname: formData.lastname,
      faculty_id: formData.faculty_id,
      job_title: formData.job_title,
      position: formData.position,
      salary: formData.salary,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      identification_no: formData.identification_no,
      phone: formData.phone,
      address: formData.address,
      sub_district: formData.sub_district,
      province: formData.province,
      district: formData.district,
      postal_code: formData.postal_code,
    };

    try {
      const response = await axiosInstance.post(
        "/employ/postEmp",
        employeeData
      );

      if (response.status === 200) {
        //console.log("Employee added successfully");
        setShowPopup(false);
        navigate("/employ/employee");
      } else {
        console.error("Error adding employee:", response.data);
      }
    } catch (error) {
      console.error("Cannot create user:", error);
    }
  };

  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar />

      <main className="pt-16 md:pt-20 px-5 md:px-20 ">
        <div className=" space-y-5 md:space-y-7 mt-2 md:mt-4">
          {/* Employee Avatar */}
          <div className="flex justify-center">
            <img
              src="https://techtrickseo.com/wp-content/uploads/2020/08/whatsapp-dp-new.jpg"
              alt="Employee Avatar"
              className="rounded-full w-36 h-36 md:w-42 md:h-42 object-cover"
            />
          </div>
          <form className=" text-[#7F483C]">
            <div className="sm:flex sm:gap-10 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24">
              {/* Left side form inputs */}
              <div className="w-full">
                <div className="mb-4 ">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    First Name
                  </label>
                  <div className="flex items-center">
                    <input
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px] "
                    />
                  </div>
                  {validationErrors.firstname && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.firstname}
                    </p>
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
                  {validationErrors.midname && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.midname}
                    </p>
                  )}
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
                  {validationErrors.lastname && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.lastname}
                    </p>
                  )}
                </div>

                {/* 1 */}
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
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                  {validationErrors.faculty_id && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.faculty_id}
                    </p>
                  )}
                </div>
                {/* 2 */}

                <div className="mb-4 ">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Role
                  </label>
                  <div className="flex items-center">
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
                  {validationErrors.job_title && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.job_title}
                    </p>
                  )}
                </div>

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Position
                  </label>
                  <div className="flex items-center">
                    <input
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {validationErrors.position && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.position}
                    </p>
                  )}
                </div>

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Salary
                  </label>
                  <div className="flex items-center">
                    <input
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {validationErrors.salary && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.salary}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Identification_no
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="identification_no"
                      value={formData.identification_no}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {validationErrors.identification_no && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.identification_no}
                    </p>
                  )}
                </div>
              </div>

              {/* Right side form inputs */}
              <div className="w-full">
                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Gender
                  </label>
                  <div className="flex items-center ">
                    <label htmlFor="Male">Male</label>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      onChange={handleChange}
                      checked={formData.gender === "Male"}
                      className=" ml-1 mr-5"
                    ></input>
                    <label htmlFor="Female" className="ml-5 md:ml-8">
                      Female
                    </label>
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      onChange={handleChange}
                      checked={formData.gender === "Female"}
                      className=" ml-1 mr-5"
                    ></input>
                  </div>
                  {validationErrors.gender && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.gender}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Date_of_birth
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {validationErrors.date_of_birth && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.date_of_birth}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Phone_no
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.phone}
                    </p>
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
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                      />
                    </div>
                    {validationErrors.address && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.address}
                      </p>
                    )}
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
                    {validationErrors.sub_district && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.sub_district}
                      </p>
                    )}
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
                    {validationErrors.district && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.district}
                      </p>
                    )}
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
                    {validationErrors.province && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.province}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
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
                    {validationErrors.postal_code && (
                      <p className="text-red-500 text-xs">
                        {validationErrors.postal_code}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
          </form>
        </div>
      </main>

      {showPopup && <AddPopUp a={handleSumbit} onClose={handleClosePopup} />}
    </div>
  );
};

export default EmployeeAdd;
