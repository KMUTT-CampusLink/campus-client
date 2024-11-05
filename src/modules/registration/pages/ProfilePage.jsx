import React from 'react'
import { useEffect,useState } from 'react';
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, logoHead } from "../styles/styles";
import GradeCard from '../components/GradeCard';
import { useSemestersByStudentId } from "../services/queries";
import { ErrorSkeleton } from "../styles/Skeletons";


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
          <div>
            <GradeCard
              studentId={studentId}
              semester={semester}
              semesterId={semesterId}
            />
          </div>
          </main>
        </div>
      );
}

export default ProfilePage