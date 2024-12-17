import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ProcessButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
    if (checkoutData) {
      navigate('/parking/checking', { state: checkoutData });
    } else {
      navigate('/parking/checking');
    }
  };

  return (
    <>
      <button className='flex flex-col items-center gap-2' onClick={handleClick}>
        <div className='flex justify-center items-center bg-red-500 w-14 h-14 rounded-full'>
          <FontAwesomeIcon className="w-8 h-7 hover:w-9 hover:h-8 text-white" icon={faReceipt} />
        </div>
        <p1 className="text-xs">
          CheckIn/Out
        </p1>
      </button>
    </>
  );
}

export default ProcessButton;
