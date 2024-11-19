import { useState } from "react";
import NavForIndvCourse from "../../components/NavForIndvCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faVideo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CourseHeader from "../../components/CourseHeader";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionID } from "../../services/queries";

// import { useUploadFilesMutation } from "../../services/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useIds } from "../../services/queries";
import { useForm } from "react-hook-form";
// import { helix } from "ldrs";
import { z } from "zod";
// helix.register();

const schema = z.object({
  title: z.string().min(10, "Title too short").max(25, "Title too long"),
  // .regex(/^[a-zA-Z0-9]+$/, "Only letters and underscores"),
  // poster: z
  //   .any()
  //   .refine((file) => file?.length !== 0, "File is required")
  //   .refine((file) => file[0]?.size < 10_485_760, "Poster file at most 5MB")
  //   .refine((file) => {
  //     const fileType = file[0]?.type.split("/").pop();
  //     const allowedExtension = /^(jpe?g|png|gif|webp|avif)$/;
  //     return allowedExtension.test(fileType);
  //   }, "Invalid file type"),
  video: z
    .any()
    .refine((file) => file?.length !== 0, "File is required")
    .refine((file) => file[0]?.size < 1_073_741_824, "Video file at most 1GB")
    .refine((file) => {
      const fileType = file[0]?.type.split("/").pop();
      const allowedExtension = /^(mp4|ogg|webm)$/;
      return allowedExtension.test(fileType);
    }, "Invalid file type"),
});

const TrCourseMaterials = () => {
  const sec_id = localStorage.getItem("sec_id");

  const { data: details } = useCourseHeaderBySectionID(sec_id);
  console.log(details);
  const [vdUrl, setVdUrl] = useState(null);
  const [pstrUrl, setPstrUrl] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange", resolver: zodResolver(schema) });
  // const queryClient = useQueryClient();
  // const { data, error, isLoading } = useIds();
  // const { mutate, isPending } = useUploadFilesMutation(queryClient, reset);

  const onUpload = handleSubmit(async (data) => {
    const form_data = new FormData();
    form_data.append("title", data.title);
    // form_data.append("files", data.poster[0]);
    // form_data.append("files", data.video[0]);
    // mutate(form_data);
    console.log(form_data);
    console.log(data);
    // 1. Single file upload
    // form_data.append('file', data.single_file[0]);
    // file_uploader.single('file');

    // 2. Same type multiple files
    // form_data.append("images", data.img_1[0]);
    // form_data.append("images", data.img_2[0]);
    // form_data.append("images", data.img_3[0]);
    // file_uploader.array("images", 3);

    // 3. Multiple type and multiple files
    // form_data.append("images", data.img_1[0]);
    // form_data.append("images", data.img_2[0]);
    // form_data.append("images", data.img_3[0]);

    // form_data.append("videos", data.vd_1[0]);
    // form_data.append("videos", data.vd_2[0]);
    // form_data.append("videos", data.vd_3[0]);
    // file_uploader.fields([{name: "images", maxCount: 3}, {name: "videos", maxCount: 3}])
  });

  // if (isLoading) return <div>Fetching...</div>;
  const [materials, setMaterials] = useState([
    {
      title: "Lecture 1 - Introduction",
      date: "12/4/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)", "(2 hr 10 minutes)"], // Multiple recordings
    },
    {
      title: "Lecture 2 - Data Representation",
      date: "12/5/2024",
      attachments: ["name"],
      quantity: 1,
      videos: ["(3 hr 4 minutes)"],
    },
  ]);

  return (
    <div className="max-md:text-xs w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"materials"} />
      <CourseHeader
        c_code={details?.course_code}
        c_name={details?.course_name}
        c_lecturer={details?.lecturer}
        c_time={details?.time}
      />

      <div className="py-8 w-full">
        <div className="max-md:w-full max-md:px-4 w-3/4 mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-[#ecb45e]">MATERIALS</div>
        </div>
        <div>
          <span>Video: </span>
          <input
            type="file"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 font-georama">
        <h1 className="text-4xl font-semibold">Video Streaming</h1>
        <div className="flex items-center justify-center w-full h-full border-[1.5px] border-red-400 p-4 gap-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            method="post"
            encType="multipart/formdata"
            className="flex flex-col items-start justify-center gap-4 font-geologica"
          >
            {/* Video Title */}
            <label className="input input-bordered flex items-center gap-2 w-full">
              Title
              <input
                // {...register("title")}
                type="text"
                className="grow"
                placeholder="Video Title"
              />
            </label>
            {/* {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )} */}

            {/* Video */}
            <div className="flex flex-row items-center justify-center gap-1 w-full">
              <span>Video:</span>
              <input
                // {...register("video")}
                type="file"
                className="file-input file-input-bordered file-input-sm file-input-accent w-full max-w-xs"
              />
            </div>
            {/* {errors.video && (
              <span className="text-red-500 text-sm">
                {errors.video.message}
              </span>
            )} */}
            <button
              onClick={onUpload}
              className="btn btn-primary text-white w-full"
            >
              Upload
            </button>
            {/* <button
              onClick={onUpload}
              className="btn btn-primary text-white w-full"
            >
              {isSubmitting || isPending ? (
                <l-helix size="25" speed="1" color="white" />
              ) : (
                "Upload"
              )}
            </button> */}
            {/* <button className="btn btn-primary text-white w-full">Upload</button> */}
          </form>

          {/* Streaming */}
          <div className="flex flex-col items-start justify-center gap-4">
            {/* Streaming Panel */}
            <video src={vdUrl} controls width="700"></video>

            <div className="flex items-center justify-center gap-4">
              {/* Poster Preview */}
              {/* <div className="w-full flex-1">
                <img
                  className="w-[15rem] h-[15rem] object-cover"
                  src={pstrUrl || "/profile-pic.png"}
                  alt=""
                />
              </div> */}

              {/* Video List */}
              {/* https://<endpoint>:<port>/bucketname/objName */}
              {/* <ul className="menu bg-base-200 rounded-box w-56 font-semibold">
                <li className="menu-title">Choose a video</li>
                {data?.data.map((url, key) => (
                  <li
                    onClick={() => {
                      setPstrUrl(`${import.meta.env.VITE_MINIO_URL}/${url[1]}`);
                      setVdUrl(`${import.meta.env.VITE_MINIO_URL}/${url[2]}`);
                    }}
                    key={url[0]}
                  >
                    <a>Video {key + 1}</a>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrCourseMaterials;
