import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ParkingButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/parking/history');
    };

    return (
        <>
            <button className='flex flex-col items-center gap-2' onClick={handleClick}>
                <div className='flex justify-center items-center bg-red-500 w-14 h-14 rounded-full'>
                    <FontAwesomeIcon className="w-8 h-7 hover:w-9 hover:h-8 text-white" icon={faClockRotateLeft} />
                </div>
                <p1 className="text-xs">
                    History
                </p1>
            </button>
        </>
    )
}

export default ParkingButton;