import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";



const UploadPopup = ({ onClose, onSubmit, material }) => {
  const [title, setTitle] = useState(""); // Title of the assignment
  const [newAttachments, setNewAttachments] = useState([]); // Files selected for upload
  const [warning, setWarning] = useState(""); // For warnings or errors

  // Populate existing data if editing an assignment
  useEffect(() => {
    if (material) {
      setTitle(material.title);
    }
  }, [material]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setNewAttachments((prev) => [...prev, ...files]);
  };

  // Handle removing a selected file
  const handleDeleteFile = (fileToDelete) => {
    setNewAttachments((prev) => prev.filter((file) => file !== fileToDelete));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setWarning("Please provide a title.");
      return;
    }

    if (newAttachments.length === 0) {
      setWarning("Please upload at least one file.");
      return;
    }

    onSubmit({
      title,
      attachments: newAttachments, // Pass the selected files to the parent component
    });

    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {material ? "Edit Assignment" : "Upload Assignment"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ecb45e] placeholder-gray-400"
              placeholder="Enter the assignment title"
              required
              style={{
                borderColor: "#d4e1f7", // Light border color
                backgroundColor: "#f9fbfe", // Subtle background color
                color: "#334e68", // Text color
              }}
            />

          </div>

          {/* File Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Attachments <span className="text-red-500">*</span>
            </label>

            {/* Selected Files */}
            {newAttachments.length > 0 && (
              <ul className="space-y-1 mt-2">
                {newAttachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* File Input Field */}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-3 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#ecb45e] file:text-[#ffffff]
                        hover:file:bg-[#ecb45e]"
            />
          </div>

          {/* Warning Message */}
          {warning && <p className="text-red-500 text-sm">{warning}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#ecb45e] text-white px-4 py-2 rounded hover:bg-[#ecb45e]"
            >
              {material ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPopup;
