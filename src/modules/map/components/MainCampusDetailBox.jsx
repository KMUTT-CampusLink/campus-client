import DepartmentList from "./DepartmentList";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DepartmentDetailModel from "./DepartmentDetailModal";
import InteractiveMap from "./InteractiveMap";
import '../css/scrollbarhelper.css'

const MainCampusDetailBox = ({ campusNameProp }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({});
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildingResponse, parkingResponse, lostAndFoundResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/map/departments?campusName=${campusNameProp}`),
          axios.get(`${import.meta.env.VITE_API_URL}/map/getParking`),
          axios.get(`${import.meta.env.VITE_API_URL}/map/getAllLostAndFound`),
        ]);
  
        const buildingData = buildingResponse.data.buildings;
        const parkingData = parkingResponse.data;
        const lostAndFoundData = lostAndFoundResponse.data;

  
        const updatedData = buildingData.map((item) => {
          const parkingInfo = parkingData.find((p) => p.id === item.id);
          const lostAndFoundList = lostAndFoundData[item.id]?.lostAndFoundList || [];
  
          return {
            ...item,
            available_parking_slots: parkingInfo
              ? parkingInfo.parking_capacity - parkingInfo.reserved_slots
              : null,
            lostAndFoundList, // Append the lost and found list
          };
        });
  
        setData(updatedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  console.log(data)

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const filtered = data.filter((building) =>
      building.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSearchInput("");
      setFilteredData([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full min-h-screen h-full py-12 md:px-16">
      <h1 className="text-2xl text-center w-ful; lg:w-[80%] mb-6 mx-auto font-extrabold">
        KMUTT Master Plan ({campusNameProp} Campus){" "}
      </h1>

      <div className="mb-8 lg:w-[65%] mx-auto relative">
        <label className="input input-bordered flex items-center gap-2 h-max p-2 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 mx-1 md:mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            className="text-xs grow w-[95%]"
            placeholder="Search for Buildings"
            value={searchInput}
            onChange={handleSearchChange}
            ref={inputRef} // Attach ref to input
          />
        </label>

        {searchInput && filteredData.length > 0 && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 z-50 w-[90%] mx-auto text-xs"
            ref={dropdownRef}
          >
            <div className="menu p-0 h-min bg-base-100 rounded-box ">
              {filteredData.map((building, index) => (
                <li
                  key={building.id}
                  onClick={() => {
                    openModal(building);
                    setSearchInput("");
                    setFilteredData([]);
                  }}
                  className={`cursor-pointer p-2 px-6 hover:bg-gray-400/20 ${
                    index !== filteredData.length - 1 ? "border-b-2" : ""
                  }`}
                >
                  {building.name}
                </li>
              ))}
            </div>
          </div>
        )}
      </div>

      <InteractiveMap allBuildingData={data} openModalProp={openModal} modalDataProp={modalData}/>

      <div className="w-full h-max my-8">
        <DepartmentList openModalProp={openModal} dataProp={data} />
      </div>

      <div className="bth-group w-full grid md:text-xl align-item-center">
        <a
          href="/map/contact"
          className="flex bg-[#864E41] py-1 md:py-2 m-auto rounded-xl text-center justify-self-center w-[55%] md:w-[50%] md:mx-[15%] text-white items-center"
        >
          <div className="mx-auto flex align-middle">
          <span className="">Contact</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 md:w-5 h-4 md:h-5 ml-2 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>
          </div>
        </a>
      </div>

      <DepartmentDetailModel
        isOpen={IsModalOpen}
        onClose={closeModal}
        data={modalData}
      />
    </div>
  );
};

export default MainCampusDetailBox;
