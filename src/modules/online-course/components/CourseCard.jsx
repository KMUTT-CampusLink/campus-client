const CourseCard = ({ title, description, imageURL }) => {
  return (
    <div className="bg-white rounded-xl hover:cursor-pointer hover:scale-110 duration-300 shadow-lg overflow-hidden w-full h-auto max-sm:h-52 flex flex-col justify-between">
      <img src={imageURL} alt={title} className="w-full h-3/5 object-cover" />
      <h3 className="mt-1 text-lg max-lg:text-xs font-bold px-4">{title}</h3>
      <p className="px-4 pb-4 text-gray-600 max-lg:text-xs">{description}</p>
    </div>
  );
};

export default CourseCard;
