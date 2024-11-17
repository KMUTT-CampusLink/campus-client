function CourseTable({ courses }) {
  return (
    <div className="bg-gray-200 rounded-md overflow-x-auto">
      <table className="min-w-full text-left border">
        <thead>
          <tr className="bg-[#c3554e] text-white">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Credits</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                <span className="pr-2 font-semibold text-lg text-[#DC5A52]">
                  {course.course_code}
                </span>
                <br />
                <span>{course.course_name}</span>
              </td>
              <td className="border px-4 py-2">{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
