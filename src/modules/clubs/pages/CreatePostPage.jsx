import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";

const schema = z.object({
  title: z.string().nonempty({ message: "Post title is required" }),
  content: z.string().nonempty({ message: "Post content is required" }),
});

function CreatePost() {
  const { clubId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  // Handle file change event
  // const handlePhotoChange = (e) => {
  //   setPhoto(e.target.files[0]);
  // };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/avif",
      ];
      if (!allowedMimeTypes.includes(file.type)) {
        alert("Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, AVIF.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }
    }

    setPhoto(file || null); // Set to null if no file is selected
  };

  const onSubmit = async (data) => {
    if (!photo) {
      alert("Please upload a valid photo.");
      return; // Stop form submission if no photo is selected
    }
    const formData = new FormData();
    formData.append("postTitle", data.title); // Must match backend expectation
    formData.append("postContent", data.content); // Must match backend expectation
    if (photo) {
      formData.append("photo", photo); // Must match the key the backend expects
    }

    try {
      const response = await axiosInstance.post(
        `/clubs/admin/post/${clubId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Post created successfully");
      navigate(`/clubs/club-home/${clubId}`); // Optional: navigate to another page
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("Failed to create post");
    }
  };

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto px-4"
        //encType="multipart/form-data"
      >
        {/* Post Title */}
        <div>
          <label className="block text-xl font-semibold">
            Post Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Post Content */}
        <div>
          <label className="block text-xl font-semibold">
            Post Content <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("content")}
            className={`border p-2 w-full rounded-md shadow-sm ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xl font-semibold">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
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