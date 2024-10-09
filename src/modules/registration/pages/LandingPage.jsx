import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles } from "../styles/styles";
import SInfoCard from "../components/SInfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { logoHead, containerDivStyles } from "../styles/styles";

function LandingPage() {
  const hasProfilePic = false;

  return (
    <>
      <div className={containerDivStyles}>
        <NavBar />
        <main className={`${mainStyles}`}>
          <h2 className={`${logoHead} p-10`}>CampusLink</h2>

          <div className="rounded-xl mx-auto text-black">
            <div
              className="flex items-center justify-center mx-auto sm:w-96 h-60 rounded-2xl"
              style={{
                backgroundImage: `linear-gradient(to right, #c2544d, #f09107)`,
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
