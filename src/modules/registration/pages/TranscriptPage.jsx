import GPAXCard from "../components/GPAXCard";
import HeadLineCard from "../components/HeadLineCard";
import NavBar from "../components/NavBarComponents/NavBar";
import TranscriptCard from "../components/TranscriptCard";
import { mainStyles, containerDivStyles } from "../styles/styles";
import { useTranscriptByStudentId } from "../services/queries";
import { ErrorSkeleton } from "../styles/Skeletons";
import LoadingPage from "../../dev/pages/LoadingPage";

function TranscriptPage() {
  const studentId = localStorage.getItem("studentId");
  const {
    data: transcripts,
    isLoading,
    isError,
  } = useTranscriptByStudentId(studentId);
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorSkeleton />;

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="Transcript" link="/regis/course/detail" />
        <div className="divider"></div>
        <div className="p-6 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <GPAXCard studentId={studentId} />
            <div className="grid grid-cols-1 col-span-2 gap-4">
              {transcripts?.length === 0 ? (
                <div className="text-center text-gray-500">
                  No transcript data available.
                </div>
              ) : (
                transcripts?.map((semester, index) => (
                  <TranscriptCard
                    key={index}
                    semester={semester.semester_name}
                    courses={semester.courses}
                    studentId={studentId}
                    semesterId={semester.semester_id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TranscriptPage;
