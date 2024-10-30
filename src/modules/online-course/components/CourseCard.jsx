import { useNavigate, useLocation } from "react-router-dom";

const CourseCard = ({ title, description, imageURL, route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.includes("/courses/St")) {
      navigate(`/courses/St/${route}`);
    } else {
      navigate(`/courses/Tr/${route}`);
    }
  };

  return (
    <div
      className="bg-white rounded-xl hover:cursor-pointer hover:scale-110 duration-300 shadow-lg overflow-hidden w-full h-auto max-sm:h-52 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img src={imageURL} alt={title} className="w-full h-3/5 object-cover" />
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">{title}</h3>
      <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">{description}</p>
    </div>
  );
};

export default CourseCard;
