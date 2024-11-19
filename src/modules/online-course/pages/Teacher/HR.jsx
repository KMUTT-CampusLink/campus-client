import { useState, useEffect } from "react";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { z } from "zod";
import popToast from "../../../../utils/popToast";
const sec_id = localStorage.getItem("sec_id") || 10001;
const schema = z.object({
  title: z.string().min(1, { message: "Video Title is required" }),
  courseVideo: z
    .instanceof(File)
    .refine((file) => file?.size !== 0, "File is required")
    .refine(
      (file) => file?.size < 50 * 1024 * 1024,
      "Video file must be at most 50MB"
    ) // Adjust max size as needed
    .refine((file) => {
      const allowedMimeTypes = [
        "video/mp4",
        "video/ogg",
        "video/webm",
        "video/x-msvideo",
      ];
      return allowedMimeTypes.includes(file.type); // Match MIME type
    }, "Invalid file type. Allowed types: MP4, OGG, WebM, AVI."),
});

function HR() {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    // Clear the error for the specific field
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    // Update the state based on the field being updated
    switch (field) {
      case "title":
        setTitle(value);
        break;

      default:
        break;
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null); // Set to null if no file is selected
    if (file) {
      console.log("File selected:", file); // Debugging info
    }
    setErrors((prevErrors) => ({ ...prevErrors, courseVideo: "" })); // Clear errors
  };

  const validateAndSubmit = async () => {
    const formData = {
      title,
      sec_id,
      courseVideo: selectedFile,
    };
    console.log(formData);
    try {
      schema.parse(formData);
      setErrors({});

      const submitData = new FormData();
      submitData.append("title", title);
      submitData.append("sec_id", sec_id);
      if (selectedFile) {
        submitData.append("courseVideo", selectedFile);
      }

      const response = await axiosInstance.post(
        "/courses/addVideo",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setTitle("");
        setSelectedFile(null);
        popToast("Video Uploaded successfully!", "success");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors into a usable error object for displaying messages
        const formErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formErrors); // Set errors state with validation messages
      } else {
        console.error("Error creating video:", error);
        popToast("An error occurred while creating the video.", "error");
      }
    }
  };

  return (
    <>
      <div
        className="bg-white min-h-screen rounded-lg sm:p-5"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-14">
          <div className="md:pl-20 pl-10 pr-10">
            <div className="mb-4">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Video Title
              </label>

              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                <input
                  id="videotitle"
                  type="text"
                  value={title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter Video Title"
                  className="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-4 pt-3">
              <label className="block text-lg font-medium leading-6 text-gray-900">
                Video
              </label>
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset sm:max-w-lg">
                {/* Display selected file name or "No file selected" */}
                <span className="flex-1 inline-flex items-center px-3 py-2 text-gray-500 text-sm bg-transparent border-r border-gray-300">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </span>

                {/*error message */}
                {errors.courseVideo && (
                  <p className="text-red-500">{errors.courseVideo}</p>
                )}

                {/* Preview Image */}
                {selectedFile && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-32 h-32 object-cover border rounded"
                    />
                  </div>
                )}

                {/* File Upload Button */}
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-r-lg bg-orange-400 text-white font-medium py-2 px-4 hover:bg-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                >
                  <span>Select File</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={onFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 w-full max-w-lg flex justify-end pb-8">
              <button
                onClick={validateAndSubmit}
                className="bg-orange-400 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-600"
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HR;
