import { BsQrCodeScan } from "react-icons/bs";
import { RiQrScan2Line } from "react-icons/ri";
function OptionCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="text-center p-4 my-4 bg-white rounded-lg shadow-md">
        <div className="text-5xl text-orange-600 flex justify-center items-center">
          <BsQrCodeScan />
        </div>
        <p className="mt-4 font-semibold">Top Up</p>
      </button>
      <button className="text-center p-4 my-4 bg-white rounded-lg shadow-md">
        <div className="text-5xl text-yellow-600 flex justify-center items-center">
          <RiQrScan2Line />
        </div>
        <p className="mt-4 font-semibold">Withdraw</p>
      </button>
    </div>
  );
}

export default OptionCard;
