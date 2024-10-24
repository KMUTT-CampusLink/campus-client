import  { useState, useRef } from 'react';
import Reserpop from '../Reservation/Reserpop';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                className="flex bg-red-500 text-white w-10 h-10 mr-2 rounded-full justify-center items-center"
                onClick={toggleComponent}
            >
                <FontAwesomeIcon className="w-6 h-6" icon={faChevronRight} />
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
