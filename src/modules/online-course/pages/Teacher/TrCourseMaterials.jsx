import { useEffect, useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faVideo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import {
  useAllVideos,
  useCourseHeaderBySectionID,
} from "../../services/queries";

const TrCourseMaterials = () => {
  const sec_id = localStorage.getItem("sec_id");
  const { data: details } = useCourseHeaderBySectionID(sec_id);
  const { data: videos } = useAllVideos();
  console.log(details);
  console.log("Fetched videos:", videos);

  const [video, setVideo] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    if (videos && videos.length > 0) {
      const firstVideo = videos[0];
      setVideo(firstVideo.title);
      setVideoId(firstVideo.id);
      setVideoURL(firstVideo.video_url);
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
    }
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
      <div className="mx-auto mt-4 mb-6 md:ml-6">
        <label className="block mb-2 font-semibold font-georama">
          Select Lecture Title
        </label>
        <select
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full max-w-xs"
          value={video}
          onChange={handleSemesterChange}
        >
          <option disabled>Select Academic year [x/xxxx]</option>
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
            src={`${
              import.meta.env.VITE_MINIO_URL +
              import.meta.env.VITE_MINIO_BUCKET_NAME
            }/${videoURL}`} // Prepend the base URL
            controls
            width="700"
          ></video>
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default TrCourseMaterials;
