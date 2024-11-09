import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEnvelope,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import GradeCard from "../components/GradeCard";
import { useSemestersByStudentId } from "../services/queries";
import { ErrorSkeleton } from "../styles/Skeletons";
import SInfoCard from "../components/SInfoCard";

function ProfilePage() {
  const studentId = localStorage.getItem("studentId");
  const {
    data: semesters,
    isLoading,
    isError,
  } = useSemestersByStudentId(studentId);

  const [semester, setSemester] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    if (semesters && semesters.length > 0) {
      const firstSemester = semesters[0];
      setSemester(firstSemester.semester_name);
      setSemesterId(firstSemester.semester_id);
    }
  }, [semesters]);

  const handleSemesterChange = (event) => {
    const selectedSemester = semesters.find(
      (sem) => sem.semester_name === event.target.value
    );
    if (selectedSemester) {
      setSemester(selectedSemester.semester_name);
      setSemesterId(selectedSemester.semester_id);
    }
  };

  if (isError) return <ErrorSkeleton />;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-3xl font-bold">My Profile</h2>
            {/* Logo Section */}
            <div className="relative w-20 h-20 mx-auto mt-4">
              <img
                src="/logos/profile-pic.png"
                alt="Logo"
                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-gray-600"
                />
                <div>
                  <p className="text-sm text-gray-500">Education Level</p>
                  <p className="font-semibold">
                    Current student - Bachelor's Degree
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Personal email</p>
                  <p className="font-semibold">Thitapa.rns@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
                <p className="font-semibold">099-999-9999</p>
              </div>
            </div>

            <div className=" mt-6 bg-white p-4 rounded-lg shadow-md">
              <div className="flex space-x-2 items-center">
                <FontAwesomeIcon icon={faHome} className=" text-gray-600" />
                <h3 className="text-lg font-semibold">Current Address</h3>
              </div>

              <div className="mx-6 my-2">
                <p className="flex justify-between">
                  <span>Country</span>
                  <span>Thailand</span>
                </p>
                <p className="flex justify-between">
                  <span>Address</span>
                  <span>Somewhere</span>
                </p>
                <p className="flex justify-between">
                  <span>Subdistrict</span>
                  <span>Somewhere</span>
                </p>
                <p className="flex justify-between">
                  <span>District</span>
                  <span>Somewhere</span>
                </p>
                <p className="flex justify-between">
                  <span>Province</span>
                  <span>Somewhere</span>
                </p>
                <p className="flex justify-between">
                  <span>Postal Code</span>
                  <span>11001</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <SInfoCard />
            <GradeCard
              studentId={studentId}
              semester={semester}
              semesterId={semesterId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
