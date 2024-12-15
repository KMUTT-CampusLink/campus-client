import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDiscussionPostBySectionID } from "../services/mutations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const PopupEvent = ({ closePopup, onSubmit }) => {
    const mutation = useDiscussionPostBySectionID();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState(new Date()); // Start Date
    const [endDate, setEndDate] = useState(new Date()); // End Date

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!title || !content) {
            alert("Please provide both a title and content.");
            return;
        }

        // Ensure startDate is greater than today
        if (startDate <= new Date()) {
            alert("Start Date must be in the future.");
            return;
        }

        // Ensure endDate is greater than startDate
        if (endDate <= startDate) {
            alert("End Date must be greater than Start Date.");
            return;
        }

        const newTopic = {
            section_id: localStorage.getItem("sec_id"),
            user_id: localStorage.getItem("userId"),
            title,
            content,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
        };

        try {
            // await mutation.mutateAsync(newTopic);
            closePopup();
        } catch (error) {
            console.error("Error submitting discussion:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                    onClick={closePopup}
                >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                <h2 className="text-xl font-bold text-[#ecb45e] mb-4">Create Event</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                            placeholder="Enter a title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                            placeholder="Enter content here"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Start Date Picker */}
                    <div className="mb-4">
                        <label
                            htmlFor="startDate"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Start Date & Time
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            minDate={new Date()} // Ensure start date is today or later
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                        />
                    </div>

                    {/* End Date Picker */}
                    <div className="mb-4">
                        <label
                            htmlFor="endDate"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            End Date & Time
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            minDate={startDate} // Ensure end date is not before start date
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closePopup}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#ecb45e] text-white px-4 py-2 rounded-md hover:bg-[#d9a24b]"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupEvent;
