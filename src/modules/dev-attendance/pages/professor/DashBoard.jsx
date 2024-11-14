import NavBar from "../../../registration/components/NavBarComponents/NavBar";
import NavBarProfessor from "../../components/professor/NavBarProfessor";
import Setting from "../../components/professor/Setting";
import Record from "../../components/professor/Record";
import Manage from "../../components/professor/Manage";
import { useState } from "react";

const ProfessorDashBoard = () => {
  const section_id = 1019;
  const [tab, setTab] = useState("record");
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="w-full h-fit flex items-center justify-center pt-[4rem] min-[990px]:pt-[5rem]">
        {/* Container */}
        <div className="w-full flex-col items-center justify-center">
          <NavBarProfessor tab={tab} setTab={setTab} />
          {(tab === "setting" && <Setting section_id={section_id} />) ||
            (tab === "record" && <Record />) ||
            (tab === "manage" && <Manage />)}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashBoard;
