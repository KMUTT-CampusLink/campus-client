import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Helpbut() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/parking/help');
    };
    return (
        <>
        <div className="flex flex-col items-center">
            <button className="bg-red-500 text-white p-5 rounded-full"
              onClick={handleClick}>
            <FontAwesomeIcon className="w-6 h-6" icon={faQuestion} />
            </button>
            <h1>Help</h1>
        </div>
        

        </>
    )
}

export default Helpbut;