import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faP } from '@fortawesome/free-solid-svg-icons';

function ParkingButton() {
    return (
        <>

            <div className="flex flex-col items-center">
                <button className="bg-red-500 text-white font-extrabold p-5 rounded-full">
                    <FontAwesomeIcon className="w-6 h-6" icon={faP} />
                </button>
                <h1>Parking</h1>
            </div>

        </>
    )
}

export default ParkingButton;