import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-qr-code';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import image from "../img/Receiptimage.png";

function CheckIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const resData = location.state;

    if (!resData) {
        return (
            <>
                <NavBar />
            </>
        );
    }

    const resEncrypt = JSON.stringify({
        qr: resData.QRCode,
        rid: resData.reservation_id,
    });

    const [countdown, setCountdown] = useState('');
    const [isQrCodeValid, setIsQrCodeValid] = useState(true);

    const expireTime = new Date(resData.expire_time);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = expireTime - now;

            if (difference <= 0) {
                setCountdown("Expired");
                setIsQrCodeValid(false);
            } else {
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown(`${hours}h ${minutes}m ${seconds}s`);
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [expireTime]);

    const handleClick = () => {
        navigate('/parking');
    };

    const qrCodeUrl = `${window.location.origin}/parking/scanned/${encodeURIComponent(resEncrypt)}`;

    return (
        <>
            <NavBar />
            <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100">
                <div className="relative z-10 max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center bg-white rounded-lg shadow-lg px-4 py-8">
                    <FontAwesomeIcon className="w-20 h-20 text-green-500 mb-5" icon={faCircleCheck} />
                    <h1 className="text-2xl font-bold text-black text-center">BOOKING SUCCESSFUL!</h1>
                    <p className="text-red-600 mt-5 text-xs text-center">QR Expires in: {countdown}</p>
                    <div className="border-4 border-yellow-500 mt-5 p-2 rounded-md bg-gray-400">
                        {isQrCodeValid ? (
                            <QRCode value={qrCodeUrl} size={128} />
                        ) : (
                            <p className="text-red-600 text-center">QR Code has expired.</p>
                        )}
                    </div>
                    <div className="flex flex-col text-sm text-center font-semibold text-black mt-5 space-y-2">
                        <p>BUILDING - {resData.building_name}</p>
                        <p>FLOOR - {resData.floor_name}</p>
                        <p>POSITION - {resData.slot_name}</p>
                        <p>EXPIRE DATE - {expireTime.toLocaleDateString()}</p>
                        <p>EXPIRE TIME - {expireTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="text-center text-3xl font-bold text-orange-400 mt-5">
                        <h1>License Number</h1>
                        <h1>{resData.license_no}</h1>
                    </div>
                    <button
                        onClick={handleClick}
                        className="bg-red-500 text-white w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 mt-8 rounded-lg hover:bg-red-600 transition"
                    >
                        CONTINUE
                    </button>
                </div>
                <img
                    src={image}
                    alt="Receipt Background"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
                />
            </div>
        </>
    );
}

export default CheckIn;
