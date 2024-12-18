import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white">
      <NavBar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10">
        <div className="w-[25rem] h-auto">
          <img
            className="w-full h-full object-cover"
            src="/logos/404.png"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="font-opensans font-semibold text-[#565872] text-xl tracking-widest">
            OOP! NO PAGE FOUND
          </p>
          <button
            onClick={() => {
              history.back();
            }}
            className="rounded-xl border-2 border-dashed border-black py-2 px-[1.5rem] transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-none hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
          >
            <span className="font-opensans bg-clip-text text-transparent bg-gradient-to-r from-[#870000] to-[#480048] text-sm font-bold">
              BACK TO SAFETY
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
