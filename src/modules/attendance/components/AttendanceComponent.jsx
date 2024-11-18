import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useAttendance from "../hook/useAttendance";

const AttendanceComponent = () => {
  const { items, handleMenuClick, AttendanceDetail, chooseDate, table } = useAttendance();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-500 to-yellow-500">
      <NavBar />

      <div className="mt-16 flex-1 bg-white rounded-t-3xl relative">
        {/* Menu items */}
        <div className="w-full flex justify-center mt-4 px-4 sm:px-48">
          <div className="flex gap-4 sm:gap-10 flex-wrap justify-center">
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

        <div className="px-4 sm:px-0">
          <hr className="border-b border-black w-full" />
          <div className="p-4 sm:p-8 lg:p-12">
            {AttendanceDetail && AttendanceDetail()}
          </div>

          <hr className="border-b border-gray-300 w-full" />
          <div className="p-4 sm:p-8 lg:p-12">
            {chooseDate && chooseDate()}
            <div className="mt-8">
              {table && table()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceComponent;
