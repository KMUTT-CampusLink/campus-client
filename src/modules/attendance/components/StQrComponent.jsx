import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useStQr from "../hook/useStQr";

const StQrComponent = () => {
  const { items, handleMenuClick, stDetail, StQrButton } = useStQr();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-600 to-yellow-400">
      <NavBar />

      <div className="mt-16 flex-1 bg-white rounded-t-3xl relative">
        {/* Menu items */}
        <div className="w-full flex justify-start mt-4 px-4 md:px-48">
          <div className="flex gap-4 md:gap-10 flex-wrap justify-center">
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
          <div className="p-4 md:p-8 pl-4 pr-4 md:pl-24 md:pr-24">{stDetail && stDetail()}</div>

          <hr className="border-gray-300 w-full m-0" />
          <div className="p-4 md:p-8 pl-4 pr-4 md:pl-24 md:pr-24">
            <div className="mt-2">{StQrButton && StQrButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StQrComponent;
