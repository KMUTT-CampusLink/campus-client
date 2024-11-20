import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateFaceAttendance } from "../services/api";
import { markAttendance } from "../services/api";
import * as faceapi from "face-api.js";

const useFace = () => {
  const [h1] = useState("STQR Page");
  const [isStreaming, setIsStreaming] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [loadingModels, setLoadingModels] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

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
    } else if (key == "Face Attendance") {
      navigate("/attendance/faceAttendance");
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
    // Clear the canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  const handleGenerateAttendance = async (sectionId) => {
    const result = await generateFaceAttendance(sectionId);
    console.log(result); // Log the entire result

    setAttendanceId(result.data.attendanceId);
    startVideo();
    console.log("attendance: " + result.data.attendanceId);
  };

  const loadModels = async () => {
    setLoadingModels(true);
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("http://localhost:5173/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        "http://localhost:5173/models"
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        "http://localhost:5173/models"
      ),
    ]);
    setLoadingModels(false);
  };

  const detectFaces = async () => {
    if (videoRef.current && isStreaming) {
      const videoElement = videoRef.current;
      const displaySize = {
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      };

      if (displaySize.width > 0 && displaySize.height > 0) {
        const detections = await faceapi
          .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        // Draw bounding boxes
        faceapi.draw.drawDetections(canvas, resizedDetections);
      }
    }
  };

  useEffect(() => {
    loadModels();
    return () => {
      stopVideo(); // Stop the video stream and clear the canvas during cleanup
    };
  }, []);

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(detectFaces, 200); // Detect faces every 200ms
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

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
          onClick={() => handleGenerateAttendance(1001)}
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
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="mt-4 absolute"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              const { videoWidth, videoHeight } = videoRef.current;
              const canvas = canvasRef.current;
              if (canvas) {
                canvas.width = videoWidth;
                canvas.height = videoHeight;
              }
            }
          }}
        />
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
