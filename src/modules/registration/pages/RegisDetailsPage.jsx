import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles } from "../styles/styles";

const sections = [
  {
    title: "Add Courses",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
  {
    title: "Drop Courses",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
  {
    title: "Grade Calculation",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
  {
    title: "Transcript",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
  {
    title: "Core Courses",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
  {
    title: "Elective Courses",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur optio quidem ullam distinctio delectus ut id aliquam, earum fugit reprehenderit. Unde dolorum, molestiae ex nam odio architecto ratione eum rem!",
  },
];

function RegisDetailsPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <div className="grid grid-cols-1 gap-6 p-6 bg-white rounded-md shadow-md md:grid-cols-2">
          {sections.map((section, index) => (
            <section
              key={index}
              className="p-4 border border-gray-300 rounded-md"
            >
              <h2 className="mb-2 text-2xl font-bold">{section.title}</h2>
              <p className="mb-4">{section.description}</p>
              <div className="divider"></div>
              <button className="text-blue-500 hover:underline">
                Learn more
              </button>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default RegisDetailsPage;
