import React, { useState, useEffect } from "react";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useFace from "../hook/useFace";
import { getCourseHeader } from "../services/api";
import { useParams } from "react-router-dom";
import StAttendanceComponent from "../components/StrAttendanceComponent";
import StQrComponent from "../components/StQrComponent";

const StAttendancePage = () => {
  const [activeTab, setActiveTab] = useState("Attendance"); // Track the active tab
  const { sectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState({});
  const face = useFace();

  const renderContent = () => {
    switch (activeTab) {
      case "Attendance":
        return <StAttendanceComponent />;
      case "Scanner":
        return <StQrComponent />;
      default:
        return null;
    }
  };
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseHeader(sectionId);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError("Failed to fetch course details");
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

  if (!course || !course.course || !course.professor) {
    return <div>No course data available</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#C2544D] to-[#F09107]">
        <NavBar />
        <div className="mt-16 flex-1 bg-white relative">
          <div className="w-full flex justify-center mt-4 px-4 sm:px-48">
            <div className="flex gap-4 sm:gap-10 flex-wrap justify-center">
              <button
                className={`text-lg font-semibold tab-button ${activeTab === "Attendance"
                    ? "active border-b-2 border-black"
                    : ""
                  }`}
                onClick={() => setActiveTab("Attendance")}
              >
                Attendance
              </button>
              <button
                className={`text-lg font-semibold tab-button ${activeTab === "Scanner"
                    ? "active border-b-2 border-black"
                    : ""
                  }`}
                onClick={() => setActiveTab("Scanner")}
              >
                Scanner
              </button>
            </div>
          </div>

          <hr className="border-b-1 border-black w-full" />

          <div className="flex flex-col p-4 sm:p-8 lg:p-12">
            <span className="text-2xl font-bold text-[#F69800]">
              About Classroom
            </span>
            <div className="text-lg font-semibold">
              <div>
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
                  Time - {formatTime(course.start_time)} to{" "}
                  {formatTime(course.end_time)} ({course.day})
                </div>
              </div>
            </div>
          </div>
          <div className="content">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default StAttendancePage;
