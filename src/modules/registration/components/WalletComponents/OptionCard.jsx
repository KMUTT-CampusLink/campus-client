import { BsQrCodeScan } from "react-icons/bs";
import { RiQrScan2Line } from "react-icons/ri";
function OptionCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="p-4 my-4 text-center bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center text-5xl text-orange-600">
          <BsQrCodeScan />
        </div>
        <p className="mt-4 font-semibold">Top Up</p>
      </button>
      <button className="p-4 my-4 text-center bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center text-5xl text-yellow-600">
          <RiQrScan2Line />
        </div>
        <p className="mt-4 font-semibold">Withdraw</p>
      </button>
    </div>
  );
}

export default OptionCard;
