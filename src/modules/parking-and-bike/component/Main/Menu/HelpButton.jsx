import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function HelpButton() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking/help');
  };
    return (
        <>
            <div className="flex flex-col items-center">
                <button
                onClick={handleClick}
                 className="bg-red-500 text-white p-5 rounded-full">
                    <FontAwesomeIcon className="w-9 h-8" icon={faQuestion} />
                </button>
                <h1>Help</h1>
            </div>


        </>
    )
}

export default HelpButton;