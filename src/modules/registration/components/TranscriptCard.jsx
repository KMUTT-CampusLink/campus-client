import { useGPAXBySemesterId } from "../services/queries";
import { CardErrorSkeleton } from "../styles/Skeletons";

function TranscriptCard({ semester, courses, studentId, semesterId }) {
  const { data: semesterGrades, isError } = useGPAXBySemesterId(
    studentId,
    semesterId
  );

  if (isError) return <CardErrorSkeleton data="Transcript" />;

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <h2 className="mb-2 text-2xl font-bold font-geologica">
          Semester {semester}
        </h2>
        <h3 className="mb-2 ml-4 font-bold">
          GPA: {semesterGrades?.gpa || "N/A"}
        </h3>
      </div>

      <div className="overflow-x-auto bg-gray-200 rounded-lg">
        <table className="min-w-full text-left border">
          <thead className="bg-[#c3554e] text-white">
            <tr>
              <th className="p-2">Code</th>
              <th className="hidden p-2 sm:block">Course Name</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map(
              ({ course_code, course_name, grade_letter, credits }, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="p-2">{course_code}</td>
                  <td className="hidden p-2 sm:block">{course_name}</td>
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
