import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faFile,
  faUpload,
  faX,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import {
  useAllVideos,
  useCourseHeaderBySectionID,
} from "../../services/queries";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { z } from "zod";
import popToast from "../../../../utils/popToast";

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME
  }`;

const TrCourseMaterials = () => {
  const sec_id = localStorage.getItem("sec_id") || 1001;

  const schema = z.object({
    title: z.string().min(1, { message: "Video Title is required" }),
    videoFile: z
      .instanceof(File)
      .refine((file) => file?.size !== 0, "Video file is required")
      .refine(
        (file) => file?.size < 50 * 1024 * 1024,
        "Video file must be at most 50MB"
      )
      .refine(
        (file) =>
          ["video/mp4", "video/ogg", "video/webm", "video/x-msvideo"].includes(
            file.type
          ),
        "Invalid video file type. Allowed types: MP4, OGG, WebM, AVI."
      ),
    materialFiles: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file?.size !== 0, "File is required")
          .refine(
            (file) => file?.size < 20 * 1024 * 1024,
            "Each file must be at most 20MB"
          )
          .refine(
            (file) =>
              ![
                "video/mp4",
                "video/ogg",
                "video/webm",
                "video/x-msvideo",
              ].includes(file.type),
            "Video files are not allowed here."
          )
      )
      .optional(),
  });

  const [formData, setFormData] = useState({
    title: "",
    videoFile: null,
    materialFiles: [],
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    video: "",
    videoId: "",
    videoURL: "",
    attachments: [],
  });

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: videos } = useAllVideos(sec_id);

  // Preload video details when videos are available
  useEffect(() => {
    if (videos && videos.length > 0) {
      const firstVideo = videos[0];
      setVideoDetails({
        video: firstVideo.title,
        videoId: firstVideo.id,
        videoURL: firstVideo.video_url,
        attachments: firstVideo.course_attachment,
      });
    }
  }, [videos]);

  // Initialize state or perform any necessary updates
  useEffect(() => {
    console.log("Component mounted or updated");
    // Any other setup logic can be added here
    return () => {
      console.log("Cleanup on component unmount");
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files
        ? name === "videoFile"
          ? files[0] // Single file input
          : Array.from(files) // Multiple files input
        : value,
    }));

    // Clear errors for the input field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    try {
      schema.parse(formData);
      setErrors({});
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("sec_id", sec_id);

      if (formData.videoFile)
        submitData.append("videoFile", formData.videoFile);
      formData.materialFiles.forEach((file) =>
        submitData.append("materialFiles", file)
      );

      const response = await axiosInstance.post(
        "/courses/addVideoMaterials",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setFormData({ title: "", videoFile: null, materialFiles: [] });
        document.getElementById("videoFileInput").value = null; // Reset the video file input
        document.getElementById("materialFilesInput").value = null; // Reset the material files input
        popToast("Files uploaded successfully!", "success");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        console.error("Error uploading files:", error);
        popToast("An error occurred while uploading the files.", "error");
      }
    }
  };

  const handleEditClick = () => setIsEditing((prev) => !prev);

  const handleVideoSelectChange = (event) => {
    const selectedVideo = videos.find(
      (vid) => vid.title === event.target.value
    );
    if (selectedVideo) {
      setVideoDetails({
        video: selectedVideo.title,
        videoId: selectedVideo.id,
        videoURL: selectedVideo.video_url,
        attachments: selectedVideo.course_attachment,
      });
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
      <NavForIndvCourse page="materials" />
      <div className="py-8">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />
      </div>
      <div className="max-sm:text-sm max-md:pt-2 pt-4 pb-8 border-b-2 bg-white shadow-lg rounded-md mx-auto w-11/12 max-md:w-full max-md:mx">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto p-4">
          <div className="text-2xl font-extrabold pb-3 text-[#ecb45e]">
            Materials
          </div>
          <button
            onClick={handleEditClick}
            className={`px-6 py-2 mt-4 rounded-lg flex items-center font-medium justify-center transition duration-200 shadow-md ${isEditing
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-[#ecb45e] hover:bg-[#d9a24b] text-white"
              }`}
          >
            <FontAwesomeIcon icon={isEditing ? faX : faUpload} className="mr-2" />
            {isEditing ? "Cancel Upload" : "Upload New Video"}
          </button>


        </div>

        {isEditing && (
          <div className="min-h-screen rounded-lg sm:p-5 px-6 sm:px-28 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="md:pl-20 px-10">
                {/* Video Title */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2 text-gray-700">
                    Video Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter video title"
                    className="block w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                  />
                  {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Upload Video */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2 text-gray-700">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    id="videoFileInput"
                    name="videoFile"
                    onChange={handleInputChange}
                    className="block w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                    accept="video/mp4, video/ogg, video/webm, video/x-msvideo"
                  />
                  {formData.videoFile && (
                    <p className="text-gray-700 mt-1">
                      Selected Video: {formData.videoFile.name}
                    </p>
                  )}
                  {errors.videoFile && (
                    <p className="text-red-500 mt-1">{errors.videoFile}</p>
                  )}
                </div>

                {/* Upload Additional Materials */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2 text-gray-700">
                    Upload Additional Materials
                  </label>
                  <input
                    type="file"
                    id="materialFilesInput"
                    name="materialFiles"
                    multiple
                    onChange={handleInputChange}
                    className="block w-full p-3 border rounded-md focus:ring-2 focus:ring-[#ecb45e] focus:outline-none"
                    accept="application/pdf,image/*"
                  />
                  {formData.materialFiles.length > 0 && (
                    <ul className="list-disc pl-5 mt-2">
                      {formData.materialFiles.map((file, index) => (
                        <li key={index} className="text-gray-700">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.materialFiles && (
                    <p className="text-red-500 mt-1">{errors.materialFiles}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#ecb45e] hover:bg-[#d9a24b] text-white py-2 px-6 rounded-lg flex items-center justify-center font-medium shadow-md transition duration-200"
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="px-6 sm:px-28 grid sm:grid-cols-7 mb-12">
          <div className="sm:col-span-5">
            {videoDetails.videoURL && (
              <div className="w-full">
                <video
                  controls
                  className="max-w-full max-h-[400px] object-cover rounded-lg"
                  src={`${MINIO_BASE_URL}/${videoDetails.videoURL}`}
                ></video>
              </div>
            )}{" "}
          </div>
          <div className="sm:col-span-2">
            <div className="mx-auto mt-4 mb-6 sm:ml-6">
              <label className="block mb-2 font-semibold font-georama">
                Select Lecture Title
              </label>
              <select
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs overflow-visible"
                value={videoDetails.video}
                onChange={handleVideoSelectChange}
              >
                <option disabled>Select Lecture</option>
                {videos?.map((vid, index) => (
                  <option key={index} value={vid.title}>
                    {vid.title}
                  </option>
                ))}
              </select>
            </div>
            <h3 className="p-4 font-bold text-xl">Class Materials</h3>
            <div className="">
              {videoDetails.attachments?.length > 0 ? (
                <ul className="px-5 w-full">
                  {videoDetails.attachments.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center border my-2 rounded-md overflow-hidden"
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        size="xl"
                        style={{ color: "#e6700f" }}
                        className="px-2"
                      />
                      <a
                        className="p-2 mx-2 overflow-hidden whitespace-nowrap text-ellipsis block w-full"
                        href={`${MINIO_BASE_URL}/${file.file_path}`}
                        download
                        title={file.file_name} // Shows full name on hover
                      >
                        {file.file_name}
                      </a>
                    </li>

                  ))}
                </ul>
              ) : (
                <p>No attachments available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrCourseMaterials;
