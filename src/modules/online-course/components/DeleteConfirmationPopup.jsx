import React from "react";

const DeleteConfirmationPopup = ({
  onClose,
  onDeleteAction,
  message,
  action1Label,
  action2Label,
  showAction2 = true, // Optional prop to hide the second action button
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={onDeleteAction[0]}
          >
            {action1Label}
          </button>
          {showAction2 && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              onClick={onDeleteAction[1]}
            >
              {action2Label}
            </button>
          )}
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
