import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { usePeriodBySemesterId } from "../services/queries";

function PeriodPage() {
  const regis = localStorage.getItem("event");
  const semesterId = localStorage.getItem("semesterId");
  const { data: periods } = usePeriodBySemesterId(semesterId);

  const Button = ({ to, disabled, icon, text }) => (
    <Link to={to}>
      <button
        className={`${button} ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={disabled}
      >
        {icon && <FontAwesomeIcon icon={faLock} className="px-2" />}
        {text}
      </button>
    </Link>
  );

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard link="/" title="My Profile" />
        <div className="divider"></div>
        <div className="grid min-[990px]:grid-cols-2 gap-10 bg-white p-10 shadow-md rounded-md">
          <div className="">
            <SInfoCard />
            <div className="grid w-1/2 gap-4 mx-auto mt-8">
              {regis === "Withdraw" || regis === "Early Withdraw" ? (
                <Button to="/regis/course" text="Withdraw Courses" />
              ) : (
                <>
                  <Button
                    to="/regis/course"
                    disabled={regis === "Late Registration"}
                    icon={regis === "Late Registration"}
                    text="Register"
                  />
                  <Button
                    to="/regis/course"
                    disabled={regis === "Registration"}
                    icon={regis === "Registration"}
                    text="Late Register"
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center text-xs md:text-base">
            <div className="w-3/4 p-2 rounded-lg bg-gradient-to-r from-orange-800 via-orange-500 to-orange-300">
              <div className="flex flex-col p-8 space-y-6 bg-white rounded-lg">
                {periods && periods.length > 0 ? (
                  periods.map((period, index) => (
                    <div key={index} className="pl-4 border-l-4 border-orange-600 my-2">
                      <p className="md:text-xl font-bold">{period.event}</p>
                      <p>{`${formatDate(period.start_date)} - ${formatDate(period.end_date)}`}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No periods available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PeriodPage;
