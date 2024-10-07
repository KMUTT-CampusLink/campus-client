function SInfoCard() {
  const sinfo = {
    studentId: "66130500801",
    firstName: "Thitapa",
    lastName: "Ritnamsuk",
    school: "School of Information Technology",
    department: "Computer Science",
  };
  return (
    <>
      <div className="ml-6">
        <p className="text-gray-500 mt-4 text-sm">{sinfo.studentId}</p>
        <h2 className="text-2xl font-bold">{sinfo.firstName}</h2>
        <h2 className="text-2xl font-bold">{sinfo.lastName}</h2>
        <p>{sinfo.school}</p>
        <p>{sinfo.department}</p>
      </div>
    </>
  );
}

export default SInfoCard;
