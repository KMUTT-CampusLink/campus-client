import { useState } from "react";
import ClubCreateMemberAddPage from "./ClubCreateMemberAddPage";

function ClubCreatePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedMembers, setAddedMembers] = useState([]);

  const stdList = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 4,
      name: "Harry",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 5,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 6,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 7,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 8,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 9,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
    {
      id: 10,
      name: "Kelvin",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      added: false,
    },
  ];
  // Handler for updating the added members
  const handleAddMembers = (newAddedIds) => {
    setAddedMembers(newAddedIds); //Update added members
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handler for file input change
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0].name); // Get the file name
    } else {
      setSelectedFile(null); // Reset if no file is selected
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen rounded-lg sm:p-5">
        {/* Club Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-14">
          {/* Left Column */}
          <div className="md:pl-20 pl-10 pr-10">
            <div className="mb-4">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  <input
                    id="clubname"
                    name="clubname"
                    type="text"
                    placeholder="Enter club name"
                    autoComplete="clubname"
                    className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 pt-3">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  <input
                    id="clubdescription"
                    name="clubdescription"
                    type="text"
                    placeholder="Enter club description"
                    autoComplete="clubdescription"
                    className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* Club Image Upload */}
            <div className="mb-4 pt-3">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Image
              </label>
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset sm:max-w-lg">
                {/* Display selected file name or "No file selected" */}
                <span className="flex-1 inline-flex items-center px-3 py-2 text-gray-500 text-sm bg-transparent border-r border-gray-300">
                  {selectedFile ? selectedFile : "No file selected"}
                </span>

                {/* File Upload Button */}
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-r-lg bg-orange-400 text-white font-medium py-2 px-4 hover:bg-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                >
                  <span>Select File</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div className="pt-3">
              <button
                className="bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
                onClick={handleOpenModal} // Open the modal
              >
                Add Member
              </button>
            </div>
            {/* Member List Modal */}
            {/* Pass the student list and addedMembers to the child */}
            <ClubCreateMemberAddPage
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onAddMembers={handleAddMembers} // Pass function to add members
              addedMembers={addedMembers} // Pass added members to the modal
              stdList={stdList} // Pass stdList to the modal
            />
            {/* Display Member List */}
            <div className="mt-5">
              <h2 className="block text-lg font-medium leading-6 text-gray-900">
                Member List
              </h2>
              <div className="mt-4 flex flex-wrap space-x-2">
                {addedMembers.map((memberId) => {
                  const member = stdList.find((m) => m.id === memberId); // Find the member by ID
                  return (
                    <div
                      key={memberId}
                      className="relative border border-gray-300 p-2 rounded-md bg-gray-100"
                    >
                      <span className="text-gray-800">{member?.name}</span>
                      <button
                        className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-3 h-3 flex items-center justify-center rounded-full border border-black text-black hover:bg-gray-300"
                        onClick={() => {
                          setAddedMembers((prevMembers) =>
                            prevMembers.filter((id) => id !== memberId)
                          );
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="pl-10 pr-10">
            <div className="mb-4">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Club Details
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                  <textarea
                    id="clubdetail"
                    name="clubdetail"
                    rows={8}
                    className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter club details"
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-bold">
              *There should be at least 3 members to create a club.
            </p>
            <div className="mt-4 w-full max-w-lg flex justify-end pb-8">
              <button
                className="bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
                onClick={"#"}
              >
                Create Club
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubCreatePage;