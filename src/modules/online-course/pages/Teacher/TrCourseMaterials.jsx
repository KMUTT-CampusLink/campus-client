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

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${
  import.meta.env.VITE_MINIO_BUCKET_NAME
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
    <div className="max-md:text-xs w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page="materials" />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

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

      {isEditing && (
        <div className="bg-white min-h-screen rounded-lg sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-14">
            <div className="md:pl-20 pl-10 pr-10">
              <div className="mb-4">
                <label className="block text-lg font-medium">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter Video Title"
                  className="block w-full px-3 py-2 border rounded-md"
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium">
                  Upload Video
                </label>
                <input
                  type="file"
                  id="videoFileInput"
                  name="videoFile"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded-md"
                  accept="video/mp4, video/ogg, video/webm, video/x-msvideo"
                />
                {formData.videoFile && (
                  <p>Selected Video: {formData.videoFile.name}</p>
                )}
                {errors.videoFile && (
                  <p className="text-red-500">{errors.videoFile}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium">
                  Upload Materials
                </label>
                <input
                  type="file"
                  id="materialFilesInput"
                  name="materialFiles"
                  multiple
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded-md"
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

              <div className="mt-4">
                <button
                  onClick={handleSubmit}
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

        <div>
          {videoDetails.videoURL && (
            <div className="w-full mb-4 flex justify-center">
              <video
                controls
                className="max-w-full max-h-[400px] object-cover rounded-lg"
                src={`${MINIO_BASE_URL}/${videoDetails.videoURL}`}
              ></video>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-4">Files</h4>
            {videoDetails.attachments?.length > 0 ? (
              <ul className="list-disc pl-5">
                {videoDetails.attachments.map((file, index) => (
                  <li key={index}>
                    <a href={`${MINIO_BASE_URL}/${file.file_path}`} download>
                      {file.file_name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrCourseMaterials;
