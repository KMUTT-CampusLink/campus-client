function CourseTable({ data }) {
  return (
    <div className="bg-gray-200 rounded-md overflow-x-auto">
      <table className="min-w-full text-left border">
        <thead>
          <tr className="bg-[#c3554e] text-white">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Subjects</th>
            <th className="border px-4 py-2">Credits</th>
            <th className="border px-4 py-2">Conditions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.credit}</td>
              <td className="border px-4 py-2">{course.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
