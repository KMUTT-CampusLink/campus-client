import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faFile,
  faUpload,
  faX,
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
    <div className="">
      <NavForIndvCourse page="materials" />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />
      <div className="w-full px-28">
        <div className="my-2 md:pl-4 flex items-center space-x-4 mb-4">
          <h2 className="font-bold text-[#ecb45e] text-2xl">Materials</h2>
          <button
            onClick={handleEditClick}
            className={`p-4 rounded-md flex items-center space-x-2 font-semibold ${isEditing ? "bg-red-500" : "bg-blue-500"
              } text-white`}
          >
            <FontAwesomeIcon icon={isEditing ? faX : faUpload} className="" />
            {isEditing ? (
              <span>Cancel Upload</span>
            ) : (
              <span>Upload New Video</span>
            )}
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="min-h-screen rounded-lg sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="md:pl-20 px-10">
              <div className="mb-4">
                <label className="block text-lg font-medium">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter video title"
                  className="block w-full p-2 border rounded-md shadow-sm"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Upload Video</label>
                <input
                  type="file"
                  id="videoFileInput"
                  name="videoFile"
                  onChange={handleInputChange}
                  className="block w-full border p-2 rounded-md"
                  accept="video/mp4, video/ogg, video/webm, video/x-msvideo"
                />
                {formData.videoFile && (
                  <p>Selected Video: {formData.videoFile.name}</p>
                )}
                {errors.videoFile && (
                  <p className="text-red-500">{errors.videoFile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Upload Additional Materials
                </label>
                <input
                  type="file"
                  id="materialFilesInput"
                  name="materialFiles"
                  multiple
                  onChange={handleInputChange}
                  className="block w-full border p-2 rounded-md"
                  accept="application/pdf,image/*"
                />
                {formData.materialFiles.length > 0 && (
                  <ul className="list-disc pl-5">
                    {formData.materialFiles.map((file, index) => (
                      <li key={index}>
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                )}
                {errors.materialFiles && (
                  <p className="text-red-500">{errors.materialFiles}</p>
                )}
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-all"
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
                    className="flex items-center border my-2 rounded-md"
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                      size="xl"
                      style={{ color: "#e6700f" }}
                      className="px-2"
                    />
                    <a
                      className="p-2 mx-2"
                      href={`${MINIO_BASE_URL}/${file.file_path}`}
                      download
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
      </div></div>
  );
};

export default TrCourseMaterials;
