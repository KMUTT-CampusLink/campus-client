import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from "../../registration/components/NavBarComponents/NavBar";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters"),
  studentId: z
    .string()
    .nonempty({ message: "Student ID is required" })
    .regex(/^\d+$/, "Student ID must be a number"),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(
      /^[A-Za-z]+(\.[A-Za-z]+)?@kmutt\.ac\.th$/,
      "Email must follow the kmutt email format"
    ),
  yearOfStudy: z.string().nonempty({ message: "Year of Study is required" }),
  advisor: z.string().nonempty({ message: "Advisor is required" }),
  timeSlot: z.string().nonempty({ message: "Time Slot is required" }),
  reason: z.string().nonempty({ message: "Reason is required" }),
});

const FormPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted");
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="flex justify-center items-center py-8 flex-grow w-full bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white p-6 md:p-8 lg:p-10 rounded-lg w-full max-w-xs sm:max-w-xs md:max-w-md lg:max-w-xl shadow-xl border border-gray-300 mt-10 md:mt-10 "
        >
        
          <div className="flex flex-col items-center mb-6">
            <img src="/chatbot/LOGO.svg" alt="Logo" className="w-10 h-auto mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
              Advisor Request Form
            </h1>
          </div>

         
          <div className="mb-4">
            <label htmlFor="name" className="text-sm md:text-base text-black mb-1 block w-full">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className={`w-full p-2.5 mb-4 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          
          <div className="mb-4">
            <label htmlFor="studentId" className="text-sm md:text-base text-black mb-1 block w-full">
              Student ID
            </label>
            <input
              id="studentId"
              type="text"
              {...register("studentId")}
              placeholder="Enter your student ID"
              className={`w-full p-2.5 mb-4 border ${
                errors.studentId ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.studentId && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.studentId.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-sm md:text-base text-black mb-1 block w-full">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full p-2.5 mb-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

         
          <div className="mb-4">
            <label htmlFor="yearOfStudy" className="text-sm md:text-base text-black mb-1 block w-full">
              Year of Study
            </label>
            <input
              id="yearOfStudy"
              type="text"
              {...register("yearOfStudy")}
              placeholder="Enter your year of study"
              className={`w-full p-2.5 mb-4 border ${
                errors.yearOfStudy ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.yearOfStudy && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.yearOfStudy.message}</p>
            )}
          </div>

          
          <div className="mb-4">
            <label htmlFor="advisor" className="text-sm md:text-base text-black mb-1 block w-full">
              Choose Your Advisor
            </label>
            <select
              id="advisor"
              {...register("advisor")}
              className={`w-full p-2.5 mb-4 border ${
                errors.advisor ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select Advisor</option>
              <option value="advisor1">Dr. Chulameth</option>
            </select>
            {errors.advisor && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.advisor.message}</p>
            )}
          </div>

         
          <div className="mb-4">
            <label htmlFor="timeSlot" className="text-sm md:text-base text-black mb-1 block w-full">
              Time Slots
            </label>
            <select
              id="timeSlot"
              {...register("timeSlot")}
              className={`w-full p-2.5 mb-4 border ${
                errors.timeSlot ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select Time Slot</option>
              <option value="9am">9:00 AM</option>
              <option value="10am">10:00 AM</option>
            </select>
            {errors.timeSlot && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.timeSlot.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="reason" className="text-sm md:text-base text-black mb-1 block w-full">
              Reason
            </label>
            <textarea
              id="reason"
              {...register("reason")}
              placeholder="Enter the reason for requesting an advisor"
              className={`w-full p-2.5 mb-4 border ${
                errors.reason ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm md:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              rows="4"
            ></textarea>
            {errors.reason && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>

     
          <div className="flex justify-center space-x-4 md:space-x-10">
            <button
              type="submit"
              className="text-sm md:text-base bg-[#864E41] text-white px-8 py-2 md:px-12 md:py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#6a3b29]"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm md:text-base bg-[#864E41] text-white px-8 py-2 md:px-12 md:py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#6a3b29]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
