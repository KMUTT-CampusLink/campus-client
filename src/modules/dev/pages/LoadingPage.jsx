import HashLoader from "react-spinners/HashLoader";

const LoadingPage = ({ message }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-[2.5rem]">
      <div className="">
        <HashLoader size={70} speedMultiplier={1.5} color="#EC5A51" />
      </div>
      <p className="font-geologica text-2xl font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-[#E94057] to-[#8A2387]">
        {message?.toUpperCase() || "LOADING"}
      </p>
    </div>
  );
};

export default LoadingPage;
