import NavBar from '../../registration/components/NavBarComponents/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Loading from '../component/Loading';
import { postCheckin } from '../services/api.js';
import { useState, useEffect } from 'react';

function ScanIn() {
    const { id } = useParams();
    const { reservation_id, QRCode } = JSON.parse(decodeURIComponent(id));
    const [statusCheck, setStatusCheck] = useState("loading");
    const [error, setError] = useState("");
    const checkin_time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    if (!reservation_id || !QRCode) {
        return (
            <Loading />
        )
    }
    
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/parking');
    }

    const handleCheck = async () => {
        const requestData = {
            qrcode: QRCode,
            reservation_id: reservation_id,
            checkin_time: checkin_time,
        };

        try {
            const res = await postCheckin(requestData);
            if (res.message === "QR Checkout created successfully!") {
                setStatusCheck("done");
                return;
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
                alert(error.response.data.error);
            } else {
                setError(error.message);
                alert(error.message);
            }
            setStatusCheck("error");
            alert(error);
        }
    }

    useEffect(() => {
        if (reservation_id && QRCode && checkin_time) {
          const checkTimeout = setTimeout(() => {
            handleCheck();
          }, 1500);
          
          return () => clearTimeout(checkTimeout);
        }
    }, [reservation_id && QRCode && checkin_time]);

    return (
        <>
            <NavBar />
            <div className="flex w-full h-screen justify-center items-center flex-col gap-10">
                <div className='flex flex-col justify-center items-center w-80 sm:w-96 border border-gray-300 rounded-3xl gap-4 py-8'>
                    {statusCheck === 'loading' ? (
                        <>
                            <h1 className='flex items-center px-4 py-4 rounded-full bg-yellow-100'>
                                <FontAwesomeIcon className="w-4 h-4 text-white bg-yellow-500 p-2 rounded-full animate-spin" icon={faSpinner} />
                            </h1>
                            <h2 className='text-xl font-bold text-gray-700'>Loading..</h2>
                        </>
                    ) : statusCheck === 'done' ? (
                        <>
                            <h1 className='flex items-center px-4 py-4 rounded-full bg-green-100'>
                                <FontAwesomeIcon className="w-4 h-4 text-white bg-green-600 p-2 rounded-full" icon={faCheck} />
                            </h1>
                            <h2 className='text-xl font-bold text-gray-700'>Scan Success!</h2>
                        </>
                    ) : statusCheck === 'error' ? (
                        <>
                            <h1 className='flex items-center px-4 py-4 rounded-full bg-red-100'>
                                <FontAwesomeIcon className="w-4 h-4 text-white bg-red-600 p-2 rounded-full" icon={faXmark} />
                            </h1>
                            <h2 className='text-xl font-bold text-gray-700'>Scan Failed!</h2>
                        </>
                    ) : null}
                    <hr className='w-72 border-1 my-5' />
                    <div className='flex flex-row justify-between w-72'>
                        <div className='flex flex-col text-sm text-gray-500 font-medium gap-4'>
                            <h1>Transaction ID</h1>
                            <h2>Time</h2>
                        </div>
                        <div className='flex flex-col min-w-fit items-end text-sm font-medium gap-4'>
                            <h1>{reservation_id}</h1>
                            <h2>{checkin_time}</h2>
                        </div>
                    </div>
                    <hr className='w-72 border-1 border-dashed my-5' />
                </div>
                <div>

                </div>
                <button onClick={handleBack} className="px-14 py-3 bg-red-500 rounded-md text-white font-light text-xs hover:bg-red-600 active:bg-red-700">BACK</button>
            </div>

        </>
    )
}

export default ScanIn;