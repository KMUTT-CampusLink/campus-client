import NavBar from "../../registration/components/NavBarComponents/NavBar";
import receiptimg from "../img/receiptimg.png";
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Loading from "../component/Loading";
import { getCheckingData } from "../services/api";
import { use } from "react";

function Checking() {
    const [checking, setCheckingData] = useState([]);

    const naviagte = useNavigate();
    const handleClick = () => {
        naviagte('/parking');
    }

    const getChecking = async () => {
        try {
            const res = await getCheckingData();
            setCheckingData(res)
        } catch (error) {
            console.error('Error getting history:', error);
        }
    }

    useEffect(() => {
        getChecking();
    }, []);

    const convertTimeFormat = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}:00`;
    };
    
    const calculateRemainingTime = (expireTime) => {
        const now = new Date();
        const expireDate = new Date(now.toDateString() + ' ' + convertTimeFormat(expireTime));
        const diff = expireDate - now;
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return `${minutes}m ${seconds}s`;
    };
    
    const [remainingTime, setRemainingTime] = useState('');
    
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime(checking.expire_time));
        }, 1000);
    
        return () => clearInterval(timer);
    }, [checking.expire_time]);

    if (checking.length === 0) {
        return (
            <Loading />
        )
    }

    let qrCodeUrl = ``;

    if (checking.step === 'checkin') {
        qrCodeUrl = `${window.location.origin}/parking/scanin/${encodeURIComponent(JSON.stringify({ reservation_id: checking.reservation_id, QRCode: checking.QRCode }))}`;
    } else {
        qrCodeUrl = `${window.location.origin}/parking/scanout/${encodeURIComponent(JSON.stringify({ reservation_id: checking.reservation_id, QRCode: checking.QRCode }))}`;
    }

    console.log(qrCodeUrl);

    return (
        <>
            <NavBar />
            <div className="flex flex-col w-full h-screen justify-center items-center">
                <div className="flex flex-col justify-center items-center w-96 inner-shadow-md bg-white rounded-md gap-10 py-20"
                    style={{
                        backgroundImage: `url(${receiptimg})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center'
                    }}>
                    <h1 className="text-4xl font-bold">{checking.step ? checking.step.toUpperCase() : ''}</h1>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <p className={`text-red-600 text-xs ${checking.step === 'checkout' ? 'invisible' : 'visible'}`}>QR Expiring in: {remainingTime}</p>
                        <QRCode value={qrCodeUrl} size={84} className="border-4 border-orange-400 rounded-md" />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 text-xs">
                        <p>Floor - {checking.floor_name}</p>
                        <p>Position - {checking.slot_name}</p>
                        <p className={`${checking.step === 'checkout' ? 'invisible' : 'visible'}`}>Expire Time - {checking.expire_time}</p>
                        <p className={`${checking.step === 'checkout' ? 'visible' : 'invisible'}`}>Parking Until - {checking.parking_until}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 text-xl text-orange-500 font-bold">
                        <h1>LICENSE NO</h1>
                        <h1 className="text-3xl">{checking.license_no}</h1>
                    </div>
                </div>

                <button onClick={handleClick} className="px-14 py-2 bg-red-500 rounded-md text-white font-light text-xs hover:bg-red-600 active:bg-red-700">BACK</button>
            </div>
        </>
    )
}

export default Checking;