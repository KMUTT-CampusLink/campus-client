import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faP } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function ParkingButton() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking/parkingslot');
  };
    return (
        <>

            <div className="flex flex-col items-center">
                <button 
                 onClick={handleClick}
                className="bg-red-500 text-white font-extrabold p-5 rounded-full">
                    <FontAwesomeIcon className="w-9 h-8" icon={faP} />
                </button>
                <h1>Parking</h1>
            </div>

        </>
    )
}

export default ParkingButton;