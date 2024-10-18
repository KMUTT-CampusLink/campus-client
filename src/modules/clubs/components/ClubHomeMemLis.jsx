import React from "react";
import { useState } from "react";

const ClubHomeMemLis = (props) => {
  const clubMembers = [
    {
      id: 1,
      club_id: 101,
      student_id: 1001,
      name: "Alice Johnson",
      is_admin: true,
      created_at: "2023-09-12 14:23:56",
      updated_at: 1694532236,
    },
    {
      id: 2,
      club_id: 101,
      student_id: 1002,
      name: "Brian Smith",
      is_admin: false,
      created_at: "2023-09-13 09:15:34",
      updated_at: 1694602534,
    },
    {
      id: 3,
      club_id: 102,
      student_id: 1003,
      name: "Charlie Brown",
      is_admin: true,
      created_at: "2023-10-01 11:45:23",
      updated_at: 1696157123,
    },
    {
      id: 4,
      club_id: 102,
      student_id: 1004,
      name: "Diana Prince",
      is_admin: false,
      created_at: "2023-10-05 08:30:00",
      updated_at: 1696591800,
    },
    {
      id: 5,
      club_id: 103,
      student_id: 1005,
      name: "Edward Norton",
      is_admin: false,
      created_at: "2023-10-10 17:22:10",
      updated_at: 1696940530,
    },
    {
      id: 6,
      club_id: 103,
      student_id: 1006,
      name: "Fiona Green",
      is_admin: true,
      created_at: "2023-10-12 14:00:00",
      updated_at: 1697085600,
    },
    {
      id: 7,
      club_id: 104,
      student_id: 1007,
      name: "George Martin",
      is_admin: false,
      created_at: "2023-09-15 12:34:12",
      updated_at: 1694770452,
    },
    {
      id: 8,
      club_id: 104,
      student_id: 1008,
      name: "Hannah Baker",
      is_admin: false,
      created_at: "2023-09-20 08:22:19",
      updated_at: 1695220939,
    },
    {
      id: 9,
      club_id: 105,
      student_id: 1009,
      name: "Ian Malcolm",
      is_admin: false,
      created_at: "2023-10-08 10:12:45",
      updated_at: 1696782765,
    },
    {
      id: 10,
      club_id: 105,
      student_id: 1010,
      name: "Jessica Jones",
      is_admin: false,
      created_at: "2023-09-25 18:55:23",
      updated_at: 1695666923,
    },
    {
      id: 11,
      club_id: 106,
      student_id: 1011,
      name: "Kevin Spacey",
      is_admin: false,
      created_at: "2023-10-02 16:05:32",
      updated_at: 1696242332,
    },
    {
      id: 12,
      club_id: 106,
      student_id: 1012,
      name: "Lily Evans",
      is_admin: false,
      created_at: "2023-10-06 07:14:10",
      updated_at: 1696576450,
    },
    {
      id: 13,
      club_id: 107,
      student_id: 1013,
      name: "Mike Wazowski",
      is_admin: false,
      created_at: "2023-10-09 12:22:56",
      updated_at: 1696850576,
    },
    {
      id: 14,
      club_id: 107,
      student_id: 1014,
      name: "Nina Williams",
      is_admin: false,
      created_at: "2023-09-28 15:44:23",
      updated_at: 1695907463,
    },
    {
      id: 15,
      club_id: 108,
      student_id: 1015,
      name: "Oscar Isaac",
      is_admin: false,
      created_at: "2023-09-19 13:00:00",
      updated_at: 1695109200,
    },
    {
      id: 16,
      club_id: 108,
      student_id: 1016,
      name: "Paula Patton",
      is_admin: false,
      created_at: "2023-09-22 09:20:18",
      updated_at: 1695373218,
    },
    {
      id: 17,
      club_id: 109,
      student_id: 1017,
      name: "Quincy Adams",
      is_admin: false,
      created_at: "2023-10-04 11:45:55",
      updated_at: 1696412755,
    },
    {
      id: 18,
      club_id: 109,
      student_id: 1018,
      name: "Rachel Green",
      is_admin: false,
      created_at: "2023-09-30 14:32:09",
      updated_at: 1696079529,
    },
    {
      id: 19,
      club_id: 110,
      student_id: 1019,
      name: "Sam Wilson",
      is_admin: false,
      created_at: "2023-10-03 07:50:11",
      updated_at: 1696331411,
    },
    {
      id: 20,
      club_id: 110,
      student_id: 1020,
      name: "Tina Fey",
      is_admin: false,
      created_at: "2023-10-11 16:12:44",
      updated_at: 1697038364,
    },
    {
      id: 21,
      club_id: 101,
      student_id: 1001,
      name: "Alice Johnson",
      is_admin: false,
      created_at: "2023-09-12 14:23:56",
      updated_at: 1694532236,
    },
    {
      id: 22,
      club_id: 101,
      student_id: 1002,
      name: "Brian Smith",
      is_admin: false,
      created_at: "2023-09-13 09:15:34",
      updated_at: 1694602534,
    },
    {
      id: 23,
      club_id: 102,
      student_id: 1003,
      name: "Charlie Brown",
      is_admin: false,
      created_at: "2023-10-01 11:45:23",
      updated_at: 1696157123,
    },
    {
      id: 24,
      club_id: 102,
      student_id: 1004,
      name: "Diana Prince",
      is_admin: false,
      created_at: "2023-10-05 08:30:00",
      updated_at: 1696591800,
    },
    {
      id: 25,
      club_id: 103,
      student_id: 1005,
      name: "Edward Norton",
      is_admin: false,
      created_at: "2023-10-10 17:22:10",
      updated_at: 1696940530,
    },
    {
      id: 26,
      club_id: 103,
      student_id: 1006,
      name: "Fiona Green",
      is_admin: false,
      created_at: "2023-10-12 14:00:00",
      updated_at: 1697085600,
    },
    {
      id: 27,
      club_id: 104,
      student_id: 1007,
      name: "George Martin",
      is_admin: false,
      created_at: "2023-09-15 12:34:12",
      updated_at: 1694770452,
    },
    {
      id: 28,
      club_id: 104,
      student_id: 1008,
      name: "Hannah Baker",
      is_admin: false,
      created_at: "2023-09-20 08:22:19",
      updated_at: 1695220939,
    },
    {
      id: 29,
      club_id: 105,
      student_id: 1009,
      name: "Ian Malcolm",
      is_admin: false,
      created_at: "2023-10-08 10:12:45",
      updated_at: 1696782765,
    },
    {
      id: 30,
      club_id: 105,
      student_id: 1010,
      name: "Jessica Jones",
      is_admin: false,
      created_at: "2023-09-25 18:55:23",
      updated_at: 1695666923,
    },
    {
      id: 31,
      club_id: 106,
      student_id: 1011,
      name: "Kevin Spacey",
      is_admin: false,
      created_at: "2023-10-02 16:05:32",
      updated_at: 1696242332,
    },
    {
      id: 32,
      club_id: 106,
      student_id: 1012,
      name: "Lily Evans",
      is_admin: false,
      created_at: "2023-10-06 07:14:10",
      updated_at: 1696576450,
    },
    {
      id: 33,
      club_id: 107,
      student_id: 1013,
      name: "Mike Wazowski",
      is_admin: false,
      created_at: "2023-10-09 12:22:56",
      updated_at: 1696850576,
    },
    {
      id: 34,
      club_id: 107,
      student_id: 1014,
      name: "Nina Williams",
      is_admin: false,
      created_at: "2023-09-28 15:44:23",
      updated_at: 1695907463,
    },
    {
      id: 35,
      club_id: 108,
      student_id: 1015,
      name: "Oscar Isaac",
      is_admin: false,
      created_at: "2023-09-19 13:00:00",
      updated_at: 1695109200,
    },
    {
      id: 36,
      club_id: 108,
      student_id: 1016,
      name: "Paula Patton",
      is_admin: false,
      created_at: "2023-09-22 09:20:18",
      updated_at: 1695373218,
    },
    {
      id: 37,
      club_id: 109,
      student_id: 1017,
      name: "Quincy Adams",
      is_admin: false,
      created_at: "2023-10-04 11:45:55",
      updated_at: 1696412755,
    },
    {
      id: 38,
      club_id: 109,
      student_id: 1018,
      name: "Rachel Green",
      is_admin: false,
      created_at: "2023-09-30 14:32:09",
      updated_at: 1696079529,
    },
    {
      id: 39,
      club_id: 110,
      student_id: 1019,
      name: "Sam Wilson",
      is_admin: false,
      created_at: "2023-10-03 07:50:11",
      updated_at: 1696331411,
    },
    {
      id: 40,
      club_id: 110,
      student_id: 1020,
      name: "Tina Fey",
      is_admin: false,
      created_at: "2023-10-11 16:12:44",
      updated_at: 1697038364,
    },
  ];

  const { toggleRight } = props;

  const admins = clubMembers.filter((members) => members.is_admin == true);
  const members = clubMembers.filter((members) => members.is_admin == false);

  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(selectedItem);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
              key={admins.id}
            >
              {admins.name}
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
              key={members.id}
            >
              {members.name}
            </h5>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center text-left text-white"
        >
          <div className="bg-[#505050] px-[8%] md:px-[5%] py-[3%] rounded-xl shadow-lg aspect-[4/3] w-[85%] md:w-[30%] ">
            <h2 className="text-lg mb-2"></h2>
            {selectedItem && (
              <div className="">
                <img
                  className="w-[20%] aspect-square rounded-full m-auto"
                  src="https://i.imgur.com/xKf7cjo.png"
                  alt="avatar"
                />
                <p>
                  <h2>StudentID: {selectedItem.student_id}</h2>
                </p>
                <p>
                  <h2>Name: {selectedItem.name}</h2>
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
