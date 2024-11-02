import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import AddPopUp from "../components/AddPopUp";
import { useState } from 'react'
import axiosInstance from "../utils/axiosInstance.js";

// Map faculty names to numbers
const facultyMapping = {
  'Engineering': 1001,
  'Information_Technology': 1002,
  'Science': 1003,
  'Architecture': 1004,
  'Liberal Art': 1005,
  'Management': 1006,
  'Environmental': 1007,
  'Education': 1008
};



const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    midname: '',
    lastname: '',
    faculty_id: '',
    job_title: '',
    position: '',
    salary: '',
    gender: '',
    date_of_birth: '',
    identification_no: '',
    phone: '',
    address: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleClickback = () => {
    navigate(`/employ/employee`);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSumbit = async (e) => {

    e.preventDefault();

    console.log("Submit button clicked");
    // Debugging: Check if this logs
    setShowPopup(false);

    const facultyNumber = facultyMapping[formData.faculty_id];
    console.log(facultyNumber) 

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
      address: formData.address
    };

    try {
      const response = await axiosInstance.post("/post", employeeData);

      if (response.status === 200) {
        console.log('Employee added successfully');
        setShowPopup(false);
        navigate("/employ");
      } else {
        console.error('Error adding employee:', response.data);
      }
    }
    catch (error) {
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
            <div className="md:flex md:gap-10 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-24">

              {/* Left side form inputs */}
              <div className="w-full">
                <div className="mb-4 ">
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">First Name</label>
                  <div className="flex items-center">
                    <input
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px] "
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Middle Name</label>
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
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Last Name</label>
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

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Faculty</label>
                  <div className="3xl:flex 3xl:flex-col grid grid-cols-1">
                    <div className="flex flex-col 2xl:flex-row">
                      <div>
                        <label htmlFor="Engineering">Engineering</label>
                        <input type="radio" value="Engineering" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Engineering'} className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Information_Technology" >Information_Technology</label>
                        <input type="radio" value="Information_Technology" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Information_Technology'} className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Science" >Science</label>
                        <input type="radio" value="Science" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Science'} className="ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Architecture">Architecture</label>
                        <input type="radio" value="Architecture" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Architecture'} className=" ml-1 mr-5"></input>
                      </div>
                    </div>
                    <div className="flex flex-col 2xl:flex-row">
                      <div>
                        <label htmlFor="Liberal Art" >Liberal Art</label>
                        <input type="radio" value="Liberal Art" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Liberal Art'} className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Management" >Management</label>
                        <input type="radio" value="Management" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Management'} className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Enviromental" >Enviromental</label>
                        <input type="radio" value="Enviromental" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Enviromental'} className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                        <label htmlFor="Education" >Education</label>
                        <input type="radio" value="Education" name="faculty_id" onChange={handleChange} checked={formData.faculty_id === 'Dducation'} className=" ml-1 mr-5"></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Job-title</label>
                  <div className="flex items-center">
                    <input
                      name="job_title"
                      type="text"
                      value={formData.job_title}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Position</label>
                  <div className="flex items-center">
                    <input
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

              </div>

              {/* Right side form inputs */}
              <div className="w-full">

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Salary</label>
                  <div className="flex items-center">
                    <input
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4" >
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Gender</label>
                  <div className="flex items-center ">
                    <label htmlFor="Male">Male</label>
                    <input type="radio" value="Male" name="gender" onChange={handleChange} checked={formData.gender === 'Male'} className=" ml-1 mr-5"></input>
                    <label htmlFor="Female" className="ml-5 md:ml-8">Female</label>
                    <input type="radio" value="Female" name="gender" onChange={handleChange} checked={formData.gender === 'Female'} className=" ml-1 mr-5"></input>
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Date_of_birth</label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Identification_no</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="identification_no"
                      value={formData.identification_no}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Phone_no</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Address</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons Section */}
            <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
              <button onClick={handleClickback} className="bg-[#D9D9D9] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Cancel</button>
              <button type="button" onClick={handleUpdateClick} className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Add</button>
            </div>
          </form>
        </div>
      </main>

      {showPopup && <AddPopUp a={handleSumbit} onClose={handleClosePopup} />}
    </div>
  )
}

export default EmployeeAdd;