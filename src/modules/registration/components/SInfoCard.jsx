import { useStudentData } from "../services/query";

function SInfoCard() {
  const userId = "13816c4c-b1a6-4766-bfaa-8d692a65c1da";
  const { data: student, isLoading, isError } = useStudentData(userId);

  if (isLoading)
    return (
      <div className="ml-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <p className="text-gray-500 mt-4 text-sm h-10 text-center bg-gray-200 rounded w-full">
          Loading Student Data
        </p>
      </div>
    );
  if (isError) return <div>Error Loading Student Data.</div>;

  return (
    <>
      <div className="ml-6">
        <div>{student.firstname}</div>
        <p className="text-gray-500 mt-4 text-sm">{student?.studentId}</p>
        <h2 className="text-2xl font-geologica font-bold">
          {student?.firstName}
        </h2>
        <h2 className="text-2xl font-geologica font-bold">
          {student?.lastName}
        </h2>
        <p> {student?.facultyName}</p>
        <p> {student?.programName}</p>
      </div>
    </>
  );
}

export default SInfoCard;
