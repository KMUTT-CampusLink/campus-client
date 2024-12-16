import { useState, useRef, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { generateFaceAttendance } from "../services/api";
import { markAttendance } from "../services/api";
import * as faceapi from "face-api.js";

const useFace = () => {
  const [h1] = useState("STQR Page");
  const [isStreaming, setIsStreaming] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [loadingModels, setLoadingModels] = useState(true);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [detectedIds, setDetectedIds] = useState({});
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const {sectionId} = useParams();
  const COOLDOWN_PERIOD = 5000; // ms (5seconds)

  const refFaces = [
    { image: "/mockUpDataSet/832.jpg", label: "STU00020" },
    { image: "/mockUpDataSet/845.jpg", label: "STU00022" },
    { image: "/mockUpDataSet/850.jpg", label: "STU00088" },
    { image: "/mockUpDataSet/857.jpg", label: "STU00051" },
  ];

  const items = [
    { label: "Attendance", key: "Attendance" },
    { label: "QR CODE", key: "QR CODE" },
    { label: "Face Attendance", key: "Face Attendance" },
  ];

  const handleMenuClick = (key) => {
    if (key === "Attendance") {
      navigate(`/attendance/professor/${sectionId}`);
    } else if (key === "QR CODE") {
      navigate(`/attendance/professor/${sectionId}/profQr`);
    } else if(key == "Face Attendance"){
      navigate(`/attendance/professor/${sectionId}/faceAttendance`)
    }
    console.log("HI");
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

    for (const refFace of refFaces) {
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

      if (detections.length > 0) {
        detections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const studentId = bestMatch.label;

          if (studentId !== "unknown") {
            const now = Date.now();

            // Add Cooldown logic
            if (
              !detectedIds[studentId] ||
              now - detectedIds[studentId] > COOLDOWN_PERIOD
            ) {
              console.log(`Matched: ${studentId}`);

              // Send attendance to backend
              if (attendanceId) {
                markAttendance(attendanceId, studentId)
                  .then((response) => {
                    console.log(`Attendance marked for ${studentId}`);
                  })
                  .catch((error) => {
                    console.error(`Failed to mark attendance for ${studentId}`);
                  });
              }

              // Update cooldown timestamp
              setDetectedIds((prev) => ({ ...prev, [studentId]: now }));
            } else {
              console.log(`Cooldown active for: ${studentId}`);
            }
          }
        });
      }

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

  const detail = () => (
    <div className="flex flex-col p-4 space-y-2 md:space-y-4">
      <span className="text-xl md:text-2xl font-bold text-orange-500">
        About Classroom
      </span>
      <div className="text-base md:text-lg font-semibold">
        <div>CSC-230 Computer Architecture & Design</div>
        <div>Lecturer - Arjan xxxxxxxx</div>
        <div>Time - 1:30 to 4:30 PM (Thursday)</div>
      </div>
    </div>
  );
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
