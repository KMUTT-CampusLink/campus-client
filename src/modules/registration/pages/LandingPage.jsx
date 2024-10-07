import NavBar from "../components/NavBar";
import { mainStyles } from "../styles/styles";
import { navbarColors } from "../styles/colors";
import SInfoCard from "../components/SInfoCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
function LandingPage() {
  const hasProfilePic = false;

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${navbarColors.gradientFrom}, ${navbarColors.gradientTo})`,
        }}
      >
        <NavBar />
        <main className={`${mainStyles} p-10`}>
          <div className="p-10 rounded-xl mt-10 mx-auto text-black bg-white shadow-xl">
            <div
              className="flex items-center justify-center mx-auto sm:w-96 h-60 rounded-2xl"
              style={{
                backgroundImage: `linear-gradient(to right, ${navbarColors.gradientFrom}, ${navbarColors.gradientTo})`,
              }}
            >
              <div className="hidden sm:block ml-4">
                {hasProfilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-black w-20 h-20"
                  />
                )}
              </div>
              <div className="pr-4">
                <SInfoCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
