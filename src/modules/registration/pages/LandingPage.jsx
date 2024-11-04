import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, logoHead } from "../styles/styles";

function LandingPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <h2 className={`${logoHead} p-10`}>CampusLink</h2>

        <div className="rounded-xl mx-auto text-black">
          <div
            className="flex items-center justify-center mx-auto sm:w-96 h-60 rounded-2xl"
            style={{
              backgroundImage: "linear-gradient(to right, #c2544d, #f09107)",
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
