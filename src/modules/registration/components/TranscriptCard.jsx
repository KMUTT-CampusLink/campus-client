import { useGPAXBySemesterId } from "../services/queries";

function TranscriptCard({ semester, courses, studentId, semesterId }) {
  const {
    data: semesterGrades,
    isLoading: isLoading,
    isError: isError,
  } = useGPAXBySemesterId(studentId, semesterId);

  if (isLoading) return <div>Loading Transcript Data...</div>;
  if (isError) return <div>Error Loading Transcript Data.</div>;

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <h2 className="font-bold text-2xl font-geologica mb-2">
          Semester {semester}
        </h2>
        <h2 className="font-bold mb-2 ml-4">GPA {semesterGrades.gpa}</h2>
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
            {courses.map((course, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="p-2">{course.course_code}</td>
                <td className="p-2 hidden sm:block">{course.course_name}</td>
                <td className="p-2">{course.grade_letter}</td>
                <td className="p-2">{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranscriptCard;
