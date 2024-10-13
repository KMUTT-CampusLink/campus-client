import { useNavigate } from "react-router-dom";
import { button } from "../styles/styles";
import SInfoCard from "./SInfoCard";

function GPAXCard({ gpax, creditsPrescribed, creditsEarned }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h2 className="font-bold text-2xl mb-2">Cumulative GPA</h2>
      <div className="divider"></div>
      <SInfoCard />
      <div className="divider"></div>
      <div className="text-sm">
        <p>
          Credits Prescribed:{" "}
          <span className="font-bold">{creditsPrescribed}</span>
        </p>
        <p>
          Credits Earned: <span className="font-bold">{creditsEarned}</span>
        </p>
        <p>
          Grade Point Average: <span className="font-bold">{gpax}</span>{" "}
        </p>
      </div>
      <button onClick={() => navigate(-1)} className={`${button} mt-2`}>
        Back
      </button>
    </div>
  );
}

export default GPAXCard;
