function TranscriptCard({ semester, gpa, subjects }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold mb-2">
        {semester} GPA {gpa.toFixed(2)}
      </h2>
      <div className="bg-gray-200 rounded-md overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#c3554e] text-white">
            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="p-2">{subject.name}</td>
                <td className="p-2">{subject.grade}</td>
                <td className="p-2">{subject.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranscriptCard;
