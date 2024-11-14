import {
  faQrcode,
  faListCheck,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarProfessor = ({ tab, setTab }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="font-geologica text-lg min-[990px]:text-2xl font-semibold tracking-widest">
        Attendance Management
      </p>
      <div className="flex items-center justify-center gap-4">
        <div
          onClick={() => setTab("setting")}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200`}
        >
          <FontAwesomeIcon icon={faGear} />
          <span>Setting</span>
          {tab === "setting" && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </div>
        <div
          onClick={() => setTab("record")}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200`}
        >
          <FontAwesomeIcon icon={faQrcode} />
          <span>Record</span>
          {tab === "record" && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </div>
        <div
          onClick={() => setTab("manage")}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200`}
        >
          <FontAwesomeIcon icon={faListCheck} />
          <span>Manage</span>
          {tab === "manage" && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarProfessor;
