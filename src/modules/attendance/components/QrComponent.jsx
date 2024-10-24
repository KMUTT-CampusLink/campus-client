import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useQr from "../hook/useQr";
// import ErrorCard from "./ErrorCard";
// import GpsCard from "./GpsCard";
// import SuccessCard from "./SuccessCard";


const QrComponent = () => {
  const { items, handleMenuClick, detail, qrButton } = useQr(); 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-600 to-yellow-400">
      <NavBar />

      <div className="mt-16 flex-1 bg-white rounded-t-3xl relative">
        {/* Menu items */}
        <div className="w-full flex justify-start mt-4 pl-48 pr-48">
          <div className="flex gap-10">
            {items?.map((item, index) => (
              <span
                key={index}
                className="text-lg font-semibold cursor-pointer hover:border-b-4 hover:border-black"
                onClick={() => handleMenuClick(item.key)}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="px-0">
          <hr className="border-black w-full m-0" />
          <div className="p-8 pl-24 pr-24">
            {detail && detail()}
          </div>

          <hr className="border-gray-300 w-full m-0" />
          <div className="p-8 pl-24 pr-24">
            <div className="mt-2">
              {qrButton && qrButton()}
              {/* <GpsCard />
              <SuccessCard/>
              <ErrorCard/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrComponent;
