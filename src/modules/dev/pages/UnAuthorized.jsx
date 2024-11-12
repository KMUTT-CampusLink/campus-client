import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white">
      <NavBar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10">
        <div className="w-[25rem] h-auto">
          <img
            className="w-full h-full object-cover"
            src="/logos/401.png"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="font-opensans font-semibold text-red-500 text-xl tracking-widest">
            OOP! UNAUTHORIZED ACCESS
          </p>
          <button
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className="rounded-xl border-2 border-dashed border-black p-2 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-none hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
          >
            <span className="font-opensans bg-clip-text text-transparent bg-gradient-to-r from-[#870000] to-[#480048] text-sm font-bold">
              BACK TO HOME
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
