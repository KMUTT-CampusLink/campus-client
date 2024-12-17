import NavBar from '../../registration/components/NavBarComponents/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../component/Loading';

function Process() {
    const navigate = useNavigate();
    const location = useLocation();
    const resData = location.state;

    if(!resData) {
        return (
            <Loading/>
        )
    }

    const handleBack = () => {
        navigate('/parking');
    }

    return (
        <>
            <NavBar />
            <div className="flex w-full h-screen justify-center items-center flex-col gap-10">
                <div className='flex flex-col justify-center items-center w-80 sm:w-96 border border-gray-300 rounded-3xl gap-4 py-8'>
                    <h1 className='flex items-center px-4 py-4 rounded-full bg-green-100'>
                        <FontAwesomeIcon className="w-4 h-4 text-white bg-green-600 p-2 rounded-full" icon={faCheck} />
                    </h1>
                    <h1 className='text-xl font-bold text-gray-700'>Booking Success!</h1>
                    <hr className='w-72 border-1 my-5' />
                    <div className='flex flex-row justify-between w-72'>
                        <div className='flex flex-col text-sm text-gray-500 font-medium gap-4'>
                            <h1>Transaction ID</h1>
                            <h2>Time</h2>
                            <h3>Floor</h3>
                            <h3>Position</h3>
                        </div>
                        <div className='flex flex-col min-w-fit items-end text-sm font-medium gap-4'>
                            <h1>{resData.reservation_id}</h1>
                            <h2>{resData.time}</h2>
                            <h3>{resData.floor_name}</h3>
                            <h4>{resData.slot_name}</h4>
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

export default Process;