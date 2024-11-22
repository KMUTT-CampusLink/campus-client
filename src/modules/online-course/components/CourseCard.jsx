import { useNavigate, useLocation } from "react-router-dom";

const CourseCard = ({ course }) => {
  const imageURL =
    "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.jpg?s=612x612&w=0&k=20&c=mJeYiZyGQXLXXZ6AWKbLwQDiuLr-YLRGV4VjHKdX0pM=";

  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname.includes("/courses/st")) {
      navigate(`/courses/st/course_description`, { state: course });
    } else {
      navigate(`/courses/tr/course_description`, { state: course });
    }
  };

  return (
    <div
      className="bg-white rounded-xl hover:cursor-pointer shadow-lg overflow-hidden w-full h-auto max-sm:h-52 flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      <img
        src={course?.image_url || imageURL}
        alt={course?.course_name}
        className="w-full h-3/5 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <div className="flex justify-between">
        <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4 transition-colors duration-300 ease-in-out hover:text-blue-500">
          {course?.code}
        </h3>
        <p className="px-4 text-gray-600 max-lg:text-xs transition-colors duration-300 ease-in-out hover:text-gray-800">
          {course?.semester}
        </p>
      </div>

      <h3 className="mt-1 text-base max-lg:text-sm font-semibold px-4 transition-colors duration-300 ease-in-out hover:text-blue-500">
        {course?.course_name}
      </h3>
      <p className="px-4 pb-4 text-gray-600 text-sm max-lg:text-xs transition-colors duration-300 ease-in-out hover:text-gray-800">
        {course?.sec_name}
      </p>
    </div>

  );
};

export default CourseCard;
