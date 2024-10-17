import  { useState, useRef } from 'react';
import Reserpop from '../Reservation/Reserpop';

function Reserbut() {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const reserveRef = useRef(null);

    const toggleComponent = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const handleClickOutside = (event) => {
        if (reserveRef.current && !reserveRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    return (
        <>
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

            {isComponentVisible && (
                <div 
                    className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-50"
                    onClick={handleClickOutside}
                >
                    <div ref={reserveRef} className="relative z-50">
                        <Reserpop />
                    </div>
                </div>
            )}
        </>
    );
}

export default Reserbut;
