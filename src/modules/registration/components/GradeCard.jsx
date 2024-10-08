const GradeCard = ({ gpa, gpax, semester, courses }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="bg-[#c3554e] text-white rounded-t-lg p-4 flex justify-evenly items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-geologica font-bold">GPA</p>
          <p className="text-xl font-bold">{gpa}</p>
          <p className="text-xs">Semester {semester}</p>
        </div>
        <div className="h-12 border-l border-white mx-4"></div>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm font-geologica font-bold">GPAX</p>
          <p className="text-xl font-bold">{gpax}</p>
          <p className="text-xs">Semester {semester}</p>
        </div>
      </div>

      <div className="p-4 divide-y divide-gray-200">
        {courses.map((course, index) => (
          <div key={index} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-[#DC5A52]">{course.code}</p>
              <p className="text-lg font-semibold">{course.name}</p>
              <p className="text-sm text-[#B1B1B1]">{course.credits} Credits</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{course.grade}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeCard;
