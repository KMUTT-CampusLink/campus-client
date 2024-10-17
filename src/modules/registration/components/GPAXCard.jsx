import SInfoCard from "./SInfoCard";
import { useNavigate } from "react-router-dom";
import { button } from "../styles/styles";
import { useEffect, useState } from "react";
import { useGPAXByStudentId } from "../services/queries";
import { CardErrorSkeleton } from "../styles/Skeletons";

function GPAXCard({ studentId }) {
  const {
    data: overallGPAXData,
    isLoading,
    isError,
  } = useGPAXByStudentId(studentId);

  const [gpaDetails, setGpaDetails] = useState({
    gpax: null,
    creditsEarned: null,
    creditsUsedInCalGPA: null,
  });

  useEffect(() => {
    if (overallGPAXData) {
      setGpaDetails({
        gpax: overallGPAXData.gpa,
        creditsEarned: overallGPAXData.totalCreditsRegistered,
        creditsUsedInCalGPA: overallGPAXData.totalCredits,
      });
    }
  }, [overallGPAXData]);

  const creditsPrescribed = 134;
  const navigate = useNavigate();

  if (isError) return <CardErrorSkeleton data="gpax" />;

  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h2 className="font-bold text-2xl mb-2">Cumulative GPA</h2>
      <div className="divider"></div>
      <SInfoCard />
      <div className="divider"></div>

      {isLoading ? (
        <div className="text-sm mb-4 animate-pulse" aria-live="polite">
          <p className="h-4 bg-gray-200 rounded w-1/2">Loading GPAX Data...</p>
        </div>
      ) : (
        <div className="text-sm">
          <p>
            Credits Prescribed:{" "}
            <span className="font-bold">{creditsPrescribed}</span>
          </p>
          <p>
            Credits Used in GPA Calculation:{" "}
            <span className="font-bold">
              {gpaDetails.creditsUsedInCalGPA || "N/A"}
            </span>
          </p>
          <p>
            Credits Earned:{" "}
            <span className="font-bold">
              {gpaDetails.creditsEarned || "N/A"}
            </span>
          </p>
          <p>
            Grade Point Average:{" "}
            <span className="font-bold">{gpaDetails.gpax || "N/A"}</span>
          </p>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className={`${button} mt-2`}
        aria-label="Go back to the previous page"
      >
        Back
      </button>
    </div>
  );
}

export default GPAXCard;
