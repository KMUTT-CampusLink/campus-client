import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";

const schema = z.object({
  title: z.string().nonempty({ message: "Post title is required" }),
  content: z.string().nonempty({ message: "Post content is required" }),
});

function CreatePost() {
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
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("postTitle", data.title);
    formData.append("postContent", data.content);
    if (photo) {
      formData.append("photo", photo);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/clubs/admin/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert("Post created successfully");
      navigate("/"); // Optional: navigate to another page
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
        encType="multipart/form-data"
      >
        {/* Post Title */}
        <div>
          <label className="block text-xl font-semibold">Post Title</label>
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
          <label className="block text-xl font-semibold">Post Content</label>
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