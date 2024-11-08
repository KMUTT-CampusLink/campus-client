import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import HeadLineCard from "../components/HeadLineCard";

function PeriodPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard link="/" title="My Profile" />
        <div className="divider"></div>
        <div className="min-h-80 grid md:grid-cols-2 bg-red-300">
          <div
            className="bg-yellow-400 p-12
          "
          >
            <p className="text-sm">66130500812</p>
            <p className="text-2xl font-bold">Khaing Zin Than</p>
            <p className="font-semibold">School of Information Technology</p>
            <p className="font-semibold">Computer Science</p>
            <div className="grid gap-4 mt-8">
              <button className={button}>Register</button>
              <button className={button}>Late Register</button>
            </div>
          </div>
          <div className="bg-green-500"></div>
        </div>
      </main>
    </div>
  );
}

export default PeriodPage;
