import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faCloudUploadAlt, faX } from "@fortawesome/free-solid-svg-icons";
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

      <div className="container mx-auto py-6 min-h-screen">
        <CourseHeader
          c_code={details?.course_code}
          c_name={details?.course_name}
          c_lecturer={details?.lecturer}
          c_time={details?.time}
        />

        <div className="mx-auto mt-4 mb-6 flex justify-end">
          <button
            onClick={handleEditClick}
            className={`p-3 rounded-md text-white shadow-md ${isEditing ? "bg-red-600" : "bg-blue-600"
              } hover:bg-opacity-90 transition-all`}
          >
            <FontAwesomeIcon
              icon={isEditing ? faX : faPenToSquare}
              className="mr-2"
            />
            {isEditing ? "Cancel Upload" : "Edit Materials"}
          </button>
        </div>

        {isEditing && (
          <div className="bg-white min-h-screen rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Upload New Materials</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium">Video Title</label>
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
        )}

        <div className="rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Video and Attachments</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Lecture</label>
            <select
              className="w-full border rounded-md p-2"
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

          {videoDetails.videoURL && (
            <div className="mb-4">
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                src={`${MINIO_BASE_URL}/${videoDetails.videoURL}`}
              ></video>
            </div>
          )}

          <div className="m-10">
            <h3 className="text-lg font-semibold">Attachments</h3>
            {videoDetails.attachments?.length > 0 ? (
              <ul className="list-disc pl-5">
                {videoDetails.attachments.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`${MINIO_BASE_URL}/${file.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
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
