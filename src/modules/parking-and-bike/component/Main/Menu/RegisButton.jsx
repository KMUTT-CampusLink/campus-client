import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function RegisButton() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking/regis');
  };
    return (
        <>
            <div className="flex flex-col items-center">
                <button
                onClick={handleClick}
                 className="bg-red-500 text-white p-5 rounded-full">
                    <FontAwesomeIcon className="w-9 h-8" icon={faUser} />
                </button>
                <h1>Register</h1>
            </div>


        </>
    )
}

export default RegisButton;