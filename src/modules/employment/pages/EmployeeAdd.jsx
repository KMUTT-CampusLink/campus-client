import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const EmployeeAdd = () => {
  const navigate = useNavigate();
  const handleClickback = () => {
    navigate(`/employ`);
  };

  return (
    <div className="min-h-screen w-full">
      <NavBar/>
      
      <main className="pt-24 px-4 md:px-20">
        <FontAwesomeIcon icon={faArrowLeft} className="hover:shadow-sm md:h-7" onClick={handleClickback}/>
        <div className=" border border-[#939393] rounded-md p-5 space-y-5 md:space-y-7 mt-2 md:mt-4">
          {/* Employee Avatar */}
          <div className="flex justify-center items-center">
              <img
                src="https://techtrickseo.com/wp-content/uploads/2020/08/whatsapp-dp-new.jpg" 
                alt="Employee Avatar"
                className="rounded-full w-36 h-36 md:w-42 md:h-42 object-cover"
              />
          </div>
          <form className="gap-8 ">
            {/* Input Form Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left side form inputs */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="HR MANAGEMENT"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i> {/* Example of an edit icon */}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Position</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="Senior Consultant"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Employee Name</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="Koe Koe"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="SIT"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="JAN 2020"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side form inputs */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="xxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contact No.</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="09xxxxxxxx"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="50000$"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Degree Level</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="Diploma"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" className="ml-2">
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="col-span-2 mt-8 flex justify-center gap-4">
              <button type="button" className="bg-[#D4A015] text-white py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none">
                Cancel
              </button>
              <button type="submit" className="bg-[#D4A015] text-white py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none">
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    

    </div>
  )
}

export default EmployeeAdd