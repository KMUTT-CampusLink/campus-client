import {
  faQrcode,
  faListCheck,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link } from "react-router-dom";

const NavBarProfessor = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="font-geologica text-lg min-[990px]:text-2xl font-semibold tracking-widest">
        Attendance Management
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          to={``}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200 tracking-wide transition-colors`}
        >
          <FontAwesomeIcon icon={faQrcode} />
          <span>Record</span>
          {pathname.split("/").length === 4 && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </Link>
        <Link
          to={`manage`}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200 tracking-wide transition-colors`}
        >
          <FontAwesomeIcon icon={faListCheck} />
          <span>Manage</span>
          {pathname.includes("manage") && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </Link>
        <Link
          to={`setting`}
          className={`font-geologica font-semibold text-base p-[1rem] flex items-center justify-center gap-2 relative cursor-pointer rounded-md hover:bg-gray-200 tracking-wide transition-colors`}
        >
          <FontAwesomeIcon icon={faGear} />
          <span>Setting</span>
          {pathname.includes("setting") && (
            <div className="absolute bottom-0 w-[90%] h-[2.5px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavBarProfessor;
