import NavForIndvCourse from "../../components/NavForIndvCourse";
import { useLocation } from "react-router-dom";
import { useCourseHeaderBySectionIDForStudent } from "../../services/queries";

const StCourseDescription = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sec_id = queryParams.get("sec_id");

  const { data: details } = useCourseHeaderBySectionIDForStudent(sec_id);
  console.log(details);

  const description = details?.description;

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <NavForIndvCourse page={"description"} />

      {/* About Classroom Section */}
      <div className="max-sm:text-sm max-md:pt-1 pt-12 pb-8 border-b-2 ">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto">
          <div className="text-2xl font-bold pt-10 pb-3 text-[#ecb45e]">
            About Classroom
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Course: </span>
            {`${details?.course_code} ${details?.course_name}`}
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Lecturer: </span>
            Arjan {`${details?.lecturer}`}
          </div>
          <div className="text-gray-800">
            <span className="font-semibold">Time: </span>
            {`${details?.time}`} (Thursday)
          </div>
        </div>
      </div>

      {/* Course Description Section */}
      <div className="py-8 w-full max-md:text-xs">
        <div className="max-md:w-full max-md:ml-2 w-3/4 mx-auto flex max-md:gap-3 gap-10 items-center mb-4">
          <div className="text-2xl font-bold text-[#ecb45e]">
            Course Description
          </div>
        </div>
        <div className="max-md:w-full max-md:px-2 w-3/4 mx-auto text-gray-700 leading-relaxed">
          <p>{description}</p>
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="py-8 bg-white max-md:text-xs px-2">
        <div className="max-md:w-full w-3/4 mx-auto text-2xl font-bold text-[#ecb45e] mb-4">
          Learning Outcomes
        </div>
        <div className="max-md:w-full w-3/4 mx-auto text-gray-700 leading-relaxed">
          <ul className="list-disc list-inside">
            <li>Understand the architecture of modern computer systems.</li>
            <li>Analyze the functioning of the control unit and CPU.</li>
            <li>
              Apply Boolean algebra and digital logic in computing problems.
            </li>
            <li>Explore the design and organization of instruction sets.</li>
            <li>
              Evaluate the performance of different processor architectures.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StCourseDescription;
