// import { useState, useEffect } from "react";

// const ClubHomePostEditModal = ({ isOpen, onClose, data }) => {
//   if (!isOpen) return null;

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const [newTitle, setNewTitle] = useState(title);
//   const [newContent, setNewContent] = useState(content);
//   const [newLocation, setNewLocation] = useState(location);
//   const [newDate, setNewDate] = useState(date);
//   const [newTime, setNewTime] = useState(time);

//   useEffect(() => {
//     if (data) {
//       setTitle(data.title || ""); //if it doesn't exist, empty string
//       setContent(data.content || "");
//       setNewTitle(data.title || "");
//       setNewContent(data.content || "");
//       setNewLocation(data.location || null);
//       setNewDate(data.date || null);
//       setNewTime(data.time || null);
//     }
//   }, [data]);

//   const handlePost = () => {
//     setTitle(newTitle);
//     setContent(newContent);
//     setLocation(newLocation);
//     setDate(newDate);
//     setTime(newTime);
//     onClose();
//   };

//   return (
//     <div className="modal modal-open">
//       <div className="modal-box relative bg-[#505050] p-8">
//         <button
//           className=" absolute right-2 top-2 bg-[#505050]"
//           onClick={onClose}
//         >
//           ✕
//         </button>
//         <input
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           className="w-full h-[7vh] md:h-[5vh] p-4 bg-[#505050] text-white text-base rounded-md overflow-auto"
//         />
//         <textarea
//           value={newContent}
//           onChange={(e) => setNewContent(e.target.value)}
//           className="w-full h-[12vh] md:h-[10vh] p-4 bg-[#505050] text-white text-base rounded-md"
//         ></textarea>
//         {newLocation != null && (
//           <textarea
//             value={newLocation}
//             onChange={(e) => setNewLocation(e.target.value)}
//             className="w-full h-[7vh] md:h-[5vh] p-4 bg-[#505050] text-white text-base rounded-md overflow-auto"
//           ></textarea>
//         )}
//         {newDate != null && (
//           <input
//             value={newDate}
//             onChange={(e) => setNewDate(e.target.value)}
//             className="w-full h-[7vh] md:h-[5vh] p-4 bg-[#505050] text-white text-base rounded-md overflow-auto"
//           />
//         )}
//         {newTime != null && (
//           <input
//             value={newTime}
//             onChange={(e) => setNewTime(e.target.value)}
//             className="w-full h-[7vh] md:h-[5vh] p-4 bg-[#505050] text-white text-base rounded-md overflow-auto"
//           />
//         )}

//         <button
//           onClick={handlePost}
//           className=" flex bg-[#EC5A51] mt-4 ml-auto text-white px-4 md:px-8 py-2 rounded-lg"
//         >
//           Post
//         </button>
//         {/* Add more content as needed */}
//       </div>
//     </div>
//   );
// };
// export default ClubHomePostEditModal;

import { useState, useEffect } from "react";

const ClubHomePostEditModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  // State for the post fields (title, content, location, date, time)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Local state for the form inputs
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newLocation, setNewLocation] = useState(location);
  const [newDate, setNewDate] = useState(date);
  const [newTime, setNewTime] = useState(time);

  // UseEffect to pre-fill the modal fields with post data
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.content || "");
      setNewTitle(data.title || "");
      setNewContent(data.content || "");
      setNewLocation(data.location || "");
      setNewDate(data.date || "");
      setNewTime(data.time || "");
    }
  }, [data]);

  // Function to handle updating the post
  const handlePostUpdate = () => {
    setTitle(newTitle);
    setContent(newContent);
    setLocation(newLocation);
    setDate(newDate);
    setTime(newTime);
    onClose(); // Close the modal after update
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
        {newTime !== "" && (
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
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
