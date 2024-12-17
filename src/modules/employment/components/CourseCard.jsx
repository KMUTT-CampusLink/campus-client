import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employ/courseDetail/${course.code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-gray border-[0.1px]  rounded-[15px] shadow-sm hover:shadow-xl transition flex flex-col  md:w-[300px] w-[270px] h-[200px] md:h-[250px]  overflow-hidden "
    >
      {console.log(course)}
      <img
        src={`${import.meta.env.VITE_MINIO_URL}${
          import.meta.env.VITE_MINIO_BUCKET_NAME
        }/${course.image}`}
        alt={course.code}
        className="object-cover h-36 sm:h-44  w-full"
      />
      <h1 className="text-left font-geologica mt-2 pl-2 sm:mt-4 sm:pl-4 text-[16px] md:text-[20px]">
        {course.code} - {course.name}{" "}
      </h1>
    </div>
  );
};

export default CourseCard;
