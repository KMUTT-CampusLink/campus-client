import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  generateFaceAttendance,
  getCourseHeader,
  getFaceData,
} from "../services/api";
import { markAttendance } from "../services/api";
import * as faceapi from "face-api.js";

const useFace = () => {
  const [h1] = useState("STQR Page");
  const [isStreaming, setIsStreaming] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [loadingModels, setLoadingModels] = useState(true);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [detectedIds, setDetectedIds] = useState({});
  const [studentData, setStudentData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [refFaces, setRefFaces] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const COOLDOWN_PERIOD = 5000; // ms (5seconds)
  useEffect(() => {
    const fetchFaceData = async () => {
      try {
        const response = await getFaceData(sectionId);
        const data = response.data.data;
        console.log("Fetched Data:", data);

        const updatedRefFaces = data.map((student) => ({
          image: `${import.meta.env.VITE_MINIO_URL}${
            import.meta.env.VITE_MINIO_BUCKET_NAME
          }/${student.student.image}`,
          label: student.student.id,
          name: `${student.student.firstname} ${student.student.lastname}`,
        }));

        // console.log("Updated RefFaces:", updatedRefFaces);
        setRefFaces(updatedRefFaces);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchFaceData();
  }, [sectionId]);

  console.log(refFaces);

  const items = [
    { label: "Attendance", key: "Attendance" },
    { label: "QR CODE", key: "QR CODE" },
    { label: "Face Attendance", key: "Face Attendance" },
  ];

  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate("/attendance");
    } else if (key === "QR CODE") {
      navigate("/attendance/qr");
    } else if (key === "Face Attendance") {
      navigate("/attendance/faceAttendance");
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleGenerateAttendance = async (sectionId) => {
    const result = await generateFaceAttendance(sectionId);
    setAttendanceId(result.data.attendanceId);
    startVideo();
  };

  const loadModels = async () => {
    setLoadingModels(true);
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]);
    setLoadingModels(false);
  };

  const generateLabeledDescriptors = async () => {
    const labeledDescriptors = [];
    if (!refFaces || refFaces.length === 0) {
      console.error("No reference faces to generate labeled descriptors.");
      return;
    }
    for (const refFace of refFaces) {
      try {
        const img = await faceapi.fetchImage(refFace.image);
        const fullFaceDescription = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (fullFaceDescription) {
          labeledDescriptors.push(
            new faceapi.LabeledFaceDescriptors(refFace.label, [
              fullFaceDescription.descriptor,
            ])
          );
        }
      } catch (error) {
        console.error(`Error processing image for ${refFace.label}:`, error);
      }
    }

    setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors));
  };

  const detectAndMatchFaces = async () => {
    if (videoRef.current && isStreaming && faceMatcher) {
      const videoElement = videoRef.current;
      const displaySize = {
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      };

      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear the canvas
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop through each detection and handle it
      resizedDetections.forEach((detection) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        const studentId =
          bestMatch.distance <= 0.45 ? bestMatch.label : "unknown";
        const studentData = refFaces.find(
          (refFace) => refFace.label === studentId
        );
        const studentName = studentData ? studentData.name : "Unknown";

        // Draw the bounding box and text for each face detection
        const box = detection.detection.box;
        ctx.strokeStyle = bestMatch.distance <= 0.45 ? "green" : "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        const text =
          bestMatch.distance <= 0.45
            ? `${studentName} (${studentId})`
            : "Unknown";
        ctx.fillStyle = bestMatch.distance <= 0.45 ? "green" : "red";
        ctx.font = "16px Arial";

        const textX = box.x;
        const textY = box.y + box.height + 20;
        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle =
          bestMatch.distance <= 0.45
            ? "rgba(0, 128, 0, 0.7)"
            : "rgba(255, 0, 0, 0.7)";
        ctx.fillRect(box.x, box.y + box.height + 5, textWidth + 10, 30);
        ctx.fillStyle = "white";
        ctx.fillText(text, textX, textY);

        // Handle attendance marking if the face is recognized
        if (bestMatch.distance <= 0.45 && studentId !== "unknown") {
          const now = Date.now();
          if (
            !detectedIds[studentId] ||
            now - detectedIds[studentId] > COOLDOWN_PERIOD
          ) {
            markAttendance(attendanceId, studentId)
              .then(() => {
                console.log(
                  `Attendance marked for ${studentName} (${studentId})`
                );
              })
              .catch(() => {
                console.error(
                  `Failed to mark attendance for ${studentName} (${studentId})`
                );
              });
            setDetectedIds((prev) => ({ ...prev, [studentId]: now }));
          } else {
            console.log(`Cooldown active for: ${studentId}`);
          }
        }
      });

      faceapi.draw.drawDetections(canvas, resizedDetections);
    }
  };

  useEffect(() => {
    loadModels().then(() => generateLabeledDescriptors());
    return () => {
      stopVideo();
    };
  }, []);

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(detectAndMatchFaces, 200);
      return () => clearInterval(interval);
    }
  }, [isStreaming, faceMatcher, detectedIds]);

  const detail = () => {
    const [course, setCourse] = useState(null); // State to hold course data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await getCourseHeader(sectionId);
          if (response.data.success) {
            setCourse(response.data.data);
          } else {
            setError("Failed to fetch students");
          }
        } catch (err) {
          setError(err.response?.data?.message || "An error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchCourse();
    }, [sectionId]);

    if (loading) {
      return <div>Loading course details...</div>;
    }

    if (error) {
      return <div>Error loading course details: {error}</div>;
    }

    // Check if course data exists
    if (!course || !course.course || !course.professor) {
      return <div>No course data available</div>;
    }

    return (
      <div className="flex flex-col p-4 space-y-2 md:space-y-4">
        <span className="text-xl md:text-2xl font-bold text-orange-500">
          About Classroom
        </span>
        <div className="text-base md:text-lg font-semibold">
          <div>
            {course.course.code} {course.course.name}
          </div>
          {course.professor.map((prof, index) => (
            <div key={index}>
              Lecturer -{" "}
              {`${prof.employee.firstname} ${prof.employee.lastname}`}
            </div>
          ))}
          <div>
            Time - {moment(course.start_time).format("h:mm A")} to{" "}
            {moment(course.end_time).format("h:mm A")} ({course.day})
          </div>
        </div>
      </div>
    );
  };
  const faceButton = () => (
    <div className="flex flex-col items-center">
      {!isStreaming && !loadingModels && (
        <button
          className="flex items-center justify-center text-white bg-[#F69800] font-open-sans font-normal text-lg h-[5vh] rounded-lg w-full md:w-1/3 lg:w-1/4"
          onClick={() => handleGenerateAttendance(sectionId)}
        >
          Start Attendance
        </button>
      )}
      {isStreaming && (
        <button
          className="flex items-center justify-center text-white bg-red-500 font-open-sans font-normal text-lg h-[5vh] rounded-lg w-full md:w-1/3 lg:w-1/4 mt-2"
          onClick={stopVideo}
        >
          Stop Attendance
        </button>
      )}
      <div className="w-[640px] h-[480px] relative">
        {loadingModels && <p>Loading models...</p>}
        <video ref={videoRef} autoPlay playsInline className="mt-4 absolute" />
        <canvas ref={canvasRef} className="absolute top-4"></canvas>
      </div>
    </div>
  );

  return {
    h1,
    items,
    handleMenuClick,
    detail,
    faceButton,
  };
};

export default useFace;
