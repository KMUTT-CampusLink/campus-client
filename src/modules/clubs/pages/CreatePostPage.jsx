import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Importing zod
import { useNavigate } from "react-router-dom"; // Importing useNavigate

// Schema definition using Zod
const schema = z.object({
  postDescription: z
    .string()
    .nonempty({ message: "Post description is required" }),
  postDetail: z
    .string()
    .nonempty({ message: "Post detail is required" }),
  // We don't include photo in schema since zod does not validate files
});

function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Apply zodResolver with schema
  });

  const navigate = useNavigate(); // Hook to navigate between routes
  const [photo, setPhoto] = useState(null); // State to handle the uploaded photo

  // Handle file change event
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]); // Store the selected file
  };

  const onSubmit = (data) => {
    const formData = new FormData(); // Create a FormData object to handle file uploads
    formData.append("postDescription", data.postDescription);
    formData.append("postDetail", data.postDetail);
    if (photo) {
      formData.append("photo", photo); // Add the photo to the FormData if it exists
    }

    // For example, here you would send the formData to your backend (e.g., via Axios)
    // axios.post("/api/posts", formData) - Uncomment when using axios or any HTTP request library
    console.log(data, photo);

    // Navigate to the desired route after submitting the form
    navigate("/clubs/club-home"); // Change this to your desired route
  };

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto px-4"
        encType="multipart/form-data" // Important for file uploads
      >
        {/* Post Description */}
        <div>
          <label className="block text-xl font-semibold">Post Description</label>
          <input
            {...register("postDescription")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.postDescription ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.postDescription && (
            <p className="text-red-500">{errors.postDescription.message}</p>
          )}
        </div>

        {/* Post Detail */}
        <div>
          <label className="block text-xl font-semibold">Post Detail</label>
          <textarea
            {...register("postDetail")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.postDetail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.postDetail && (
            <p className="text-red-500">{errors.postDetail.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xl font-semibold">Upload Photo</label>
          <input
            type="file"
            accept="image/*" // Accept image files only
            onChange={handlePhotoChange}
            className="border p-2 w-full rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600 transition-all duration-200 w-fit shadow-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
