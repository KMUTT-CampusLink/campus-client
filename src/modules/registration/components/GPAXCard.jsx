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
    creditsPrescribed: null,
  });

  useEffect(() => {
    if (overallGPAXData) {
      setGpaDetails({
        gpax: overallGPAXData.gpa,
        creditsEarned: overallGPAXData.totalCreditsRegistered,
        creditsUsedInCalGPA: overallGPAXData.totalCredits,
        creditsPrescribed: overallGPAXData.creditsPrescribed,
      });
    }
  }, [overallGPAXData]);

  const navigate = useNavigate();

  if (isError) return <CardErrorSkeleton data="gpax" />;

  return (
    <div className="p-4 bg-gray-200 rounded shadow">
      <h2 className="mb-2 text-2xl font-bold">Cumulative GPA</h2>
      <div className="divider"></div>
      <SInfoCard />
      <div className="divider"></div>

      {isLoading ? (
        <div className="mb-4 text-sm animate-pulse" aria-live="polite">
          <p className="w-1/2 h-4 bg-gray-200 rounded">Loading GPAX Data...</p>
        </div>
      ) : (
        <div className="text-sm">
          <p>
            Credits Prescribed:{" "}
            <span className="font-bold">{gpaDetails.creditsPrescribed}</span>
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
