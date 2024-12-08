import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ReceiptButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
    if (checkoutData) {
      // Navigate to CheckOut if data exists
      navigate('/parking/checkout', { state: checkoutData });
    } else {
      // Navigate to CheckIn if no checkout data
      navigate('/parking/checkin');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleClick}
        className="bg-red-500 text-white p-5 rounded-full">
        <FontAwesomeIcon className="w-9 h-8" icon={faReceipt} />
      </button>
      <h1>Receipt</h1>
    </div>
  );
}

export default ReceiptButton;
