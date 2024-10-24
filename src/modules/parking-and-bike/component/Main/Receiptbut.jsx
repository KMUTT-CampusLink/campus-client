import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Receiptbut() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking/receipt');
  };
    return (
        <>
        <div className="flex flex-col items-center">
        <button  onClick={handleClick} className="bg-red-500 text-white p-5 rounded-full">
        <FontAwesomeIcon className="w-6 h-6" icon={faReceipt} />
        </button>
        <h1>Receipt</h1>
        </div>
       
        </>
    )
}

export default Receiptbut;