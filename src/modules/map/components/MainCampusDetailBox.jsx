import DepartmentList from "./DepartmentList";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DepartmentDetailModel from "./DepartmentDetailModal";
import BangmodBackgroud from "../assets/interbackgroundBangmod.png";
import S15 from "../assets/bangmodAssets/S15.png";
import S14 from "../assets/bangmodAssets/S14.png";
import S13 from "../assets/bangmodAssets/S13.png";
import S12 from "../assets/bangmodAssets/S12.png";
import S11 from "../assets/bangmodAssets/S11.png";
import S10 from "../assets/bangmodAssets/S10.png";
import S9 from "../assets/bangmodAssets/S9.png";
import S8 from "../assets/bangmodAssets/S8.png";
import S7 from "../assets/bangmodAssets/S7.png";
import S6 from "../assets/bangmodAssets/S6.png";
import S5 from "../assets/bangmodAssets/S5.png";
import S4 from "../assets/bangmodAssets/S4.png";
import S3 from "../assets/bangmodAssets/S3.png";
import S2 from "../assets/bangmodAssets/S2.png";
import S1 from "../assets/bangmodAssets/S1.png";

import N20 from "../assets/bangmodAssets/N20.png";
import N19 from "../assets/bangmodAssets/N19.png";
import N18 from "../assets/bangmodAssets/N18.png";
import N17 from "../assets/bangmodAssets/N17.png";
import N16 from "../assets/bangmodAssets/N16.png";
import N15 from "../assets/bangmodAssets/N15.png";
import N14 from "../assets/bangmodAssets/N14.png";
import N13 from "../assets/bangmodAssets/N13.png";
import N12 from "../assets/bangmodAssets/N12.png";
import N11 from "../assets/bangmodAssets/N11.png";
import N10 from "../assets/bangmodAssets/N10.png";
import N9 from "../assets/bangmodAssets/N9.png";
import N8 from "../assets/bangmodAssets/N8.png";
import N7 from "../assets/bangmodAssets/N7.png";
import N6 from "../assets/bangmodAssets/N6.png";
import N5 from "../assets/bangmodAssets/N5.png";
import N4 from "../assets/bangmodAssets/N4.png";
import N3 from "../assets/bangmodAssets/N3.png";
import N2 from "../assets/bangmodAssets/N2.png";
import N1 from "../assets/bangmodAssets/N1.png";


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
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/map/departments?campusName=${campusNameProp}`
        );
        setData(response.data.buildings);
        console.log(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <h1 className="text-2xl text-center w-[80%] mb-6 mx-auto font-extrabold">
        KMUTT Master Plan ({campusNameProp} Campus){" "}
      </h1>

      <div className="mb-8 md:w-[85%] mx-auto relative">
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
            className="absolute left-1/2 transform -translate-x-1/2 z-10 w-[90%] mx-auto text-xs"
            ref={dropdownRef}
          >
            <div className="menu p-0 h-min bg-base-100 rounded-box ">
              {filteredData.map((building, index) => (
                <li
                  key={building.id}
                  onClick={() => openModal(building)}
                  className={`cursor-pointer p-2 px-6 mx-2 ${
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

      <div
        className="border-2 border-black w-[100%] rounded-xl h-auto aspect-square md:aspect-[7/5] overflow-hidden grid grid-cols-[repeat(100,minmax(0,1fr))] grid-rows-[repeat(100,minmax(0,1fr))]"
        style={{
          backgroundImage: `url(${BangmodBackgroud})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          id="S15"
          className="relative hover:scale-125 ml-1"
          style={{
            gridRow: "37 / span 10",
            gridColumn: "33 / span 7",
          }}
        >
          <img
            src={S15}
            alt="S15"
            className="w-full h-full object-cover p-2 -rotate-1"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S15
          </h1>
        </div>

        <div
          id="S14"
          className="relative hover:scale-125"
          style={{
            gridRow: "13 / span 7",
            gridColumn: "38 / span 11",
          }}
        >
          <img
            src={S14}
            alt="S14"
            className="w-full h-full object-cover p-2 rotate-2"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S14
          </h1>
        </div>

        <div
          id="S13"
          className="relative hover:scale-125 md:ml-1 lg:ml-2"
          style={{
            gridRow: "13 / span 10",
            gridColumn: "28 / span 7",
          }}
        >
          <img src={S13} alt="S13" className="w-full h-full object-cover m-2" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm ml-6">
            S13
          </h1>
        </div>

        <div
          id="S12"
          className="relative hover:scale-125"
          style={{
            gridRow: "24 / span 12",
            gridColumn: "26 / span 6",
          }}
        >
          <img src={S12} alt="S12" className="w-full h-full object-cover p-2" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S12
          </h1>
        </div>

        <div
          id="S11"
          className="relative scale-90 hover:scale-[120%] lg:ml-1"
          style={{
            gridRow: "36 / span 12",
            gridColumn: "27 / span 6",
          }}
        >
          <img src={S11} alt="S11" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S11
          </h1>
        </div>

        <div
          id="S10"
          className="relative hover:scale-125 lg:ml-1"
          style={{
            gridRow: "45 / span 3",
            gridColumn: "26 / span 3",
          }}
        >
          <img src={S10} alt="S10" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S10
          </h1>
        </div>

        <div
          id="S9"
          className="relative scale-110 hover:scale-125 lg:ml-1"
          style={{
            gridRow: "37 / span 8",
            gridColumn: "18 / span 5",
          }}
        >
          <img src={S9} alt="S9" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S9
          </h1>
        </div>

        <div
          id="S8"
          className="relative hover:scale-125 lg:ml-1"
          style={{
            gridRow: "47 / span 4",
            gridColumn: "19 / span 3",
          }}
        >
          <img src={S8} alt="S8" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S8
          </h1>
        </div>

        <div
          id="S7"
          className="relative hover:scale-125 lg:ml-1"
          style={{
            gridRow: "55 / span 3",
            gridColumn: "21 / span 3",
          }}
        >
          <img src={S7} alt="S7" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S7
          </h1>
        </div>

        <div
          id="S6"
          className="relative hover:scale-125 md:ml-1 lg:ml-2 -rotate-3"
          style={{
            gridRow: "57 / span 11",
            gridColumn: "16 / span 7",
          }}
        >
          <img src={S6} alt="S6" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S6
          </h1>
        </div>

        <div
          id="S5"
          className="relative scale-110 hover:scale-125 lg:ml-1 rotate-2"
          style={{
            gridRow: "57 / span 6",
            gridColumn: "24 / span 4",
          }}
        >
          <img src={S5} alt="S5" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S5
          </h1>
        </div>

        <div
          id="S4"
          className="relative hover:scale-110 lg:ml-1"
          style={{
            gridRow: "50 / span 15",
            gridColumn: "26 / span 13",
          }}
        >
          <img src={S4} alt="S4" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S4
          </h1>
        </div>

        <div
          id="S3"
          className="relative scale-110 hover:scale-125 lg:ml-1"
          style={{
            gridRow: "67 / span 8",
            gridColumn: "29 / span 6",
          }}
        >
          <img src={S3} alt="S3" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S3
          </h1>
        </div>

        <div
          id="S2"
          className="relative scale-110 hover:scale-125 lg:mr-1"
          style={{
            gridRow: "74 / span 8",
            gridColumn: "33 / span 7",
          }}
        >
          <img src={S2} alt="S2" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S2
          </h1>
        </div>

        <div
          id="S1"
          className="relative hover:scale-125 lg:mr-2"
          style={{
            gridRow: "68 / span 3",
            gridColumn: "37 / span 3",
          }}
        >
          <img src={S1} alt="S1" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            S1
          </h1>
        </div>


        <div
          id="N1"
          className="relative scale-90 hover:scale-110"
          style={{
            gridRow: "66 / span 8",
            gridColumn: "46 / span 4",
          }}
        >
          <img src={N1} alt="N1" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N1
          </h1>
        </div>

        <div
          id="N2"
          className="relative scale-90 hover:scale-110 mr-2"
          style={{
            gridRow: "63 / span 10",
            gridColumn: "51 / span 6",
          }}
        >
          <img src={N2} alt="N2" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N2
          </h1>
        </div>

        <div
          id="N3"
          className="relative hover:scale-110"
          style={{
            gridRow: "65/ span 8",
            gridColumn: "59 / span 5",
          }}
        >
          <img src={N3} alt="N3" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N3
          </h1>
        </div>

        <div
          id="N4"
          className="relative hover:scale-110"
          style={{
            gridRow: "57/ span 8",
            gridColumn: "60 / span 6",
          }}
        >
          <img src={N4} alt="N4" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N4
          </h1>
        </div>

        <div
          id="N5"
          className="relative z-10 hover:scale-125 hover:z-20 -mt-2"
          style={{
            gridRow: "57/ span 5",
            gridColumn: "67 / span 4",
          }}
        >
          <img src={N5} alt="N5" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N5
          </h1>
        </div>

        <div
          id="N6"
          className="relative z-10 hover:scale-125 mr-2"
          style={{
            gridRow: "60/ span 6",
            gridColumn: "71 / span 4",
          }}
        >
          <img src={N6} alt="N6" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:ml-4">
            N6
          </h1>
        </div>

        <div
          id="N7"
          className="relative scale-[105%] hover:scale-110"
          style={{
            gridRow: "56/ span 22",
            gridColumn: "68 / span 10",
          }}
        >
          <img src={N7} alt="N7" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm lg:mt-12">
            N7
          </h1>
        </div>

        <div
          id="N8"
          className="relative scale-110 hover:scale-125 lg:mt-2 z-10"
          style={{
            gridRow: "75/ span 2",
            gridColumn: "74 / span 2",
          }}
        >
          <img src={N8} alt="N8" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N8
          </h1>
        </div>

        <div
          id="N9"
          className="relative scale-110 hover:scale-125 md:mr-2 lg:mr-4 lg:mt-2"
          style={{
            gridRow: "54/ span 9",
            gridColumn: "83 / span 5",
          }}
        >
          <img src={N9} alt="N9" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N9
          </h1>
        </div>

        <div
          id="N9"
          className="relative scale-110 hover:scale-125 md:mr-2 lg:mr-4 lg:mt-2"
          style={{
            gridRow: "54/ span 9",
            gridColumn: "83 / span 5",
          }}
        >
          <img src={N9} alt="N9" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N9
          </h1>
        </div>

        <div
          id="N10"
          className="relative  hover:scale-125 hover:z-20 mr-2"
          style={{
            gridRow: "47/ span 9",
            gridColumn: "62 / span 11",
          }}
        >
          <img src={N10} alt="N10" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N10
          </h1>
        </div>

        <div
          id="N11"
          className="relative scale-90 hover:scale-125 hover:z-20"
          style={{
            gridRow: "44/ span 8",
            gridColumn: "60 / span 5",
          }}
        >
          <img src={N11} alt="N11" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center ml-4 text-sm">
            N11
          </h1>
        </div>

        <div
          id="N12"
          className="relative scale-90 hover:scale-125 hover:z-20 rotate-2 "
          style={{
            gridRow: "34/ span 5",
            gridColumn: "56 / span 4",
          }}
        >
          <img src={N12} alt="N12" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N12
          </h1>
        </div>

        <div
          id="N13"
          className="relative scale-90 hover:scale-125 hover:z-20 rotate-2"
          style={{
            gridRow: "31/ span 3",
            gridColumn: "55 / span 2",
          }}
        >
          <img src={N13} alt="N13" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N13
          </h1>
        </div>

        <div
          id="N14"
          className="relative scale-90 hover:scale-125 hover:z-20 rotate-2"
          style={{
            gridRow: "28/ span 4",
            gridColumn: "53 / span 3",
          }}
        >
          <img src={N14} alt="N14" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N14
          </h1>
        </div>

        <div
          id="N15"
          className="relative hover:scale-125 hover:z-20 lg:ml-2"
          style={{
            gridRow: "37/ span 9",
            gridColumn: "53 / span 4",
          }}
        >
          <img src={N15} alt="N15" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N15
          </h1>
        </div>

        <div
          id="N16"
          className="relative hover:scale-125 hover:z-20 lg:ml-2"
          style={{
            gridRow: "48/ span 12",
            gridColumn: "52 / span 6",
          }}
        >
          <img src={N16} alt="N16" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N16
          </h1>
        </div>

        <div
          id="N17"
          className="relative hover:scale-125 lg:ml-1"
          style={{
            gridRow: "45/ span 12",
            gridColumn: "45 / span 9",
          }}
        >
          <img src={N17} alt="N17" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N17
          </h1>
        </div>

        <div
          id="N18"
          className="relative z-10 hover:scale-110 hover:z-20 lg:mr-1"
          style={{
            gridRow: "43/ span 9",
            gridColumn: "46 / span 3",
          }}
        >
          <img src={N18} alt="N18" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N18
          </h1>
        </div>

        <div
          id="N19"
          className="relative z-10 hover:scale-125 hover:z-20"
          style={{
            gridRow: "39/ span 4",
            gridColumn: "45 / span 3",
          }}
        >
          <img src={N19} alt="N19" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold mr-2 text-center text-sm">
            N19
          </h1>
        </div>

        <div
          id="N20"
          className="relative scale-80 z-10 hover:scale-125 hover:z-20"
          style={{
            gridRow: "38/ span 6",
            gridColumn: "49 / span 3",
          }}
        >
          <img src={N20} alt="N20" className="w-full h-full object-cover" />
          <h1 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-center text-sm">
            N20
          </h1>
        </div>
      </div>

      <div className="w-full h-max my-8">
        <DepartmentList openModalProp={openModal} dataProp={data} />
      </div>

      <div className="bth-group w-full grid md:grid-cols-2 md:text-xl space-y-4 align-item-center">
        <div className="grid">
          <a
            href=""
            className="hidden grid bg-[#864E41] h-min mt-auto py-1 md:py-2 px-4 w-[50%] md:w-max md:px-8 rounded-xl text-center justify-self-center md:justify-self-end md:mr-[12%] text-white"
          >
            Complaint
          </a>
          <a
            href="/map/submissions"
            className=" grid bg-[#864E41] mt-auto py-1 md:py-2 px-3 w-[50%] md:w-max md:px-8 rounded-xl text-center justify-self-center md:justify-self-end md:mr-[12%] text-white"
          >
            Submission
          </a>
        </div>
        <a
          href="/map/contact"
          className="flex bg-[#864E41] py-1 md:py-2 px-4 w-[50%] md:w-max md:px-8 rounded-xl text-center justify-self-center md:justify-self-start md:ml-[12%] text-white items-center"
        >
          <span className="ml-2 md:ml-0">Contact</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>
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
