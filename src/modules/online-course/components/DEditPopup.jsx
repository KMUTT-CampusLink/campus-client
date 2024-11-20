import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEditDiscussionPost } from "../services/mutations";

const DEditPopup = ({ post, closePopup }) => {
  const editMutation = useEditDiscussionPost(); // Mutation for editing posts
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const updatedPost = {
      title,
      content,
      discussion_img: file ? file.name : post.discussion_img, // Use new file if uploaded, otherwise keep existing
    };

    try {
      await editMutation.mutateAsync(
        { topicId: post.id, updatedPost },
        {
          onSuccess: () => {
            alert("Post updated successfully!");
            closePopup(); // Close the popup after a successful update
          },
        }
      );
    } catch (error) {
      console.error("Error updating discussion:", error);
      alert("Failed to update the post. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={closePopup}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-[#ecb45e] mb-4">
          Edit Discussion
        </h2>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
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
              required
            />
          </div>

          {/* Content Input */}
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
              rows="4"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-medium mb-1"
            >
              Change Image (Optional)
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
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
              disabled={editMutation.isLoading}
            >
              {editMutation.isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DEditPopup;
