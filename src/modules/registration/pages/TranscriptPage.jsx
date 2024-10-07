import GPAXCard from "../components/GPAXCard";
import HeadLineCard from "../components/HeadLineCard";
import NavBar from "../components/NavBar";
import TranscriptCard from "../components/TranscriptCard";
import { mainStyles, containerDivStyles } from "../styles/styles";

function TranscriptPage() {
  const semesters = [
    { semester: "Semester 1", gpa: 3.0 },
    { semester: "Semester 2", gpa: 3.0 },
    { semester: "Semester 3", gpa: 3.0 },
    { semester: "Semester 4", gpa: 3.0 },
  ];

  const subjects = [
    { name: "Subject", grade: "A", credit: 2 },
    { name: "Subject", grade: "B+", credit: 3 },
    { name: "Subject", grade: "F", credit: 3 },
    { name: "Subject", grade: "A", credit: 2 },
    { name: "Subject", grade: "C", credit: 1 },
    { name: "Subject", grade: "A", credit: 1 },
    { name: "Subject", grade: "B+", credit: 3 },
  ];

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={mainStyles}>
          <HeadLineCard title="Transcript" link="/regis/course/detail" />
          <div className="divider"></div>
          <div className="bg-white p-6 shadow-md rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GPAXCard />
              <div className="col-span-2 grid grid-cols-1 gap-4">
                {semesters.map((semester, index) => (
                  <TranscriptCard
                    key={index}
                    semester={semester.semester}
                    gpa={semester.gpa}
                    subjects={subjects}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default TranscriptPage;
