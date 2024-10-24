import { useNavigate } from 'react-router-dom';

function Continuebut() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking');
  };
  return (
   <>
   <button onClick={handleClick} className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition absolute bottom-24">CONTINUE</button>
   </>
  )
}

export default Continuebut