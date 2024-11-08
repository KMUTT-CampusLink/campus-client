import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useParams, useNavigate } from "react-router-dom";
import UpdatePopUp from "../components/UpdatePopUp";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";

// Map faculty names to numbers
const facultyMapping = {
  Engineering: 1001,
  Information_Technology: 1010,
  Science: 1011,
  Architecture: 1009,
  "Liberal Art": 1002,
  Business: 1012,
  Environmental: 1008,
  Education: 1007,
};

const facultyMappingName = {
  1001: "Engineering",
  1010: "Information_Technology",
  1011: "Science",
  1009: "Architecture",
  1002: "Liberal Art",
  1008: "Environmental",
  1007: "Education",
};

const jobTitles = ["Student", "Professor", "Management", "Staff", "Driver"];

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);

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
    const fetchData = async () => {
      try {
        const result = await fetch(
          `http://localhost:3000/api/employ/getEmp/${id}`
        );
        const jsonResult = await result.json();

        setEmployees(jsonResult);
        setFormData({
          firstname: jsonResult.firstname || "",
          midname: jsonResult.midname || "",
          lastname: jsonResult.lastname || "",
          faculty_id: jsonResult.faculty_id || "",
          job_title: jsonResult.job_title || "",
          position: jsonResult.position || "",
          salary: jsonResult.salary || "",
          gender: jsonResult.gender || "",
          date_of_birth: jsonResult.date_of_birth || "",
          //identification_no: jsonResult.identification_no || "",
          //phone: jsonResult.phone || "",
          //address: jsonResult.address || "",
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [id]);
  const facultyName = facultyMappingName[formData.faculty_id];

  console.log("Employee get Data: " + employees);

  // Validation function to check for form errors (without required checks)
  const validateForm = () => {
    const errors = {};

    // First Name validation: only letters if provided
    if (formData.firstname && !/^[a-zA-Z]+$/.test(formData.firstname))
      errors.firstname = "First name must contain only letters";

    // Middle Name validation: only letters if provided
    if (formData.midname && !/^[a-zA-Z]+$/.test(formData.midname))
      errors.midname = "Middle name must contain only letters";

    // Last Name validation: only letters if provided
    if (formData.lastname && !/^[a-zA-Z]+$/.test(formData.lastname))
      errors.lastname = "Last name must contain only letters";

    // Position validation: only letters and spaces if provided
    if (formData.position && !/^[a-zA-Z\s]+$/.test(formData.position))
      errors.position = "Position must contain only letters and spaces";

    // Identification No validation: numeric if provided
    if (
      formData.identification_no &&
      !/^[a-zA-Z0-9]+$/.test(formData.identification_no)
    )
      errors.identification_no = "Identification number must be alphanumeric";

    // Phone validation: 10-15 digits if provided
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone))
      errors.phone = "Phone number must be between 10 and 15 digits";

    // Validate date of birth (cannot be in the future)
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob > today) {
        errors.date_of_birth = "Date of birth cannot be in the future";
      }
    }

    setErrors(errors); // Update state with errors
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleClickback = () => {
    navigate(`/employ/employeeDetail/${id}`);
  };
  const handleUpdateClick = (e) => {
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
    if (!validateForm()) return;
    console.log("Submit button clicked");
    // Debugging: Check if this logs
    setShowPopup(false);

    const facultyNumber = facultyMapping[formData.faculty_id];
    console.log(facultyNumber);

    const employeeData = {
      firstname: formData.firstname,
      midname: formData.midname,
      lastname: formData.lastname,
      faculty_id: facultyNumber,
      job_title: formData.job_title,
      position: formData.position,
      salary: formData.salary,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      identification_no: formData.identification_no,
      phone: formData.phone,
      address: formData.address,
    };

    console.log("Employee Data:", employeeData);

    const filteredEmployeeData = Object.fromEntries(
      Object.entries(employeeData).filter(([key, value]) => value)
    );

    console.log("Filtered Employee Data:", filteredEmployeeData);

    try {
      const response = await axiosInstance.post(
        "/updateEmp/" + id,
        filteredEmployeeData
      );
      if (response.status === 200) {
        console.log("Employee update successfully");
        setShowPopup(false);
        navigate("/employ/employeeDetail/" + id);
      } else {
        console.error("Error updating employee:", response.data);
      }
    } catch (error) {
      console.error("Cannot update user:", error);
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

          <div className="flex justify-center">{id}</div>

          <form className=" text-[#7F483C]">
            <div className="md:flex md:gap-10 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24">
              {/* Left side form inputs */}
              <div className="w-full">
                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    First Name
                  </label>
                  <input
                    name="firstname"
                    type="text"
                    placeholder={employees.firstname || "Enter First Name"}
                    value={formData.firstname || ""} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px] "
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs">{errors.firstname}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Middle Name
                  </label>
                  <input
                    name="midname"
                    type="text"
                    placeholder={employees.midname || "Enter Middle Name"}
                    value={formData.midname || ""} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.midname && (
                    <p className="text-red-500 text-xs">{errors.midname}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastname"
                    type="text"
                    placeholder={employees.lastname || "Enter Last Name"}
                    value={formData.lastname || ""} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs">{errors.lastname}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Faculty
                  </label>
                  <select
                    name="faculty_id"
                    value={facultyName || ""} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  >
                    <option value="" disabled>
                      Select Faculty
                    </option>
                    {Object.keys(facultyMapping).map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Title as Dropdown */}
                <div className="mb-4">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Job Title
                  </label>
                  <select
                    name="job_title"
                    value={formData.job_title || ""} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  >
                    <option value="" disabled>
                      Select Job Title
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
                    placeholder={formData.position || "Enter Position"}
                    value={formData.position} // Use value from state
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-xs">{errors.position}</p>
                  )}
                </div>
              </div>

              {/* Right side form inputs */}
              <div className="w-full">
                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Salary
                  </label>
                  <div className="flex items-center">
                    <input
                      name="salary"
                      type="number"
                      placeholder={formData.salary || "Enter Salary"}
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

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
                      checked={formData.gender === "Male" || ""}
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
                      checked={formData.gender === "Female" || ""}
                      className=" ml-1 mr-5"
                    ></input>
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Date_of_birth
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-xs">
                      {errors.date_of_birth}
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
                      placeholder={formData.identification_no || "Enter ID"}
                      value={formData.identification_no || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {errors.identification_no && (
                    <p className="text-red-500 text-xs">
                      {errors.identification_no}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Phone_no
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="phone"
                      placeholder={employees.phone || "Enter Phone Number"}
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">
                    Address
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="address"
                      placeholder={employees.address || "Enter Address"}
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs">{errors.address}</p>
                  )}
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
                onClick={handleUpdateClick}
                className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>

      {showPopup && <UpdatePopUp a={handleSumbit} onClose={handleClosePopup} />}
    </div>
  );
};

export default EmployeeUpdate;
