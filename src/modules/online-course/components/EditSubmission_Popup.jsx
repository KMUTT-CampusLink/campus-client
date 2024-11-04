import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faTrash,
  faClose,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

const EditSubmissionPopup = ({ onClose, data }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFile);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
        <div className="flex items-center justify-between border-b-[1px] px-3 py-6 border-b-[#BEBEBE]">
          <h3>#{data.title}</h3>
          <button onClick={onClose} className="relative">
            <FontAwesomeIcon icon={faClose} color="red" />
          </button>
        </div>
        <div className="flex flex-col px-3 mt-4">
          <h2>ATTACHMENTS</h2>
          <div className="flex flex-col min-h-[230px] overflow-y-auto">
            {data.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex w-full pr-8 items-center justify-between gap-2 py-2"
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFile} color="red" />
                  <span className="text-[#D4A015]">{attachment}</span>
                </div>
                <button className="relative">
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-start relative border-[1px] border-[#BEBEBE] rounded-b-lg"
        >
          <input
            type="file"
            ref={fileInputRef} // Attach the ref to the input element
            onChange={handleFileChange}
            className="hidden"
          />
          <FontAwesomeIcon
            color="red"
            icon={faPaperclip}
            size={24}
            onClick={handleIconClick}
            className="cursor-pointer border-r-[1px] border-[#BEBEBE] p-2"
          />
        </form>
      </div>
    </div>
  );
};

export default EditSubmissionPopup;