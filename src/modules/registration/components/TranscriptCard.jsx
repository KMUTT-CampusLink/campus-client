import { useGPAXBySemesterId } from "../services/queries";

function LoadingSpinner() {
  return <div className="spinner">Loading...</div>;
}

function ErrorState({ onRetry }) {
  return (
    <div>
      <p>Error Loading Transcript Data.</p>
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white py-1 px-3 rounded"
      >
        Retry
      </button>
    </div>
  );
}

function TranscriptCard({ semester, courses, studentId, semesterId }) {
  const {
    data: semesterGrades,
    isLoading,
    isError,
    refetch, // Refetch function to be used on retry
  } = useGPAXBySemesterId(studentId, semesterId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <h2 className="font-bold text-2xl font-geologica mb-2">
          Semester {semester}
        </h2>
        <h3 className="font-bold mb-2 ml-4">GPA: {semesterGrades?.gpa}</h3>
      </div>

      <div className="bg-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead className="bg-[#c3554e] text-white">
            <tr>
              <th className="p-2">Code</th>
              <th className="p-2 hidden sm:block">Course Name</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(
              ({ course_code, course_name, grade_letter, credits }, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="p-2">{course_code}</td>
                  <td className="p-2 hidden sm:block">{course_name}</td>
                  <td className="p-2">{grade_letter}</td>
                  <td className="p-2">{credits}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranscriptCard;
