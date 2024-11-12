import { useEffect } from "react";
import { useStudentData } from "../services/queries";
import { CardErrorSkeleton, SInfoLoadingSkeleton } from "../styles/Skeletons";

function SInfoCard({ onStudentData }) {
  const studentId = localStorage.getItem("studentId");
  const { data: student, isLoading, isError } = useStudentData(studentId);

  if (isLoading) return <SInfoLoadingSkeleton />;
  if (isError) return <CardErrorSkeleton data="student" />;

  return (
    <div className="ml-6 mb-6">
      <p className="text-gray-500 mt-4 text-sm">{student?.studentid}</p>
      <h1 className="text-2xl font-geologica font-bold">
        <p>{student?.firstname}</p>
        <p>{student?.lastname}</p>
      </h1>
      <p>{student?.facultyname}</p>
      <p>{student?.programname}</p>
    </div>
  );
}

export default SInfoCard;
