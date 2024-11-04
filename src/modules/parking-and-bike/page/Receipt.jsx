import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from 'react-qr-code';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import image from "../img/Receiptimage.png"; 

function Receipt() {
    const navigate = useNavigate();
    const location = useLocation();
    const { car_id, parking_slot_id, reserve_time } = location.state || {};

    const handleClick = () => {
        navigate('/parking');
    };

    return (
        <>
            <NavBar />
            {/* Background image container */}
            <div className="fixed inset-0 z-0">
                <img 
                    src={image} 
                    alt="Receipt Background" 
                    className="w-full h-full object-cover opacity-30" 
                />
            </div>

            {/* Content overlay */}
            <div className="relative flex flex-col justify-center items-center min-h-screen pt-20 z-10 bg-black bg-opacity-50">
                <FontAwesomeIcon className="mt-3 w-20 h-20 text-green-500" icon={faCircleCheck} />
                <div className="flex flex-col justify-center items-center pt-20">
                    <h1 className="text-2xl font-bold text-white">BOOKING SUCCESSFUL!</h1>
                    <p className="text-red-600 mt-5 text-xs">QR Expire in: 01:00:00</p>
                    <div className="border-4 border-yellow-500 mt-5 p-0 rounded-md bg-white">
                        <QRCode 
                            value={`car_id: ${car_id}, parking_slot_id: ${parking_slot_id}, reserve_time: ${reserve_time}`} 
                            size={96} 
                        />
                    </div>
                    <div className="flex flex-col text-sm justify-center mt-10 items-center gap-5 font-semibold text-white">
                        <p>FLOOR - 4th Floor</p>
                        <p>POSITION - A01</p>
                        <p>EXPIRE DATE - 25/02/2025</p>
                        <p>EXPIRE TIME - 03:00 PM</p>
                    </div>
                    <div className="text-3xl font-bold text-orange-400 mt-10 gap-4 flex flex-col items-center">
                        <h1>License Number</h1>
                        <h1>4A-5279</h1>
                    </div>
                </div>

                <button 
                    onClick={handleClick} 
                    className="bg-red-500 text-white px-12 py-2 mt-10 rounded-lg hover:bg-red-600 transition z-10"
                >
                    CONTINUE
                </button>
            </div>
        </>
    );
}

export default Receipt;
