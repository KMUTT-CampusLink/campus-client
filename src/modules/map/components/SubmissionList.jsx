import { useState, useEffect } from "react";
import axios from "axios";

const SubmissionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/map/complaints`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="my-10 overflow-scroll py-10">
      <h1 className="text-3xl mx-auto md:mx-0 w-max md:w-full md:text-4xl px-6 md:px-4 py-8 mb-8 font-extrabold border-b-4 border-solid">
        Complaint Submissions
      </h1>

      <div className="h-max w-full space-y-3 px-4">
        <div className=" bg-[#EEE7E6] flex border-[1px] my-2 py-6 px-8 shadow-md ">
          <span className="w-[33%] md:ml-4 my-auto h-min">Author</span>
          <span className="w-[33%] text-center my-auto h-min">Title</span>
          <span className="w-[33%] text-center my-auto h-min">Date</span>
        </div>
        {data.map((complaint, index) => (
            <ul className="">
              
                <div
                  key={index}
                  className="flex border-[1px] py-6 px-8 shadow-md text-sm text-balance align-middle"
                >
                  <span className="w-[33%] flex-grow grid md:flex">
                    <spanc className="my-auto h-min">{complaint.userfirstname}</spanc>
                    <span className="my-auto h-min">{complaint.userlastname}</span>
                  </span>
                  <span className="w-[33%] text-center my-auto h-min">{complaint.title}</span>
                  <span className="w-[33%] text-center my-auto h-min">{formatDateToDDMMYYYY(complaint.createdat)}</span>
                </div>
            </ul>
        ))}
      </div>
    </div>
  );
};

export default SubmissionList;
