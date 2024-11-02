import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function ResPop({ id, img, name, onClose }) {
    const [parking, setParking] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);

    const closeRespop = () => {
        if (onClose) {
            onClose();
        }
    };

    const getParking = async () => {
        const res = await Axios.get(`http://localhost:3000/api/parking/getBuildingById/${id}`);
        setParking(res.data);

        if (res.data && res.data.length > 0 && res.data[0].floors.length > 0) {
            setSelectedFloor(res.data[0].floors[0].floor_id);
        }
    };

    useEffect(() => {
        if (id) {
            getParking();
        }
    }, [id]);

    if (!parking.length) return <p>Loading...</p>;

    const currentFloor = parking[0]?.floors.find(floor => floor.floor_id === selectedFloor);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
            <div className="bg-white min-w-96 w-3/5 pb-24 rounded-2xl shadow-2xl">
                <div className='w-full flex justify-end pr-4 pt-2'>
                    <button onClick={closeRespop}>
                        <FontAwesomeIcon className='w-6 h-6' icon={faCircleXmark} />
                    </button>
                </div>
                <div className='flex flex-row justify-evenly'>
                    <div className='flex flex-col justify-center items-center'>
                        <img className='mt-10 w-64 h-64' src={img} alt="" />
                        <div className="w-48">
                            <div className='flex flex-row fixed gap-2 mb-10 px-3 py-2.5 text-black rounded-lg shadow-2xl shadow-black'>
                                <FontAwesomeIcon className=' w-6 h-6' icon={faCircleCheck} />
                                Your Car is Verified
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-start justify-evenly'>
                        <div>
                            <div className="text-2xl font-bold">{name}</div>
                            <br />
                            <div className="font-medium">
                                Located beside the library
                            </div>
                        </div>
                        <form>
                            <div className="flex flex-col gap-6">
                                <select
                                    className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2"
                                    value={selectedFloor}
                                    onChange={(e) => setSelectedFloor(Number(e.target.value))}
                                >
                                    {parking[0]?.floors?.map((floor) => (
                                        <option key={floor.floor_id} value={floor.floor_id}>
                                            {floor.floor_name} (Slots Available: {floor.slots.length})
                                        </option>
                                    ))}
                                </select>

                                <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
                                    {currentFloor?.slots.map((slot) => (
                                        <option key={slot.slot_id} value={slot.slot_id}>
                                            {slot.slot_name} {slot.slot_status ? "(Available)" : "(Occupied)"}
                                        </option>
                                    ))}
                                </select>

                                <input className='py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2' type="time" name="" id="" />
                            </div>
                        </form>

                        <button className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition">
                            RESERVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResPop;
