import { useStudentData } from "../services/queries";

const LoadingState = () => (
  <div className="ml-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <p className="text-gray-500 mt-4 text-sm h-10 text-center bg-gray-200 rounded w-full">
      Loading Student Data
    </p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="ml-6">
    <p>Error Loading Student Data.</p>
    <button
      onClick={onRetry}
      className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
    >
      Retry
    </button>
  </div>
);

function SInfoCard() {
  const userId = localStorage.getItem("userId");
  const { data: student, isLoading, isError, refetch } = useStudentData(userId);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="ml-6">
      <p className="text-gray-500 mt-4 text-sm">{student?.studentid}</p>
      <h1 className="text-2xl font-geologica font-bold">
        {student?.firstname} {student?.lastname}
      </h1>
      <p>{student?.facultyname}</p>
      <p>{student?.programname}</p>
    </div>
  );
}

export default SInfoCard;
