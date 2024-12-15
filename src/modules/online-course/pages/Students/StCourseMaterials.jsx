import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCourseHeaderBySectionIDForStudent } from "../../services/queries";
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

const MINIO_BASE_URL = `${import.meta.env.VITE_MINIO_URL}${
  import.meta.env.VITE_MINIO_BUCKET_NAME
}`;

const StCourseMaterials = () => {
  const sec_id = localStorage.getItem("sec_id") || 1001;

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
      <div className="w-full px-28">
        <div className="my-2 md:pl-4 flex items-center space-x-4 mb-4">
          <h2 className="font-bold text-[#ecb45e] text-2xl">Materials</h2>
        </div>
      </div>

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
          )}
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
              <p>No files available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StCourseMaterials;
