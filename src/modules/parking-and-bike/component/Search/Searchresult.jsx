import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ParkingSpot from '../../page/ParkingSpot.jsx';

function SearchResult({ result }) {
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
            <button className="text-sm w-64 md:w-80 bg-white shadow-md drop-shadow-md max-w-2xl hover:bg-gray-200 py-2" onClick={toggleComponent}>{result.name}</button>

            {isComponentVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div ref={reserveRef} className="relative z-50" onClick={(e) => e.stopPropagation()}>
                        <ParkingSpot id={result.id} name={result.name} img={result.building_img} onClose={handleClose}/>
                    </div>
                </div>
            )}
        </>
    ); 
}

export default SearchResult;
