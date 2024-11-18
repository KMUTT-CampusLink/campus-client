import { useNavigate, useLocation } from "react-router-dom";

const CourseCard = ({ code, title, semester, section,
  imageURL=      "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.jpg?s=612x612&w=0&k=20&c=mJeYiZyGQXLXXZ6AWKbLwQDiuLr-YLRGV4VjHKdX0pM=",
route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const courseState = {
      sec_id: section, // Replace with the actual section ID
      course_code: code,
      course_name: title,
      course_desc: semester, // Replace if there’s a more detailed semester
    };
    if (location.pathname.includes("/courses/st")) {
      navigate(`/courses/st/${route}`, {state: courseState});
    } else {
      navigate(`/courses/tr/${route}`, {state: courseState});
    }
  };

  return (
    <div
      className="bg-white rounded-xl hover:cursor-pointer shadow-lg overflow-hidden w-full h-auto max-sm:h-52 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img src={imageURL} alt={title} className="w-full h-3/5 object-cover" />
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">{code}</h3>
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">{title}</h3>
      <div className="flex justify-between">
        <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">{semester}</p>
        <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">{section}</p>
      </div>
    </div>
  );
};

export default CourseCard;
