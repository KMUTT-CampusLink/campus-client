import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import {
  useAllVideos,
  useCourseHeaderBySectionID,
} from "../../services/queries";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { z } from "zod";
import popToast from "../../../../utils/popToast";

const TrCourseMaterials = () => {
  const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${
    import.meta.env.VITE_MINIO_BUCKET_NAME
  }`;

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
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [materialFiles, setMaterialFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file || null);
    setErrors((prev) => ({ ...prev, videoFile: "" }));
  };

  const handleMaterialsChange = (e) => {
    const files = Array.from(e.target.files);
    setMaterialFiles(files);
    setErrors((prev) => ({ ...prev, materialFiles: "" }));
  };

  const validateAndSubmit = async () => {
    const formData = {
      title,
      videoFile,
      materialFiles,
    };

    try {
      schema.parse(formData); // Validate data using Zod
      setErrors({});

      const submitData = new FormData();
      submitData.append("title", title);
      submitData.append("sec_id", sec_id);
      if (videoFile) {
        submitData.append("videoFile", videoFile);
      }
      materialFiles.forEach((file, index) => {
        submitData.append(`materialFiles`, file);
      });

      // Log files being sent
      console.log("Uploading the following data:");
      console.log("Title:", title);
      console.log("Video File:", videoFile);
      console.log("Material Files:", materialFiles);

      // Inspect FormData content
      for (let pair of submitData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await axiosInstance.post(
        "/courses/addVideoMaterials",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setTitle("");
        setVideoFile(null);
        setMaterialFiles([]);
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

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: videos } = useAllVideos(sec_id);
  console.log(details);
  console.log("Fetched videos:", videos);

  const [video, setVideo] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [attachments, setAttachments] = useState([]); // State to store attachments

  useEffect(() => {
    if (videos && videos.length > 0) {
      const firstVideo = videos[0];
      setVideo(firstVideo.title);
      setVideoId(firstVideo.id);
      setVideoURL(firstVideo.video_url);
      setAttachments(firstVideo.course_attachment); // Set attachments for the first video
    }
  }, [videos]);

  const handleSemesterChange = (event) => {
    const selectedVideo = videos.find(
      (vid) => vid.title === event.target.value
    );
    if (selectedVideo) {
      setVideo(selectedVideo.title);
      setVideoId(selectedVideo.id);
      setVideoURL(selectedVideo.video_url);
      setAttachments(selectedVideo.course_attachment); // Set attachments for the selected video
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  return (
    <div className="max-md:text-xs w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"materials"} />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />
      {/* Edit button */}
      <div className="mx-auto mt-4 mb-6 md:ml-6">
        <button
          onClick={handleEditClick}
          className={`p-2 rounded-md font-semibold ${
            isEditing ? "bg-green-500" : "bg-blue-500"
          } text-white`}
        >
          <FontAwesomeIcon
            icon={isEditing ? faCheck : faPenToSquare}
            className="mr-2"
          />
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Conditionally render additional paragraph when in editing mode */}
      {isEditing && (
        <div className="bg-white min-h-screen rounded-lg sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-14">
            <div className="md:pl-20 pl-10 pr-10">
              {/* Video Title Input */}
              <div className="mb-4">
                <label className="block text-lg font-medium">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter Video Title"
                  className="block w-full px-3 py-2 border rounded-md"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              {/* Video File Input */}
              <div className="mb-4">
                <label className="block text-lg font-medium">
                  Upload Video
                </label>
                <input
                  type="file"
                  id="videoFileInput"
                  onChange={handleVideoChange}
                  className="block w-full px-3 py-2 border rounded-md"
                  accept="video/mp4, video/ogg, video/webm, video/x-msvideo"
                />
                {videoFile && <p>Selected Video: {videoFile.name}</p>}
                {errors.videoFile && (
                  <p className="text-red-500">{errors.videoFile}</p>
                )}
              </div>

              {/* Material Files Input */}
              <div className="mb-4">
                <label className="block text-lg font-medium">
                  Upload Materials
                </label>
                <input
                  type="file"
                  id="materialFilesInput"
                  multiple
                  onChange={handleMaterialsChange}
                  className="block w-full px-3 py-2 border rounded-md"
                  accept="application/pdf,image/*"
                />
                {materialFiles.length > 0 && (
                  <div>
                    <h4 className="font-medium">Selected Materials:</h4>
                    <ul className="list-disc pl-5">
                      {materialFiles.map((file, index) => (
                        <li key={index}>
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                          MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {errors.materialFiles && (
                  <p className="text-red-500">{errors.materialFiles}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  onClick={validateAndSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="mx-auto mt-4 mb-6 md:ml-6">
          <label className="block mb-2 font-semibold font-georama">
            Select Lecture Title
          </label>
          <select
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs overflow-visible"
            value={video}
            onChange={handleSemesterChange}
          >
            <option disabled>Select Lecture</option>
            {videos?.map((vid, index) => (
              <option key={index} value={vid.title}>
                {vid.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          {videos && videos.length > 0 ? (
            <video
              className="mx-auto"
              src={`${MINIO_BASE_URL}/${videoURL}`} // Use the extracted base URL
              controls
              width="700"
            ></video>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Attachments</h2>
          {attachments?.length > 0 ? (
            <ul>
              {attachments?.map((attachment, index) => (
                <li key={index}>
                  <a
                    href={`${MINIO_BASE_URL}/${attachment.file_path}`} // Use the extracted base URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {attachment.file_name}
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
  );
};

export default TrCourseMaterials;
