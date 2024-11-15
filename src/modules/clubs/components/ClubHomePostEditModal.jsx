import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const ClubHomePostEditModal = ({ isOpen, onClose, data, onUpdate }) => {
  if (!isOpen) return null;

  // State for the post fields (title, content, location, date, time)
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [location, setLocation] = useState("");
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");

  // Local state for the form inputs
  // const [newTitle, setNewTitle] = useState(title);
  // const [newContent, setNewContent] = useState(content);
  // const [newLocation, setNewLocation] = useState(location);
  // const [newDate, setNewDate] = useState(date);
  // const [newTime, setNewTime] = useState(time);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  // UseEffect to pre-fill the modal fields with post data
  useEffect(() => {
    if (data) {
      setNewTitle(data.title || "");
      setNewContent(data.content || "");
      setNewLocation(data.location || "");
      setNewDate(data.date ? data.date.split("T")[0] : "");
      setNewStartTime(data.start_time ? data.start_time.split("T")[1].slice(0, 5) : "");
      setNewEndTime(data.end_time ? data.end_time.split("T")[1].slice(0, 5) : "");
    }
  }, [data]);

  // Function to handle updating the post
  // const handlePostUpdate = () => {
  //   setTitle(newTitle);
  //   setContent(newContent);
  //   setLocation(newLocation);
  //   setDate(newDate);
  //   setTime(newTime);
  //   onClose(); // Close the modal after update
  // };
  const handlePostUpdate = async() => {
    const updatedData = {
      title: newTitle,
      content: newContent,
      location: newLocation,
      date: newDate,
      start_time: newStartTime || "00:00",
      end_time: newEndTime || "00:00",
    };
    console.log("Updated Data:", updatedData);
    try {
      const response = await axiosInstance.put(`/clubs/announcements/${data.id}`, updatedData);
      console.log("Updated Event Data:", response.data.data);
      if (typeof onUpdate === "function") {
        onUpdate(response.data.data);
      }
      alert("Event updated successfully!");
      onClose(); // Close the modal after update
    }catch(err){
      console.error("Error updating event:", err);
      alert("Failed to update event. Please try again!");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-8">
      <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-2xl space-y-4">
        <button
          className="absolute right-3 top-3 text-gray-700 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title Field */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Title</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 w-full rounded-md shadow-sm border-gray-300 text-sm"
          />
        </div>

        {/* Content Field */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Content</label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border p-2 w-full h-24 rounded-md shadow-sm border-gray-300 text-sm"
          ></textarea>
        </div>

        {/* Location Field */}
        {newLocation !== "" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700">Location</label>
            <input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm border-gray-300 text-sm"
            />
          </div>
        )}

        {/* Date Field */}
        {newDate !== "" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm border-gray-300 text-sm"
            />
          </div>
        )}

        {/* Time Field */}
        {newStartTime !== "" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm border-gray-300 text-sm"
            />
          </div>
        )}

        {newEndTime !== "" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm border-gray-300 text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={handlePostUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-all duration-200"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubHomePostEditModal;
