import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";

const ClubHomeMemLis = (props) => {
  const { clubId } = useParams();
  const [ clubMembers, setClubMemebers ] = useState([]); 
  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleRight } = props;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get(`/clubs/members/${clubId}`);
        setClubMemebers(response.data.data);
      }catch(error){
        console.error("Error fetching club members:", error);
    }
  };
    fetchMembers();
  }, [clubId]);

  const admins = clubMembers.filter((members) => members.is_admin);
  const members = clubMembers.filter((members) => members.status === "Accepted" && !members.is_admin);
  console.log(admins, members);
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
    if(members.student) {
      return `${members.student.firstname || ''} ${members.student.midname || ''} ${members.student.lastname || ''}`;
    }

    if(members.employee) {
      return `${members.employee.firstname || ''} ${members.employee.midname || ''} ${members.employee.lastname || ''}`;
    }
    return "Unknown";
  };

  return (
    <div
      className={` ${
        toggleRight ? "grid" : "hidden"
      } md:grid border-solid border-[1px] rounded-lg md:rounded-l-none p-4 h-max`}
    >
      <div className="">
        <h5 className="  pt-3 mb-3 m-auto text-center font-semibold w-4/5 border-b-2 border-black border-solid">
          Admin
        </h5>
        {admins.map((admins) => (
          <div className="flex ml-[7%] p-0.5 mr-auto items-center space-x-2">
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
        {members.map((members) => (
          <div className="ml-[7%] mr-auto p-0.5 flex items-center space-x-2">
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
          onClick={closeModal}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center text-left text-white"
        >
          <div className="bg-[#505050] px-[8%] md:px-[5%] py-[3%] rounded-xl shadow-lg aspect-[4/3] w-[85%] md:w-[30%] ">
            <h2 className="text-lg mb-2"></h2>
            {selectedItem.student && (
              <div className="">
                <img
                  className="w-[20%] aspect-square rounded-full m-auto"
                  src="https://i.imgur.com/xKf7cjo.png"
                  alt="avatar"
                />
                <p>
                  <h2>StudentID: {selectedItem.student.id}</h2>
                </p>
                <p>
                  <h2>Name: {selectedItem.student.firstname} {selectedItem.student.lastname} </h2>
                </p>
              </div>
            )}
            {selectedItem.employee && (
              <div className="">
                <img
                  className="w-[20%] aspect-square rounded-full m-auto"
                  src="https://i.imgur.com/xKf7cjo.png"
                  alt="avatar"
                />
                <p>
                  <h2>Employee ID: {selectedItem.employee.id}</h2>
                </p>
                <p>
                  <h2>Name: {selectedItem.employee.firstname} {selectedItem.employee.midname} {selectedItem.student.lastname} </h2>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <button className="flex w-max px-[5%] bg-red-500 text-white py-2 my-3 rounded">
        Leave
      </button>
    </div>
  );
};
export default ClubHomeMemLis;
