import NavBar from "../components/NavBarComponents/NavBar";
import { mainStyles, containerDivStyles, button } from "../styles/styles";
import HeadLineCard from "../components/HeadLineCard";
import SInfoCard from "../components/SInfoCard";

function PeriodPage() {
  return (
    <div className={containerDivStyles}>
      <NavBar />
      <main className={mainStyles}>
        <HeadLineCard link="/" title="My Profile" />
        <div className="divider"></div>
        <div className="min-h-80 grid md:grid-cols-2 gap-10">
          <div className="">
            <SInfoCard />
            <div className="grid gap-4 mx-auto w-1/2 mt-8">
              <button className={button}>Register</button>
              <button className={button}>Late Register</button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-3/4 rounded-lg p-2 bg-gradient-to-r from-orange-800 via-orange-500 to-orange-300">
              <div className="flex flex-col space-y-6 bg-white p-8 rounded-lg">
                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="text-xl font-bold">Late Registration</p>
                  <p>20 Dec. 2030 - 30 Dec. 2030</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="text-xl font-bold">Withdraw Period</p>
                  <p>20 Dec. 2030 - 30 Dec. 2030</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PeriodPage;
