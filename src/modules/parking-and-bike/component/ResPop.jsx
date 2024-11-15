import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ResPop({ id, img, name, onClose }) {
    const [parking, setParking] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reservationTime, setReservationTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const closeRespop = () => {
        if (onClose) {
            onClose();
        }
    };

    const getParking = async () => {
        try {
            const res = await Axios.get(`http://localhost:3000/api/parking/getBuildingById/${id}`);
            setParking(res.data);

            if (res.data && res.data.length > 0 && res.data[0].floors.length > 0) {
                setSelectedFloor(res.data[0].floors[0].floor_id);
            }
        } catch (error) {
            console.error("Error fetching parking data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getParking();
        }
    }, [id]);

    useEffect(() => {
        if (selectedFloor !== null) {
            const currentFloor = parking[0]?.floors.find(floor => floor.floor_id === selectedFloor);
            if (currentFloor && currentFloor.slots.length > 0) {
                setSelectedSlot(currentFloor.slots[0].slot_id);
            } else {
                setSelectedSlot(null);
            }
        }
    }, [selectedFloor, parking]);

    if (!parking.length) return <p>Loading...</p>;

    const currentFloor = parking[0]?.floors.find(floor => floor.floor_id === selectedFloor);

    const handleReservation = async (e) => {
        e.preventDefault();

        if (!selectedFloor || !selectedSlot || !reservationTime) {
            setErrorMessage("Please select a floor, slot, and time.");
            return;
        }

        const requestData = {
            car_id: 1001,
            parking_slot_id: selectedSlot,
            reserve_time: reservationTime
        };

        try {
            const res = await Axios.post('http://localhost:3000/api/parking/postReservation', requestData);
            if (res.data.message === 'Reservation created successfully!') {
                const resData = res.data;
                const qrData = JSON.stringify({
                    reservationId: resData.reservation_id,
                    floorName: currentFloor.floor_name,
                    slotName: currentFloor.slots.find(slot => slot.slot_id === selectedSlot).slot_name,
                    reserveTime: reservationTime
                });
                alert("Reservation successful!");
                navigate('/parking/checkin', {
                    state: {
                        ...resData,
                        qrCodeData: qrData,
                        floor_name: currentFloor.floor_name,
                        slot_name: currentFloor.slots.find(slot => slot.slot_id === selectedSlot).slot_name
                    }
                });
            } else {
                setErrorMessage("Failed to reserve slot. Please try again.");
            }
        } catch (error) {
            console.error("Error reserving slot:", error);
            setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg md:max-w-2xl lg:max-w-3xl mx-4 p-6 md:p-10 rounded-3xl shadow-2xl">
                <div className="w-full flex justify-end">
                    <button onClick={closeRespop}>
                        <FontAwesomeIcon className="w-6 h-6" icon={faCircleXmark} />
                    </button>
                </div>
                <div className="flex flex-col justify-around md:flex-row items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-center">
                        <img className="w-40 h-40 md:w-72 md:h-48 object-cover rounded-lg aspect-square" src={img} alt="Building" />
                        <div className="mt-4 md:mt-6 flex items-center gap-2 text-black font-semibold px-3 py-2 rounded-lg shadow-md">
                            <FontAwesomeIcon className="w-4 h-4 md:w-5 md:h-5 text-red-500" icon={faCircleCheck} />
                            <span>Your Car is verified</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-start w-full md:w-auto items-center">
                        <div className="text-center md:text-left">
                            <div className="text-xl md:text-2xl font-bold">{name}</div>
                            <div className="font-medium mt-2">Located beside the library</div>
                        </div>
                        <form onSubmit={handleReservation} className="mt-6 flex flex-col gap-4 ">
                            <select
                                className="py-2 px-4 rounded-lg shadow-md bg-gray-100 focus:outline-none"
                                value={selectedFloor}
                                onChange={(e) => setSelectedFloor(Number(e.target.value))}
                            >
                                {parking[0]?.floors.map((floor) => (
                                    <option key={floor.floor_id} value={floor.floor_id}>
                                        {floor.floor_name} ({floor.floor_capacity - floor.floor_reserved_slots}/{floor.floor_capacity})
                                    </option>
                                ))}
                            </select>

                            <select
                                className="py-2 px-4 rounded-lg shadow-md bg-gray-100 focus:outline-none"
                                value={selectedSlot}
                                onChange={(e) => setSelectedSlot(Number(e.target.value))}
                            >
                                {currentFloor?.slots.map((slot) => (
                                    <option key={slot.slot_id} value={slot.slot_id}>
                                        {slot.slot_name} {slot.slot_status ? "(Available)" : "(Unavailable)"}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="py-2 px-4 rounded-lg shadow-md bg-gray-100 focus:outline-none"
                                type="time"
                                value={reservationTime}
                                onChange={(e) => setReservationTime(e.target.value)}
                            />
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

                            <button
                                type="submit"
                                className="bg-red-500 mt-4 text-white w-full md:w-auto py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                RESERVE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResPop;