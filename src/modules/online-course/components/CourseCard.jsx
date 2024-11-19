import { useNavigate, useLocation } from "react-router-dom";

const CourseCard = ({ course }) => {
  const imageURL =
    "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.jpg?s=612x612&w=0&k=20&c=mJeYiZyGQXLXXZ6AWKbLwQDiuLr-YLRGV4VjHKdX0pM=";

  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname.includes("/courses/st")) {
      navigate(`/courses/st/course_description`, { state: course});
    } else {
      navigate(`/courses/tr/course_description`, {state: course});
    }
  };

  return (
    <div
      className="bg-white rounded-xl hover:cursor-pointer shadow-lg overflow-hidden w-full h-auto max-sm:h-52 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img
        src={course?.image_url || imageURL}
        alt={course?.course_name}
        className="w-full h-3/5 object-cover"
      />
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">
        {course?.code}
      </h3>
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">
        {course?.course_name}
      </h3>
      <div className="flex justify-between">
        <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">
          {course?.semester}
        </p>
        <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">
          {course?.sec_name}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
