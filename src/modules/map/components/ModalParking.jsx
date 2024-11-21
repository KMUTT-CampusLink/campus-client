import Parking from "/map/Parking.jpg";

function ModalParking({subData}){

    const textColor = 
    subData.parking_capacity >=10
      ? "text-green-500"
      : subData.parking_capacity >0
        ? "text-yellow-500"
        : "text-red-500";

    return(
        <div className="grid my-10">
            <div className="w-[50%] aspect-[7/4] bg-black rounded-xl overflow-hidden m-auto h-full">
                <img src={Parking} alt="parking image"  />
            </div>
            <h1 className={`m-5 mx-auto ${textColor}`}>Available Slots: {subData.parking_capacity}</h1>
            <button className="font-semibold bg-[#864E41] text-white rounded-full w-max px-5 py-2 mx-auto mt-10">Go to Reservation</button>
        </div>
    )
}

export default ModalParking;