import { useStudentData } from "../services/queries";

function SInfoCard() {
  const userId = localStorage.getItem("userId");
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
        <p className="text-gray-500 mt-4 text-sm">{student?.studentid}</p>
        <h2 className="text-2xl font-geologica font-bold">
          {student?.firstname}
        </h2>
        <h2 className="text-2xl font-geologica font-bold">
          {student?.lastname}
        </h2>
        <p> {student?.facultyname}</p>
        <p> {student?.programname}</p>
      </div>
    </>
  );
}

export default SInfoCard;
