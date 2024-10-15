import SInfoCard from "./SInfoCard";
import { useNavigate } from "react-router-dom";
import { button } from "../styles/styles";
import { useEffect, useState } from "react";
import { useGPAXByStudentId } from "../services/queries";

function GPAXCard({ studentId }) {
  const {
    data: overallGPAXData,
    isLoading: isLoading,
    isError: isError,
  } = useGPAXByStudentId(studentId);

  const [gpax, setGPAX] = useState("");
  const [creditsEarned, setCreditsEarned] = useState("");
  const [creditsUsedInCalGPA, setCreditsUsedInCalGPA] = useState("");

  useEffect(() => {
    if (overallGPAXData) {
      setGPAX(overallGPAXData.gpa);
      setCreditsEarned(overallGPAXData.totalCreditsRegistered);
      setCreditsUsedInCalGPA(overallGPAXData.totalCredits);
    }
  }, [overallGPAXData]);

  const creditsPrescribed = 134;
  const navigate = useNavigate();

  if (isError) return <div>Error Loading GPAX Data.</div>;

  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h2 className="font-bold text-2xl mb-2">Cumulative GPA</h2>
      <div className="divider"></div>
      <SInfoCard />
      <div className="divider"></div>
      {isLoading ? (
        <div className="text-sm mb-4 animate-pulse">
          <p>
            <div className="h-4 bg-gray-200 rounded w-1/2">
              Loading GPAX Data
            </div>
          </p>
        </div>
      ) : (
        <div className="text-sm">
          <p>
            Credits Prescribed:
            <span className="font-bold">{creditsPrescribed}</span>
          </p>
          <p>
            Credits Used in GPA Calculation:{" "}
            <span className="font-bold">{creditsUsedInCalGPA}</span>
          </p>
          <p>
            Credits Earned: <span className="font-bold">{creditsEarned}</span>
          </p>
          <p>
            Grade Point Average: <span className="font-bold">{gpax}</span>
          </p>
        </div>
      )}

      <button onClick={() => navigate(-1)} className={`${button} mt-2`}>
        Back
      </button>
    </div>
  );
}

export default GPAXCard;
