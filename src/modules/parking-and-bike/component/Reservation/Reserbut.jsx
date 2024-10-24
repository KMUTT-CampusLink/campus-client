
import { useNavigate } from 'react-router-dom';

function Reserbut() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking/receipt');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition"
    >
      RESERVE
    </button>
  );
}

export default Reserbut;
