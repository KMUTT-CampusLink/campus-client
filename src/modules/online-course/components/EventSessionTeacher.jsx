import React, { useState, useEffect } from "react";
import { useUpComingEventsByTeacher } from "../services/queries";
import { useDeleteEvent } from "../services/mutations"; // Import the useDeleteEvent mutation

const EventSessionTeacher = ({ refresh }) => {
    const empID = localStorage.getItem("empId"); // Get empID from localStorage
    const sectionID = localStorage.getItem("sec_id");

    // Fetch data using the custom hook
    const { data: events, isLoading, isError, refetch } = useUpComingEventsByTeacher(empID, sectionID);

    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // To store the event to delete

    // Use the delete event mutation
    const deleteEvent = useDeleteEvent();

    useEffect(() => {
        if (refresh) {
            refetch(); // Trigger the data fetch again when refresh changes
        }
    }, [refresh, refetch]);

    const handleDeleteClick = (event) => {
        setSelectedEvent(event); // Set the selected event for deletion
        setIsDeletePopupOpen(true); // Open the confirmation popup
    };

    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false); // Close the confirmation popup
        setSelectedEvent(null); // Clear the selected event
    };

    const handleDeleteConfirm = async () => {
        if (selectedEvent && selectedEvent.id) {

            const newEvent = { announcementID: selectedEvent.id, empID: empID, };

            
            try {
                await deleteEvent.mutateAsync(newEvent);
                setIsDeletePopupOpen(false);
                // After deleting, you may want to refresh the event list
                refetch(); // Refresh the events list after deletion

                // Close the confirmation popup
                setSelectedEvent(null); // Clear the selected event
            } catch (error) {
                alert("Error submitting discussion:", error);
            }

        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !events || !Array.isArray(events.announcement) || events.announcement.length === 0) {
        return <div>No upcoming announcements found.</div>;
    }

    return (
        <div className="mt-6">
            {events.announcement.map((announcement) => (
                <div
                    key={announcement.id}
                    className="border border-gray-300 rounded-lg mb-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out relative"
                >
                    <div className="flex flex-col justify-between items-start max-md:gap-4 max-md:mx-4 max-lg:mx-8 lg:mx-12 p-2 bg-gray-50 rounded-md">
                        <span className="font-semibold text-[#EC5A51] text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                            {announcement.title}
                        </span>
                        <span className="font-normal text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
                            {announcement.content}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm mt-2">
                            {new Date(announcement.start_date).toLocaleDateString()} -{" "}
                            {new Date(announcement.end_date).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDeleteClick(announcement)} // Open confirmation popup with the event
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md text-xs hover:bg-red-600 transition-all"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Confirmation Popup */}
            {isDeletePopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                            Are you sure you want to delete this announcement?
                        </h2>
                        <div className="flex justify-around">
                            <button
                                onClick={handleCancelDelete} // Close the popup without deleting
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm} // Perform deletion and confirm
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventSessionTeacher;
