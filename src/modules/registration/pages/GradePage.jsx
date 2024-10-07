import NavBar from "../components/NavBar";
import SInfoCard from "../components/SInfoCard";
import GradeCard from "../components/GradeCard";
import HeadLineCard from "../components/HeadLineCard";
import { mainStyles, containerDivStyles } from "../styles/styles";

function GradePage() {
  const courses = [
    {
      code: "CSC209",
      name: "Data Structures",
      credits: 3,
      grade: "B+",
    },
    {
      code: "CSC210",
      name: "Algorithms",
      credits: 3,
      grade: "A",
    },
    {
      code: "CSC290",
      name: "Integrated Project",
      credits: 1,
      grade: "S",
    },
  ];

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard title="My Past Grade Results" link="/regis/transcript" />
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-6 shadow-md rounded-md">
          <div className="flex flex-col justify-start">
            <SInfoCard />
            <div className="ml-4 md:ml-6 mt-4 mb-4">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Academic year [x/xxxx]
                </option>
                <option>1/2567</option>
                <option>2/2567</option>
              </select>
            </div>
          </div>
          <div>
            <GradeCard
              gpa="3.50"
              gpax="3.6"
              semester="1/2567"
              courses={courses}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default GradePage;
