import HashLoader from "react-spinners/HashLoader";
const SmallLoading = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[1rem] p-[2rem]">
      <div className="">
        <HashLoader size={35} speedMultiplier={1.5} color="#EC5A51" />
      </div>
      <p className="font-geologica text-lg font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-[#E94057] to-[#8A2387]">
        {message?.toUpperCase() || "LOADING"}
      </p>
    </div>
  );
};

export default SmallLoading;
