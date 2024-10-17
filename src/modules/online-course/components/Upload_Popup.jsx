import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

const UploadPopup = ({ onClose, onSubmit, material, showVideos }) => {
  const [title, setTitle] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [newAttachments, setNewAttachments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [videoDurations, setVideoDurations] = useState([]);
  const [warning, setWarning] = useState(""); // For warning messages

  useEffect(() => {
    if (material) {
      setTitle(material.title);
      setAttachments(material.attachments);
      setVideos(material.videos || []);
      setVideoDurations(material.videoDurations || []);
    }
  }, [material]);

  const handleFileChange = (e) => {
    setNewAttachments([...newAttachments, ...e.target.files]);
  };

  const handleVideoChange = (e) => {
    const newVideoFiles = Array.from(e.target.files); // Convert FileList to array
    setNewVideos((prevVideos) => [...prevVideos, ...newVideoFiles]);
  };

  const handleDeleteExistingFile = (fileToDelete) => {
    setAttachments(attachments.filter((file) => file !== fileToDelete));
  };

  const handleDeleteNewFile = (fileToDelete) => {
    setNewAttachments(newAttachments.filter((file) => file !== fileToDelete));
  };

  const handleDeleteExistingVideo = (videoToDelete, index) => {
    setVideos(videos.filter((video) => video !== videoToDelete));
    setVideoDurations(videoDurations.filter((_, i) => i !== index));
  };

  const handleDeleteNewVideo = (videoToDelete, index) => {
    setNewVideos(newVideos.filter((video) => video !== videoToDelete));
    setVideoDurations(videoDurations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allAttachments = [...attachments, ...newAttachments];
    const allVideos = [...videos, ...newVideos];

    // Check if there is at least one file
    if (allAttachments.length === 0) {
      setWarning("At least one file is required."); // Set warning message
      return;
    }

    if (
      title &&
      (allAttachments.length > 0 || (showVideos && allVideos.length > 0))
    ) {
      const attachmentNames = allAttachments.map((file) => file.name || file);
      const videoNames = allVideos.map((file) => file.name || file); // Map video file names
      const quantity = allAttachments.length;

      onSubmit({
        title,
        attachments: attachmentNames,
        quantity,
        date: material ? material.date : new Date().toLocaleDateString(),
        videos: showVideos ? videoNames : [],
      });

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">
            {material ? "Edit Material" : "Upload Material"}
          </h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Attachments Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Attachments</label>

            {/* Display existing files */}
            {attachments.length > 0 && (
              <ul className="mt-2 text-gray-600">
                {attachments.map((file, index) => (
                  <li key={index} className="flex justify-between">
                    {file.name || file}
                    <button
                      type="button" // Set type to "button" to prevent form submission
                      onClick={() => handleDeleteExistingFile(file)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Display new files */}
            {newAttachments.length > 0 && (
              <ul className="mt-2 text-gray-600">
                {newAttachments.map((file, index) => (
                  <li key={index} className="flex justify-between">
                    {file.name}
                    <button
                      type="button" // Set type to "button" to prevent form submission
                      onClick={() => handleDeleteNewFile(file)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="red" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
            />

            {/* Display warning message */}
            {warning && <p className="mt-2 text-red-500">{warning}</p>}
          </div>

          {/* Conditional Videos Input */}
          {showVideos && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Recordings (optional)
              </label>

              {/* Display existing videos */}
              {videos.length > 0 && (
                <ul className="mt-2 text-gray-600">
                  {videos.map((video, index) => (
                    <li key={index} className="flex justify-between">
                      {videoDurations[index]}
                      <button
                        type="button" // Set type to "button" to prevent form submission
                        onClick={() => handleDeleteExistingVideo(video, index)}
                      >
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Display new videos */}
              {newVideos.length > 0 && (
                <ul className="mt-2 text-gray-600">
                  {newVideos.map((video, index) => (
                    <li key={index} className="flex justify-between">
                      {videoDurations[videos.length + index]}
                      <button
                        type="button" // Set type to "button" to prevent form submission
                        onClick={() => handleDeleteNewVideo(video, index)}
                      >
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
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
