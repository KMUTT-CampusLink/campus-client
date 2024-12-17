import { useState, useEffect } from "react";
import Spot from "../component/Spot";
import { getBuildingById, postReservation } from "../services/api";
import { useNavigate } from "react-router-dom";

function ParkingSpot({ id, name, img, onClose }) {
    const [parking, setParking] = useState([]);
    const [spot, setSpot] = useState([]);
    const navigate = useNavigate();

    const closeRespop = () => {
        if (onClose) {
            onClose();
        }
    };

    const getParking = async () => {
        try {
            const res = await getBuildingById(id);
            setParking(res);
            setSpot(res[0]?.floors || []);
        } catch (error) {
            console.error("Error fetching parking data:", error);
        }
    };

    useEffect(() => {
        getParking();
    }, [id]);

    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedSpot, setSelectedSpot] = useState(null);

    const handleFloorChange = (event) => {
        setSelectedFloor(event.target.value);
    };

    const handleSpotChange = (event) => {
        if (event.target.getAttribute('spotstatus') === "true") {
            setSelectedSpot(event.target.id);
        } else {
            setSelectedSpot(null);
        }
        console.log(selectedFloor, selectedSpot, reservationTime);
    };

    const selectedSpots = spot.find(floor => floor.floor_name === selectedFloor)?.slots || [];
    let half = Math.floor(selectedSpots.length / 2);

    if (half % 2 !== 0) {
        half += 1;
    }

    const firstHalf = selectedSpots.slice(0, half);
    const secondHalf = selectedSpots.slice(half);

    const [reservationTime, setReservationTime] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleReservation = async (e) => {
        e.preventDefault();

        if (!selectedFloor || !selectedSpot || !reservationTime) {
            setErrorMessage("Please select a floor, slot, and time.");
            return;
        }

        const requestData = {
            parking_slot_id: parseInt(selectedSpot),
            reserve_time: reservationTime,
        };

        try {
            const res = await postReservation(requestData);
            if (res.message === "Reservation created successfully!") {
                const resData = res;
                // const qrData = JSON.stringify({
                //     reservationId: resData.reservation_id,
                //     floorName: currentFloor.floor_name,
                //     slotName: currentFloor.slots.find(
                //         (slot) => slot.slot_id === selectedSlot
                //     ).slot_name,
                //     reserveTime: reservationTime,
                // });
                alert("Reservation created successfully!");
                navigate("/parking/process", {
                    state: {
                        ...resData,
                        time: reservationTime,
                        // qrCodeData: qrData,
                    },
                });
            } else {
                setErrorMessage("Failed to reserve slot. Please try again.");
            }
        } catch (error) {
            console.error("Error reserving slot:", error);
            setErrorMessage(
                error.response?.data?.error || "An error occurred. Please try again."
            );
        }
    };

    return (
        <>
            <div className="flex flex-col w-full sm:min-w-96 shadow-md drop-shadow-lg rounded-2xl bg-white mt-5">
                <div className="flex justify-end items-center mt-5 mr-5">
                    <button onClick={closeRespop} className="bg-red-500 px-2 py-1 rounded-full text-white text-xs hover:bg-red-600">x</button>
                </div>
                <div className="flex flex-col justify-center items-center mt-6 gap-6">
                    <h1 className="text-2xl font-bold mx-4">{name}</h1>
                    <img src={img} className="flex w-11/12 h-36 justify-center bg-gray-200 rounded-xl"></img>
                </div>

                <div className="flex flex-col m-10 gap-8">
                    <div className="flex justify-between">
                        <select
                            className="bg-red-500 w-32 text-white font-thin pl-2 py-2 rounded-lg shadow-sm drop-shadow-md"
                            onChange={handleFloorChange}
                        >
                            {parking[0]?.floors.map((floor) => (
                                <option key={floor.floor_id} value={floor.floor_name}>{floor.floor_name}</option>
                            ))}
                        </select>
                        <input
                            className="w-32 py-2 px-4 rounded-lg shadow-md bg-gray-100 focus:outline-none"
                            type="time"
                            value={reservationTime}
                            onChange={(e) => setReservationTime(e.target.value)}
                        />
                    </div>

                    <h1 className={`ml-2 text-sm ${half >= 1 ? 'visible' : 'invisible'}`}>ENTRY</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-x-8" onClick={handleSpotChange}>
                        <button className="grid grid-cols-2 col-span-1">
                            {firstHalf.map((key) => (
                                <Spot key={key.slot_id} spotid={key.slot_id} spotname={key.slot_name} status={key.slot_status} selected={key.slot_id === selectedSpot} />
                            ))}
                        </button>
                        <button className="grid grid-cols-2 col-span-1 mt-10 md:mt-0">
                            {secondHalf.map((key) => (
                                <Spot key={key.slot_id} spotid={key.slot_id} spotname={key.slot_name} status={key.slot_status} selected={key.slot_id === selectedSpot} />
                            ))}
                        </button>
                    </div>
                    <h1 className={`flex justify-end pr-2 text-sm w-full ${half >= 1 ? 'visible' : 'invisible'}`}>EXIT</h1>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        {errorMessage && (
                            <p className="text-xs text-red-600">*{errorMessage}*</p>
                        )}
                        <button onClick={handleReservation} className="w-32 py-2 bg-red-500 rounded-md text-white font-light text-sm hover:bg-red-600 active:bg-red-700">CONTINUE</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ParkingSpot;