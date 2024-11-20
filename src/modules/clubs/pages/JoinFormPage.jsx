import React, { useState } from "react";
import { Link } from "react-router-dom";

const JoinFormPage = () => {
  // State for input fields
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [clubName, setClubName] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setStudentId(e.target.studentId.value);
    setStudentName(e.target.studentName.value);
    setClubName(e.target.clubName.value);
  };

  return (
    <div
      className="grid min-h-screen"
      
    >
        <main className="bg-white rounded-t-[35px]  ">
        <div className="bottom-section-wrapper m-12 md:m-16 lg:m-20">
          <h2 className="text-xl md:text-3xl text-center md:w-3/5 md:mx-auto font-bold mb-8">
            Please fill the information below
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mx-2 md:m-auto md:w-1/2">
              <div className="studentId mb-4">
                <label
                  htmlFor="studentId"
                  className="block text-black text-wrap text-left mb-2"
                >
                  Student ID
                </label>
                <input
                  required
                  type="text"
                  id="studentId"
                  className="w-full border border-black rounded-lg p-3"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <div className="studentName mb-4">
                <label
                  htmlFor="studentName"
                  className="block text-black text-wrap text-left mb-2"
                >
                  Student Name
                </label>
                <input
                  required
                  type="text"
                  id="studentName"
                  className="w-full border border-black rounded-lg p-3"
                  placeholder="Enter Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="clubName mb-4">
                <label
                  htmlFor="clubName"
                  className="block text-black text-wrap text-left mb-2"
                >
                  Club Name
                </label>
                <input
                  required
                  type="text"
                  id="clubName"
                  className="w-full border border-black rounded-lg p-3"
                  placeholder="Enter Club Name"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link to={"/clubs"}
                type="submit"
                className="bg-[#F69800] text-white px-14 py-2 rounded-full text-lg hover:bg-orange-600"
              >
                Join
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default JoinFormPage;
