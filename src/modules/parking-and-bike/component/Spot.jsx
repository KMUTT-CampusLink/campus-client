import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

function Spot({ spotid, spotname, status }) {
    const spotInt = parseInt(spotname.match(/\d+/)[0], 10);
    
    return (
        <>
            <button
                className={`flex justify-between items-center px-4 md:w-32 sm:w-28 w-24 border-y border-dashed h-14 hover:bg-gray-50 ${status === true ? 'focus:bg-gray-200' : 'bg'} ${spotInt % 2 !== 0 ? 'border-r border-dashed' : ''}`}
                id={spotid}
                spotstatus={status.toString()}
            >
                <p className="transform -rotate-90 text-xs text-gray-600">{spotname}</p>
                {status === true ? '' : <FontAwesomeIcon icon={faCar} />}
            </button>
        </>
    );
}

export default Spot;