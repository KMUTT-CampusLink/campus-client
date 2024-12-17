import React from "react";
import { useUpComingEvents } from "../services/queries";

const EventSession = ({ studentId }) => {
    // Fetch data using the custom hook
    const { data: events, isLoading, isError } = useUpComingEvents(studentId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !events || events.length === 0 || events.announcements.length === 0) {
        return <div className="border border-gray-300 rounded-lg mb-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out mt-3">No upcoming events around this time.</div>;
    }

    return (
        <div className="mt-6">
            {events.announcements.map((announcement) => (
                <div
                    key={announcement.id}
                    className="border border-gray-300 rounded-lg mb-6 max-sm:mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 shadow-md bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    <div className="flex flex-col justify-between items-start max-md:gap-4 max-md:mx-4 max-lg:mx-8 lg:mx-12 p-2 bg-gray-50 rounded-md">
                        {/* Title of the announcement */}
                        <span className="font-semibold text-[#EC5A51] text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                            {announcement.title}
                        </span>

                        {/* Content of the announcement */}
                        <span className="font-normal text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
                            {announcement.content}
                        </span>

                        {/* Start and end date of the announcement */}
                        <span className="text-gray-500 text-xs sm:text-sm mt-2">
                            {new Date(announcement.start_date).toLocaleDateString()} -{" "}
                            {new Date(announcement.end_date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventSession;
