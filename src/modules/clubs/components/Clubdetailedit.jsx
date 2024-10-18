import React, { useState } from 'react';

const Clubdetailedit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(`
    Friendly Matches and Scrimmages: 
    Regular informal matches between club members or against other university clubs for fun and practice.
    
    Skill Development Workshops:
    Specialized sessions focusing on techniques like dribbling, passing, shooting, and goalkeeping, led by experienced coaches or guest trainers.
    
    Fitness and Conditioning Classes:
    Group fitness sessions focusing on strength, conditioning, and endurance to help players stay in top physical shape.
    
    Inter-Club Tournaments:
    Organize internal tournaments or friendly leagues between members, with mixed teams competing for fun prizes or bragging rights.
  `);

  const [newDescription, setNewDescription] = useState(description);

  // Function to handle modal open/close
  const openModal = () => {
    setIsModalOpen(true);
    setNewDescription(description);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to update description
  const handlePost = () => {
    setDescription(newDescription);
    closeModal();
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <main className="p-4 md:p-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          {/* Description */}
          <div className="text-gray-700 space-y-4 whitespace-pre-wrap">{description}</div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={openModal}
            >
              Edit Description
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete Club</button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-10">
          <div className="bg-[#505050] p-3 md:p-10 rounded-lg shadow-lg w-4/5 max-w-6xl">
            <h2 className=" text-xl md:text-2xl text-white mb-4">Edit Description</h2>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full h-[25vh] md:h-[30vh] p-4 bg-[#505050] text-white text-base rounded-md"
            ></textarea>
            <div className="flex justify-end space-x-4 mt-2">
              <button
                className="bg-[#F69800] text-white px-4 md:px-8 py-2 rounded-lg"
                onClick={handlePost}
              >
                Post
              </button>
              <button
                className="bg-[#864E41] text-white px-4 md:px-8 py-2 rounded-lg"
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
};

export default Clubdetailedit;
