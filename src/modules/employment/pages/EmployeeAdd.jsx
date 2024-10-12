import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";


const EmployeeAdd = () => {
  const navigate = useNavigate();
  const handleClickback = () => {
    navigate(`/employ`);
  };


  return (
    <div className="w-full min-h-screen mb-7 md:mb-10">
      <NavBar/>
      
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
                  <label className="font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Id</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px] "
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Name</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Faculty</label>
                  <div className="3xl:flex 3xl:flex-col grid grid-cols-1">
                    <div className="flex flex-col 2xl:flex-row">
                      <div>
                      <label for="Engineering">Engineering</label>
                      <input type="radio" value="Engineering" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Information Technology" >Information-Technology</label>
                      <input type="radio" value="Information Technology" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Science" >Science</label>
                      <input type="radio" value="Science" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Architecture">Architecture</label>
                      <input type="radio" value="Architecture" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                    </div>
                    <div className="flex flex-col 2xl:flex-row">
                      <div>
                      <label for="Liberal Art" >Liberal Art</label>
                      <input type="radio" value="Liberal Art" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Management" >Management</label>
                      <input type="radio" value="Management" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Enviromental" >Enviromental</label>
                      <input type="radio" value="Enviromental" name="faculty" className=" ml-1 mr-5"></input>
                      </div>
                      <div>
                      <label for="Education" >Education</label>
                      <input type="radio" value="Education" name="faculty" className=" ml-1 mr-5"></input>
                      </div> 
                    </div>
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Job-title</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Position</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Salary</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right side form inputs */}
              <div className="w-full">
                <div className="mb-4" >
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">faculty</label>
                  <div className="flex items-center ">
                    <label for="Male">Male</label>
                    <input type="radio" value="Male" name="gender" className=" ml-1 mr-5"></input>
                    <label for="Female" className="ml-5 md:ml-8">Female</label>
                    <input type="radio" value="Female" name="gender" className=" ml-1 mr-5"></input>
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Date_of_birth</label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="  font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Identification</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Contact</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className=" font-opensans text-[10px] md:text-[14px] text-[#1A4F6E] mb-2">Address</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-[13px] md:text-[16px]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons Section */}
            <div className="lg:mt-10 flex justify-around lg:justify-center pb-2 pt-4 lg:gap-10">
              <button onClick={handleClickback} className="bg-[#D9D9D9] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Cancel</button>
              <button className="bg-[#D4A015] text-white font-opensans rounded-md w-20 h-8 lg:w-25 lg:h-11 transition hover:shadow-xl shadow-sm">Add</button>
            </div>
          </form>
        </div>
      </main>
    

    </div>
  )
}

export default EmployeeAdd