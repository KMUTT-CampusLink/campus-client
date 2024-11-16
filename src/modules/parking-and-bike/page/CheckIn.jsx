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

    console.log(resEncrypt);

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

    console.log(qrCodeUrl);

    return (
        <>
            <NavBar />
            {/* Background image container */}
            <div className="fixed inset-0 z-0 flex justify-center mt-20 mb-20">
                <img
                    src={image}
                    alt="Receipt Background"
                    className="min-h-screen object-cover opacity-30 drop-shadow-2xl"
                />
            </div>

            <div className="relative flex flex-col justify-center items-center min-h-screen pt-20 z-10 p-4">
                <FontAwesomeIcon className="absolute top-24 w-20 h-20 text-green-500" icon={faCircleCheck} />
                <div className="flex flex-col justify-center items-center pt-20">
                    <h1 className="text-2xl font-bold text-black text-center">BOOKING SUCCESSFUL!</h1>
                    <p className="text-red-600 mt-5 text-xs text-center">QR Expires in: {countdown}</p>
                    <div className="border-4 border-yellow-500 mt-5 p-1 rounded-md bg-gray-400">
                        {isQrCodeValid ? (
                            <QRCode
                                value={qrCodeUrl}
                                size={96}
                            />
                        ) : (
                            <p className="text-red-600 text-center">QR Code has expired.</p>
                        )}
                    </div>
                    <div className="flex flex-col text-sm justify-center mt-10 items-center gap-5 font-semibold text-black text-center">
                        <p>FLOOR - {resData.floor_name}</p>
                        <p>POSITION - {resData.slot_name}</p>
                        <p>EXPIRE DATE - {expireTime.toLocaleDateString()}</p>
                        <p>EXPIRE TIME - {expireTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="text-3xl font-bold text-orange-400 mt-10 gap-4 flex flex-col items-center text-center">
                        <h1>License Number</h1>
                        <h1>{resData.license_no}</h1>
                    </div>
                </div>

                <button
                    onClick={handleClick}
                    className="bg-red-500 text-white px-12 py-2 mt-10 rounded-lg hover:bg-red-600 transition z-10"
                >
                    HOME
                </button>
            </div>
        </>
    );
}

export default CheckIn;