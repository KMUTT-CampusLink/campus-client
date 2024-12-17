import NavBar from '../../registration/components/NavBarComponents/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/parking'); 
            alert('Loading Timeout! No data found.');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <NavBar />
            <div className='flex justify-center items-center w-full h-screen'>
                <FontAwesomeIcon className="text-5xl text-red-500 animate-spin" icon={faSpinner} />
            </div>
        </>
    )
}

export default Loading;