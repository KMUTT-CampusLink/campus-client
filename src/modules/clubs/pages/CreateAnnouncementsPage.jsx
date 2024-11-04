import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Importing zod
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import { axiosInstance } from "../../../utils/axiosInstance";

// Schema definition using Zod, including date, time, and place
const schema = z.object({
  announcementDescription: z
    .string()
    .nonempty({ message: "Announcement description is required" }),
  announcementDetail: z
    .string()
    .nonempty({ message: "Announcement detail is required" }),
  eventDate: z.string().nonempty({ message: "Event date is required" }),
  eventTime: z.string().nonempty({ message: "Event time is required" }),
  eventPlace: z.string().nonempty({ message: "Event place is required" }),
});

function CreateAnnouncement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Apply zodResolver with schema
  });

  const navigate = useNavigate(); // Hook to navigate between routes

  // const onSubmit = (data) => {
  //   console.log(data);
  //   // Navigate to the desired route after submitting the form
  //   navigate("/clubs/club-home"); // Change this to your desired route
  // };
  const onSubmit = async (data) => {
    const formattedData = {
      announcementTitle: data.announcementDescription,
      announcementContent: data.announcementDetail,
      eventDate: new Date(`${data.eventDate}T${data.eventTime}`), // Combine date and time
      eventPlace: data.eventPlace,
    };
  
    try {
      const response = await axiosInstance.post("/clubs/announcements", formattedData);
      if (response.data.success) {
        navigate("/clubs/club-home");
      } else {
        console.error("Failed to create announcement:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };
  

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto px-4"
      >
        {/* Announcement Description */}
        <div>
          <label className="block text-xl font-semibold">(Announcement) Description</label>
          <input
            {...register("announcementDescription")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.announcementDescription ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.announcementDescription && (
            <p className="text-red-500">{errors.announcementDescription.message}</p>
          )}
        </div>

        {/* Announcement Detail */}
        <div>
          <label className="block text-xl font-semibold">(Announcement) Detail</label>
          <textarea
            {...register("announcementDetail")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.announcementDetail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.announcementDetail && (
            <p className="text-red-500">{errors.announcementDetail.message}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-xl font-semibold">Event Date</label>
          <input
            type="date"
            {...register("eventDate")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.eventDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.eventDate && (
            <p className="text-red-500">{errors.eventDate.message}</p>
          )}
        </div>

        {/* Event Time */}
        <div>
          <label className="block text-xl font-semibold">Event Time</label>
          <input
            type="time"
            {...register("eventTime")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.eventTime ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.eventTime && (
            <p className="text-red-500">{errors.eventTime.message}</p>
          )}
        </div>

        {/* Event Place */}
        <div>
          <label className="block text-xl font-semibold">Event Place</label>
          <input
            {...register("eventPlace")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.eventPlace ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.eventPlace && (
            <p className="text-red-500">{errors.eventPlace.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600 transition-all duration-200 w-fit shadow-md"
        >
          Create Announcement
        </button>
      </form>
    </div>
  );
}

export default CreateAnnouncement;
