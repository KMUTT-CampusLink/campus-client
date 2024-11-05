import React from 'react'
import { useEffect,useState } from 'react';
import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, logoHead } from "../styles/styles";
import GradeCard from '../components/GradeCard';
import { useSemestersByStudentId } from "../services/queries";
import { ErrorSkeleton } from "../styles/Skeletons";
import SInfoCard from '../components/SInfoCard';


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
          <div className='grid grid-cols-1 md:grid-cols-3 bg-red-400'>
            <div className='col-span-2 bg-green-400'>My Profile</div>
            <div className='bg-blue-400 p-4'>
                <SInfoCard/>
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

export default ProfilePage