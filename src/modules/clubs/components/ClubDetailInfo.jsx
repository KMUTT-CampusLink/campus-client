import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ClubDetailInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(`What our football club can offer and the benefits`);
  const [description, setDescription] = useState(`
    Friendly Matches and Scrimmages: 
    Regular informal matches between club members or against other university clubs for fun and practice.
    
    Skill Development Workshops:
    Specialized sessions focusing on techniques like dribbling, passing, shooting, and goalkeeping, led by experienced coaches 
    or guest trainers.
    
    Fitness and Conditioning Classes:
    Group fitness sessions focusing on strength, conditioning, and endurance to help players stay in top physical shape.
    
    Inter-Club Tournaments:
    Organize internal tournaments or friendly leagues between members, with mixed teams competing for fun prizes or bragging rights.
  `);

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Function to handle modal open/close
  const openModal = () => {
    setIsModalOpen(true);
    setNewTitle(title);
    setNewDescription(description);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to update description
  const handlePost = () => {
    setTitle(newTitle);
    setDescription(newDescription);
    closeModal();
  };

  return (
    <div>
      <div className="text-2xl font-semibold whitespace-pre-wrap">{title}</div>
      <div className="text-xl whitespace-pre-wrap">{description}</div>
      <div className="flex flex-wrap justify-end md:mt-12">
        <Link
          to="/clubs/club-home"
          className="bg-[#F69800] text-white px-2 md:px-14 py-2 shadow-xl rounded-lg md:rounded-full md:text-xl md:mt-5 md:ml-6 block"
        >
          View Announcements
        </Link>
        <button
          className="bg-[#EC5A51] text-white px-2 md:px-14 py-1 shadow-xl rounded-lg md:rounded-full md:text-xl md:mt-5 ml-4 md:ml-6"
          onClick={openModal}
        >
          Edit Description
        </button>
        <button className="bg-[#864E41] text-white px-3 md:px-14 py-1 shadow-xl rounded-lg md:rounded-full md:text-xl mt-3 md:mt-5 md:ml-6">
          Delete Club
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-6xl space-y-4">
            <h2 className="text-xl md:text-2xl text-gray-700 mb-4">Edit Club Details</h2>
            
            {/* Title Field */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Title</label>
              <input 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2 w-full rounded-md shadow-sm border-gray-300"
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Description</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border p-2 w-full rounded-md shadow-sm border-gray-300 h-32"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                onClick={handlePost}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubDetailInfo;
