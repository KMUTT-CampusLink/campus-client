import Parking from "/map/Parking.jpg";

function ModalParking({subData}){

    const textColor = 
    subData.parking_capacity >=10
      ? "text-green-500"
      : subData.parking_capacity >0
        ? "text-yellow-500"
        : "text-red-500";

    return(
        <div className="grid h-full">
            <div className="grid h-max mt-[15%] md:m-auto">
            <div className="w-[90%] md:w-[50%] aspect-[7/4] bg-black rounded-xl overflow-hidden m-auto h-full">
                <img src={Parking} alt="parking image"  />
            </div>
            <h1 className={`sm:mt-[10%] md:mt-0 mx-auto ${textColor}`}>Available Slots: {subData.parking_capacity}</h1>
            <a href="/parking"  className="font-semibold bg-[#864E41] text-white rounded-full w-max px-6 py-3 mx-auto mt-10">Go to Reservation</a>
            </div>
        </div>
    )
}

export default ModalParking;