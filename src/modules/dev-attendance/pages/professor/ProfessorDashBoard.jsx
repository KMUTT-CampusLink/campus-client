import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import NavBarProfessor from "../../components/professor/NavBarProfessor";
import { Outlet } from "react-router-dom";

const ProfessorDashBoard = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="w-full h-fit flex items-center justify-center pt-[4rem] min-[990px]:pt-[5rem]">
        {/* Container */}
        <div className="w-full flex-col items-center justify-center">
          <NavBarProfessor />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashBoard;
