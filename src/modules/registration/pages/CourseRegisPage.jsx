import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";
import CourseTable from "../components/CourseTable";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import {
  useActiveCoursesByStudentId,
  usePaymentStatus,
  useGetEnrollmentHead,
} from "../services/queries";
import { ErrorSkeleton, LoadingSkeleton } from "../styles/Skeletons";

function CourseRegisPage() {
  const studentId = localStorage.getItem("studentId");
  const currentSemesterId = 1016;

  const [headId, setHeadId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const regis = "registration";
  const {
    data: enrollmentHeadData,
    error: enrollmentError,
    isLoading: isEnrollmentLoading,
  } = useGetEnrollmentHead({
    studentId,
    currentSemesterId,
  });

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useActiveCoursesByStudentId(studentId);

  const {
    data: payment,
    isLoading: isPaymentLoading,
    isError: isPaymentError,
  } = usePaymentStatus(headId);

  useEffect(() => {
    if (enrollmentHeadData) {
      console.log(enrollmentHeadData);
      setHeadId(enrollmentHeadData.head_id);
    }
  }, [enrollmentHeadData]);

  useEffect(() => {
    if (payment) {
      setPaymentStatus(payment.data);
    }
  }, [payment]);

  const [studentData, setStudentData] = useState(null);

  // Function to handle the student data coming from SInfoCard
  const handleStudentData = (data) => {
    setStudentData(data);
  };

  const totalCredits = Array.isArray(courses)
    ? courses.reduce((acc, course) => acc + course.credits, 0)
    : 0;

  const totalCourses = courses?.length || 0;

  // Use studentData to get programPrice instead of localStorage
  const grandTotal = studentData?.programprice || "N/A";

  if (isEnrollmentLoading || isCoursesLoading || isPaymentLoading) {
    return <LoadingSkeleton />;
  }

  if (enrollmentError || isCoursesError || isPaymentError) {
    return <ErrorSkeleton />;
  }

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="My Courses" link="/regis/course/detail" />
        <div className="divider"></div>

        <div className="bg-white p-6 shadow-md rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              {/* Pass handleStudentData to SInfoCard */}
              <SInfoCard onStudentData={handleStudentData} />
              <div className="ml-6 mt-4">
                <div className="mt-6">
                  <div>
                    Total Credits:{" "}
                    <span className="font-bold">{totalCredits}</span>
                  </div>
                  <div>
                    Total Courses:{" "}
                    <span className="font-bold">{totalCourses}</span>
                  </div>
                  <div>
                    Grand Total:{" "}
                    <span className="font-bold text-red-600">
                      {grandTotal} bahts
                    </span>
                  </div>
                  <div>
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        paymentStatus === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {paymentStatus === "paid" ? "Successful" : "Unpaid"}
                    </span>
                  </div>
                </div>
                {(regis === "registration" || regis === "late") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-10">
                    <Link to="add">
                      <button className={`${button} h-full`}>Add Course</button>
                    </Link>
                    <Link to="drop">
                      <button className={`${button} h-full`}>
                        Drop Course
                      </button>
                    </Link>
                    <Link to="/payment" className="sm:col-span-2">
                      <button className={`${button}`}>Payment</button>
                    </Link>
                  </div>
                )}
                {regis === "no" && (
                  <>
                    <div className="bg-red-500 text-white text-center font-bold p-4 rounded-md mt-10">
                      Not In Time
                    </div>
                    <p className="text-sm text-gray-500 text-center my-4">
                      Please check the registration time again.
                    </p>
                  </>
                )}
                {regis === "withdraw" && (
                  <Link to="drop">
                    <button className={`${button} my-10`}>
                      Withdraw Course
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div className="col-span-2 gap-4">
              <div className="bg-[#c3554e] text-center text-white rounded-md py-2 mb-4">
                <h3 className="font-bold text-lg font-geologica">
                  Course Table
                </h3>
              </div>
              <CourseTable courses={Array.isArray(courses) ? courses : []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseRegisPage;
