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
        <div className="min-h-80 grid md:grid-cols-2 bg-white-300">
          <div
            className="p-12
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
          <div className=" ">
            <div className=" mx-10 my-10 rounded-lg shadow-lg p-4 bg-white items-center justify-center">
              <p className="text-xl font-bold">Late registeration</p>
              <p>20 Dec.2030 - 30 Dec.2030</p>
              <p className="text-xl font-bold">Withdraw period</p>
              <p>20 Dec.2030 - 30 Dec.2030</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PeriodPage;
