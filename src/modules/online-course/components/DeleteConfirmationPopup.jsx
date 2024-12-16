import React from "react";

const DeleteConfirmationPopup = ({ onClose, onDeleteAction, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={onDeleteAction}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
