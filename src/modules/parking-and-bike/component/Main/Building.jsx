import { useState, useRef, useEffect } from 'react';
import ResPop from '../ResPop';

function Building({ bdid , bdimg, bdname, avaslot }) {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const reserveRef = useRef(null);

    const toggleComponent = () => {
        setIsComponentVisible((prev) => !prev);
    };

    const handleClose = () => {
        setIsComponentVisible(false);
    };

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
                        <ResPop id={bdid} name={bdname} img={bdimg} onClose={handleClose}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Building;