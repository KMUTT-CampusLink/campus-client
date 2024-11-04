import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ResPop from '../ResPop';
///rwrwerwerwerewrwrewrwerwer
function Searchresult({ result }) {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const reserveRef = useRef(null);
//sdsdsd
    const toggleComponent = () => {
        setIsComponentVisible((prev) => !prev);
    };

    const handleClose = () => {
        setIsComponentVisible(false);
    };

    return (
        <>
            <button className="bg-white max-w-2xl hover:bg-gray-200 py-2 px-28 text-smr" onClick={toggleComponent}>{result.name}</button>

            {isComponentVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div ref={reserveRef} className="relative z-50" onClick={(e) => e.stopPropagation()}>
                        <ResPop id={result.id} name={result.name} img={result.building_img} onClose={handleClose}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Searchresult;
