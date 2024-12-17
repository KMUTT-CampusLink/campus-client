import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faCheck,
    faTrash,
    faUpload,
    faX,
    faCloudUploadAlt,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import {
    useAllVideos,
    useCourseHeaderBySectionID,
} from "../../services/queries";
import {
    useEditCourseMaterial,
    useDeleteCourseMaterial,
} from "../../services/mutations";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { z } from "zod";
import popToast from "../../../../utils/popToast";

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${import.meta.env.VITE_MINIO_BUCKET_NAME
    }`;

const TrCourseMaterials = () => {
    const sec_id = localStorage.getItem("sec_id") || 1001;

    // Zod schema for form validation
    const schema = z.object({
        title: z.string().min(1, { message: "Video Title is required" }),
        videoFile: z
            .instanceof(File)
            .refine((file) => file?.size !== 0, "Video file is required")
            .refine((file) => file?.size < 50 * 1024 * 1024, "Video must be <= 50MB")
            .refine(
                (file) =>
                    ["video/mp4", "video/ogg", "video/webm", "video/x-msvideo"].includes(
                        file.type
                    ),
                "Invalid video type. Allowed: MP4, OGG, WebM, AVI"
            ),
        materialFiles: z
            .array(
                z
                    .instanceof(File)
                    .refine((file) => file?.size !== 0, "File is required")
                    .refine((file) => file?.size < 20 * 1024 * 1024, "File must be <= 20MB")
            )
            .optional(),
    });

    // State Management
    const [formData, setFormData] = useState({
        title: "",
        videoFile: null,
        materialFiles: [],
    });
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [videoDetails, setVideoDetails] = useState({
        video: "",
        videoId: "",
        videoURL: "",
        attachments: [],
    });

    const { data: details } = useCourseHeaderBySectionID(sec_id);
    const { data: videos } = useAllVideos(sec_id);
    const { mutate: editMaterial } = useEditCourseMaterial();
    const { mutate: deleteMaterial } = useDeleteCourseMaterial();

    useEffect(() => {
        if (videos?.length > 0) {
            const firstVideo = videos[0];
            setVideoDetails({
                video: firstVideo.title,
                videoId: firstVideo.id,
                videoURL: firstVideo.video_url,
                attachments: firstVideo.course_attachment,
            });
        }
    }, [videos]);

    // Input Change Handler
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files
                ? name === "videoFile"
                    ? files[0]
                    : Array.from(files)
                : value,
        }));

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Submit Handler (Add/Update)
    const handleSubmit = async () => {
        try {
            schema.parse(formData);
            const submitData = new FormData();
            submitData.append("title", formData.title);
            submitData.append("sec_id", sec_id);

            if (formData.videoFile) submitData.append("videoFile", formData.videoFile);
            formData.materialFiles.forEach((file) =>
                submitData.append("materialFiles", file)
            );

            if (selectedVideoId) {
                editMaterial({ id: selectedVideoId, formData });
            } else {
                await axiosInstance.post("/courses/addVideoMaterials", submitData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                popToast("Files uploaded successfully!", "success");
            }

            setFormData({ title: "", videoFile: null, materialFiles: [] });
            setIsEditing(false);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formErrors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {});
                setErrors(formErrors);
            } else {
                console.error(error);
                popToast("Error uploading files.", "error");
            }
        }
    };

    // Handle Video Selection
    const handleVideoSelectChange = (e) => {
        const selectedVideo = videos.find((vid) => vid.title === e.target.value);
        if (selectedVideo) {
            setVideoDetails({
                video: selectedVideo.title,
                videoId: selectedVideo.id,
                videoURL: selectedVideo.video_url,
                attachments: selectedVideo.course_attachment,
            });
            setSelectedVideoId(selectedVideo.id);
        }
    };

    // Delete Handler
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this material?")) {
            deleteMaterial(videoDetails.videoId);
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

            <div className="w-3/4 mx-auto p-4 bg-white shadow-lg rounded-md">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[#ecb45e]">Materials</h2>
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="bg-[#ecb45e] text-white px-4 py-2 rounded-md"
                    >
                        <FontAwesomeIcon icon={isEditing ? faX : faUpload} className="mr-2" />
                        {isEditing ? "Cancel" : "Upload New"}
                    </button>
                </div>

                {isEditing && (
                    <div>
                        <label>Video Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="border rounded-md w-full p-2"
                            placeholder="Enter video title"
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>}

                        <label>Upload Video</label>
                        <input
                            type="file"
                            name="videoFile"
                            onChange={handleInputChange}
                            accept="video/*"
                            className="border rounded-md w-full p-2"
                        />

                        <label>Upload Materials</label>
                        <input
                            type="file"
                            name="materialFiles"
                            multiple
                            onChange={handleInputChange}
                            accept="application/pdf, image/*"
                            className="border rounded-md w-full p-2"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Submit
                        </button>
                    </div>
                )}

                <select
                    className="border p-2 rounded-md w-full my-4"
                    onChange={handleVideoSelectChange}
                    value={videoDetails.video}
                >
                    <option>Select Lecture</option>
                    {videos?.map((vid) => (
                        <option key={vid.id} value={vid.title}>
                            {vid.title}
                        </option>
                    ))}
                </select>

                {videoDetails.videoURL && (
                    <div>
                        <video
                            controls
                            src={`${MINIO_BASE_URL}/${videoDetails.videoURL}`}
                            className="w-full max-h-[400px] rounded-md"
                        ></video>
                        <ul>
                            {videoDetails.attachments?.map((file) => (
                                <li key={file.id}>
                                    <a href={`${MINIO_BASE_URL}/${file.file_path}`} download>
                                        {file.file_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Delete Material
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrCourseMaterials;
