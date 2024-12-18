import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Importing zod
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import { axiosInstance } from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";

// Schema definition using Zod, including date, time, and place
const schema = z.object({
  announcementDescription: z
    .string()
    .nonempty({ message: "Announcement description is required" }),
  announcementDetail: z
    .string()
    .nonempty({ message: "Announcement detail is required" }),
  eventDate: z.string().nonempty({ message: "Event date is required" }),
  eventTimeFrom: z.string().nonempty({ message: "Event time is required" }),
  eventTimeTo: z.string().nonempty({ message: "Event time is required" }),
  eventPlace: z.string().nonempty({ message: "Event place is required" }),
  seats: z
    .number({ invalid_type_error: "Seats must be a number" })
    .positive({ message: "Seats must be a positive number" }),
  ticketAmount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Amount must be a positive number" }),
});

function CreateAnnouncement() {
  const { clubId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Apply zodResolver with schema
  });

  const navigate = useNavigate(); // Hook to navigate between routes
  const onSubmit = async (data) => {
    
    const jsonData = {
      announcementTitle: data.announcementDescription,
      announcementContent: data.announcementDetail,
      eventDate: data.eventDate,
      eventTimeFrom: data.eventTimeFrom,
      eventTimeTo: data.eventTimeTo,
      eventPlace: data.eventPlace,
      seats: data.seats,
      ticketAmount: data.ticketAmount,
    };
    
    try {
      const response = await axiosInstance.post(`/clubs/admin/announcements/${clubId}`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        alert("Event created successfully");
        navigate(`/clubs/club-home/${clubId}`);
      } else {
        console.error("Failed to create event:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
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
          <label className="block text-xl font-semibold">Event Description <span className="text-red-500">*</span></label>
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
          <label className="block text-xl font-semibold">Event Detail <span className="text-red-500">*</span></label>
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
          <label className="block text-xl font-semibold">Event Date <span className="text-red-500">*</span></label>
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
          <label className="block text-xl font-semibold">Event Time (From) <span className="text-red-500">*</span></label>
          <input
            type="time"
            {...register("eventTimeFrom")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.eventTimeFrom ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.eventTimeFrom && (
            <p className="text-red-500">{errors.eventTimeFrom.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xl font-semibold">Event Time (To) <span className="text-red-500">*</span></label>
          <input
            type="time"
            {...register("eventTimeTo")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.eventTimeTo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.eventTimeTo && (
            <p className="text-red-500">{errors.eventTimeTo.message}</p>
          )}
        </div>

        {/* Event Place */}
        <div>
          <label className="block text-xl font-semibold">Event Place <span className="text-red-500">*</span></label>
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

        {/* Seats */}
        <div>
          <label className="block text-xl font-semibold">
            Seats <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("seats", { valueAsNumber: true })}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.seats ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.seats && <p className="text-red-500">{errors.seats.message}</p>}
        </div>

        {/* Ticket Amount */}
        <div>
          <label className="block text-xl font-semibold">
            Ticket Amount (Baht) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("ticketAmount", { valueAsNumber: true })}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.ticketAmount ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.ticketAmount && <p className="text-red-500">{errors.ticketAmount.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600 transition-all duration-200 w-fit shadow-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateAnnouncement;