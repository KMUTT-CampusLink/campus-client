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
import { ErrorSkeleton } from "../styles/Skeletons";
import LoadingPage from "../../dev/pages/LoadingPage";

function CourseRegisPage() {
  const studentId = localStorage.getItem("studentId");
  const currentSemesterId = localStorage.getItem("semesterId");

  const [headId, setHeadId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const regis = localStorage.getItem("event");
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
    if (enrollmentHeadData) setHeadId(enrollmentHeadData.head_id);
    if (payment) setPaymentStatus(payment.status);
  }, [enrollmentHeadData, payment]);

  const [studentData, setStudentData] = useState(null);

  // Function to handle the student data coming from SInfoCard
  const handleStudentData = (data) => {
    setStudentData(data);
  };

  const totalCredits = Array.isArray(courses)
    ? courses.reduce((acc, course) => acc + course.credits, 0)
    : 0;

  const totalCourses = courses?.length || 0;
  const grandTotal = studentData?.programprice || "N/A";

  if (isEnrollmentLoading || isCoursesLoading || isPaymentLoading) {
    return <LoadingPage />;
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

        <div className="p-6 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              {/* Pass handleStudentData to SInfoCard */}
              <SInfoCard onStudentData={handleStudentData} />
              <div className="mt-4 ml-6">
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
                        paymentStatus === "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {paymentStatus === "Paid" ? "Successful" : "Unpaid"}
                    </span>
                  </div>
                </div>
                {(regis === "Registration" ||
                  regis === "Late Registration") && (
                  <div className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2">
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
                    <div className="p-4 mt-10 font-bold text-center text-white bg-red-500 rounded-md">
                      Not In Time
                    </div>
                    <p className="my-4 text-sm text-center text-gray-500">
                      Please check the registration time again.
                    </p>
                  </>
                )}
                {regis === "Withdraw" && (
                  <Link to="withdraw">
                    <button className={`${button} my-10`}>
                      Withdraw Course
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div className="col-span-2 gap-4">
              <div className="bg-[#c3554e] text-center text-white rounded-md py-2 mb-4">
                <h3 className="text-lg font-bold font-geologica">
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
