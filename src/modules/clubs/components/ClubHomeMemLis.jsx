import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";

const ClubHomeMemLis = (props) => {
  const { clubId } = useParams();
  const [clubMembers, setClubMemebers] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleRight } = props;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/members/${clubId}`);
        setClubMemebers(response.data.data);
      } catch (error) {
        console.error("Error fetching club members:", error);
      }
    };
    fetchMembers();
  }, [clubId]);

  const admins = clubMembers.filter((members) => members.is_admin);
  const members = clubMembers.filter(
    (members) => members.status === "Accepted" && !members.is_admin
  );
  //console.log(admins, members);

  const handleClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(selectedItem);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const renderName = (members) => {
    if (members.student) {
      return `${members.student.firstname || ""} ${
        members.student.midname || ""
      } ${members.student.lastname || ""}`;
    }

    if (members.employee) {
      return (
        "Prof. " +
        `${members.employee.firstname || ""} ${
          members.employee.midname || ""
        } ${members.employee.lastname || ""}`
      );
    }
    return "Unknown";
  };

  return (
    <div
      className={` ${
        toggleRight ? "grid" : "hidden"
      } md:grid border-solid border-[1px] sm:border-black md:border-none rounded-lg md:rounded-l-none p-4 h-max`}
    >
      <div className="">
        <h5 className="  pt-3 mb-3 m-auto text-center font-semibold w-4/5 border-b-2 border-black border-solid">
          Admin
        </h5>
        {admins.map((admins, key) => (
          <div
            key={key}
            className="flex ml-[7%] p-0.5 mr-auto items-center space-x-2"
          >
            <img
              className="w-[10%] aspect-square rounded-full"
              src="https://i.imgur.com/xKf7cjo.png"
              alt="avatar"
            />
            <h5
              onClick={() => handleClick(admins)}
              className="cursor-pointer px-3"
            >
              {renderName(admins)}
            </h5>
          </div>
        ))}
      </div>
      <h5 className="cursor-pointer pt-3 mb-3 m-auto text-center font-semibold w-4/5 border-b-2 border-black border-solid">
        Member
      </h5>
      <div className="overflow-y-scroll h-full">
        {members.map((members, key) => (
          <div
            key={key}
            className="ml-[7%] mr-auto p-0.5 flex items-center space-x-2"
          >
            <img
              className=" w-[10%] aspect-square rounded-full"
              src="https://i.imgur.com/xKf7cjo.png"
              alt="avatar"
            />
            <h5
              onClick={() => handleClick(members)}
              className="cursor-pointer px-3"
            >
              {renderName(members)}
            </h5>
          </div>
        ))}
      </div>

      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
            className="px-[8%] md:px-[5%] py-[3%] rounded-xl shadow-lg w-[85%] md:w-[30%]"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
            >
              ×
            </button>
            <div className="text-left">
              {selectedItem.student && (
                <div>
                  <img
                    className="w-[25%] aspect-square rounded-full m-auto"
                    src="https://i.imgur.com/xKf7cjo.png"
                    alt="avatar"
                  />
                  <h2 className="text-center text-xl font-bold mt-3">
                    Student Details
                  </h2>
                  <p>
                    <strong>ID: </strong>
                    {selectedItem.student.id}
                  </p>
                  <p>
                    <strong>Name: </strong>
                    {selectedItem.student.firstname}{" "}
                    {selectedItem.student.lastname}
                  </p>
                  <p className="mb-2">
                    <strong>Line ID:</strong>{" "}
                    {selectedItem.student.line_id || "Not provided"}
                  </p>
                </div>
              )}
              {selectedItem.employee && (
                <div className="text-center border-t-2 border-gray-300 pt-4">
                  <img
                    className="w-[20%] aspect-square rounded-full m-auto"
                    src="https://i.imgur.com/xKf7cjo.png"
                    alt="avatar"
                  />
                  <h2 className="text-xl font-bold mt-3">Professor Details</h2>
                  <p>Employee ID: {selectedItem.employee.id}</p>
                  <p>
                    Name: Prof. {selectedItem.employee.firstname}{" "}
                    {selectedItem.employee.lastname}
                  </p>
                  <p>Department: Add department info here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <button className="flex w-max px-[5%] bg-red-500 text-white py-2 my-3 rounded">
        Leave
      </button> */}
    </div>
  );
};
export default ClubHomeMemLis;
