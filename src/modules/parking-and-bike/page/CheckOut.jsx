import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-qr-code';
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import image from "../img/Receiptimage.png"

function CheckOut() {
    const navigate = useNavigate();
    const location = useLocation();
    const resData = location.state; // Retrieve the data passed from the Scanned component
    const [data, setData] = useState(null);
    const [isQrCodeValid, setIsQrCodeValid] = useState(true);
    useEffect(() => {
      if (resData) {
        setData(resData); // Store the data in state if it exists
      }
    }, [resData]);
  
    if (!data) {
      return <div>Loading...</div>;
    }
    const handleClick = () => {
        navigate('/parking');
    };
    const resEncrypt = JSON.stringify({
        qr: resData.QRCode,
        rid: resData.reservation_id,
    });
    const qrCodeUrl = `${window.location.origin}/parking/scanned/${encodeURIComponent(resEncrypt)}`;

    console.log(qrCodeUrl);
    return (
        <>
            <NavBar />
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
                    <h1 className="text-2xl font-bold text-black text-center">CHECKOUT</h1>
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

export default CheckOut;
