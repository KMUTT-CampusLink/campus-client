import { useEffect, useState } from "react";
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEnvelope,
  faPhone,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import GradeCard from "../components/GradeCard";
import {
  useSemestersByStudentId,
  useStudentProfileData,
} from "../services/queries";
import { ErrorSkeleton } from "../styles/Skeletons";
import SInfoCard from "../components/SInfoCard";
import LoadingPage from "../../dev/pages/LoadingPage";

function ProfilePage() {
  const studentId = localStorage.getItem("studentId");
  const { data: semesters, isError } = useSemestersByStudentId(studentId);
  const {
    data: profileData,
    isLoading,
    isProfileError,
  } = useStudentProfileData(studentId);

  const [semester, setSemester] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    if (semesters && semesters.length > 0) {
      const lastSemester = semesters[semesters.length - 1];
      setSemester(lastSemester.semester_name);
      setSemesterId(lastSemester.semester_id);
    }
  }, [semesters]);

  if (isLoading) return <LoadingPage />;
  if (isError || isProfileError) return <ErrorSkeleton />;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="col-span-2 p-4">
            <h2 className="text-3xl font-bold">My Profile</h2>
            {/* Logo Section */}
            <div className="relative w-20 h-20 mx-auto mt-4">
              <img
                src="/logos/profile-pic.png"
                alt="Logo"
                className="object-cover w-full h-full border-4 border-gray-200 rounded-full"
              />
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-gray-600"
                />
                <div>
                  <p className="text-sm text-gray-500">Education Level</p>
                  <p className="font-semibold">{profileData?.degree_level}</p>
                </div>
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Personal email</p>
                  <p className="font-semibold">{profileData?.personal_email}</p>
                </div>
              </div>
            </div>

            <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="flex items-center mt-4 space-x-2">
                <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
                <p className="font-semibold">{profileData?.phone}</p>
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
                <p className="font-semibold">{profileData?.personal_email}</p>
              </div>
            </div>
            <div className="p-4 mt-6 bg-white rounded-lg shadow-md ">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-600 " />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>

              <div className="mx-6 my-2">
                <p className="flex justify-between">
                  <span>Identification Number</span>
                  <span>{profileData?.identification_no || "N/A"}</span>
                </p>
                <p className="flex justify-between">
                  <span>Date of Birth</span>
                  <span>
                    {new Date(profileData?.date_of_birth).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 mt-6 bg-white rounded-lg shadow-md ">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faHome} className="text-gray-600 " />
                <h3 className="text-lg font-semibold">Current Address</h3>
              </div>

              <div className="mx-6 my-2">
                <p className="flex justify-between">
                  <span>Address</span>
                  <span>{profileData?.address}</span>
                </p>
                <p className="flex justify-between">
                  <span>Subdistrict</span>
                  <span>{profileData?.sub_district}</span>
                </p>
                <p className="flex justify-between">
                  <span>District</span>
                  <span>{profileData?.district}</span>
                </p>
                <p className="flex justify-between">
                  <span>Province</span>
                  <span>{profileData?.province}</span>
                </p>
                <p className="flex justify-between">
                  <span>Postal Code</span>
                  <span>{profileData?.postal_code}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-lg">
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
