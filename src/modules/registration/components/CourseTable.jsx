function CourseTable({ courses }) {
  return (
    <div className="overflow-x-auto bg-gray-200 rounded-md">
      <table className="min-w-full text-left border">
        <thead>
          <tr className="bg-[#c3554e] text-white">
            <th className="px-4 py-2 border">No.</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Credits</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="px-4 py-2 text-center border">{index + 1}</td>
              <td className="px-4 py-2 border">
                <span className="pr-2 font-semibold text-lg text-[#DC5A52]">
                  {course.course_code}
                </span>
                <br />
                <span>{course.course_name}</span>
              </td>
              <td className="px-4 py-2 border">{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
