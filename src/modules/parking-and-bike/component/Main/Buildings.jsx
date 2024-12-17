import { useState } from 'react';
import ParkingSpot from '../../page/ParkingSpot';

function Buildings({ bdid, bdimg, bdname, avaslot }) {
    const [isComponentVisible, setIsComponentVisible] = useState(false);

    const toggleComponent = () => {
        setIsComponentVisible((prev) => !prev);
    };

    const handleClose = () => {
        setIsComponentVisible(false);
    };

    return (
        <>
            <div className='flex flex-row w-72 sm:w-6/12 shadow-md drop-shadow-md rounded-2xl gap-2'>
                <img src={bdimg} className='flex w-28 md:w-44 h-20 min-h-fit md:h-32 bg-gray-200 rounded-xl'></img>

                <div className='flex w-full justify-between'>
                    <div className='flex flex-col justify-around'>
                        <h1 className='text-sm sm:text-lg'>{bdname}</h1>
                        <p className={`text-xs sm:text-base ${avaslot === 0 ? 'text-red-500' : 'text-green-500'}`}>Available Slot: {avaslot} </p>
                    </div>
                    <div className='flex items-center justify-center mr-4'>
                        <button onClick={toggleComponent} className='bg-red-500 px-2 py-px rounded-full text-white hover:bg-red-600 active:bg-red-700'>&gt;</button>
                    </div>
                </div>

            </div>

            {isComponentVisible && (
                <div className="fixed inset-0 z-10 min-h-full h-full flex justify-center items-center bg-black bg-opacity-50 py-10">
                    <div className="max-h-full overflow-y-scroll my-8">
                        <ParkingSpot id={bdid} name={bdname} img={bdimg} onClose={handleClose} />
                    </div>
                </div>
            )}

        </>
    );
}

export default Buildings;