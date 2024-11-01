import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Building({ bdimg, bdname, avaslot }) {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const reserveRef = useRef(null);
    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await Axios.get("http://localhost:3000/api/parking/getAllBuildings");
        setData(res.data);
    }

    const toggleComponent = () => {
        setIsComponentVisible((prev) => !prev);
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="flex items-center min-w-96 min-h-44 bg-white rounded-lg shadow-gray shadow-xl p-0 my-10">
                <img src={bdimg} className="w-60 h-44 mr-3 rounded-lg" />

                <div className="flex flex-row w-full justify-between rounded-lg">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold ">{bdname}</h2>
                        <p className="text-green-600 font-semibold">Available Slot: {avaslot}</p>
                    </div>
                    <button
                        className="flex bg-red-500 text-white w-10 h-10 mr-2 rounded-full justify-center"
                        onClick={toggleComponent}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 mt-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isComponentVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div ref={reserveRef} className="relative z-50" onClick={(e) => e.stopPropagation()}>
                        <>
                            <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
                                <div className="bg-white min-w-96 w-3/5 max-h-2/5 pb-24 rounded-2xl shadow-2xl">
                                    <div className='w-full flex justify-end pr-4 pt-2'>
                                        <button onClick={toggleComponent}>
                                            <FontAwesomeIcon className='w-6 h-6' icon={faCircleXmark} />
                                        </button>
                                    </div>
                                    <div className='flex flex-row justify-evenly gap-10'>
                                        <div className='flex flex-col items-center justify-evenly'>
                                            <img className='mt-10 w-64 h-64' src={bdimg} alt="" />
                                            <div className="w-56 mt-5"><div className='flex flex-row gap-2 mb-10 px-6 py-2 text-black rounded-lg shadow-2xl shadow-black'>
                                                <FontAwesomeIcon className=' w-6 h-6 text-red-500' icon={faCircleCheck} />
                                                Your Car is Verified
                                            </div></div>

                                        </div>

                                        <div className='flex flex-col items-start justify-evenly'>
                                            <div>

                                                <div className="text-2xl font-bold">Lx Building</div>

                                                <br />
                                                <div className="font-medium">
                                                    Located beside the libary
                                                </div>
                                            </div>
                                            <form>
                                                <div className="flex flex-col gap-6 ">
                                                    <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
                                                        <option value="">FLOOR</option>
                                                        <option value="">1st Floor (24/30)</option>
                                                        <option value="">2nd Floor (24/30)</option>
                                                        <option value="">3rd Floor (30/30)</option>
                                                        <option value="">4th Floor (15/15)</option>
                                                    </select>
                                                    <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
                                                        <option value="">POSITION</option>
                                                        <option value="">A01</option>
                                                        <option value=""> A02</option>
                                                        <option value=""> A03</option>
                                                        <option value=""> B01</option>
                                                    </select>

                                                </div>
                                            </form>


                                            <button className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition">
                                                RESERVE
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </>
                    </div>
                </div>
            )}
        </>
    );
}

export default Building;
