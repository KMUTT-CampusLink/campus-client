import React from "react";
import { useState, useEffect } from "react";

function ClubCreateMemberAddPage({
  isOpen,
  onClose,
  onAddMembers,
  addedMembers,
  memberList,
}) {
  const [members, setMembers] = useState(memberList);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      const updatedMembers = memberList.map((member) => ({
        ...member,
        added: addedMembers.includes(member.id), // Set added state based on addedMembers
      }));
      setMembers(updatedMembers);
    }
  }, [isOpen, addedMembers]);

  const handleAddMember = (id) => {
    // Toggle the added state of the member
    const updatedMembers = members.map((member) =>
      member.id === id ? { ...member, added: !member.added } : member
    );
    setMembers(updatedMembers);
  };

  const handleDone = () => {
    // Get IDs of added members
    const addedIds = members
      .filter((member) => member.added)
      .map((member) => member.id); // Get IDs of added members

    onAddMembers(addedIds); // Call the function passed from the parent to update added members list
    onClose(); // Close the modal
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-2/3 max-w-3xl h-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold mx-auto text-black">
              Member List
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 ml-4"
            >
              &times; {/* Close button */}
            </button>
          </div>
          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <div className="relative w-[65%]">
              <span className="absolute left-3 top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 10A7 7 0 1 0 3 10a7 7 0 0 0 14 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full pl-10"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-grow max-h-[calc(80vh-100px)] overflow-y-auto p-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center">
                  <img
                    src={
                      member.image
                        ? `${import.meta.env.VITE_MINIO_URL}bucket-02/${
                            member.image
                          }`
                        : "https://img.placeholder.com/50"
                    }
                    alt={member.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-800">
                    {member.name}
                  </span>
                </div>
                <button
                  onClick={() => handleAddMember(member.id)} // Call function to add or remove member
                  className={`text-white px-5 py-2 rounded-md text-lg ${
                    member.added
                      ? "bg-green-500"
                      : "bg-gray-500 hover:bg-blue-600"
                  } w-24`} // Set a fixed width for the button
                >
                  {member.added ? "Added" : "Add"}
                  {/* Change button text based on state */}
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 flex justify-center space-x-4">
            <button
              onClick={handleDone} // Call handleDone function on click
              className="bg-orange-500 text-white px-5 py-2 rounded-md text-lg hover:bg-yellow-600"
            >
              Done
            </button>
            <button
              onClick={onClose}
              className="bg-orange-950 text-white px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubCreateMemberAddPage;
