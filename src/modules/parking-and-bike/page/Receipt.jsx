import image from "../img/Receiptimage.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import qr from "../img/ponkrit_st_qr (1).png"
function Receipt() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/parking');
  };
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-start min-h-screen pt-20">
        <FontAwesomeIcon className="flex absolute mt-3 w-20 h-20 text-green-500" icon={faCircleCheck} />

        <div className="flex flex-col justify-center items-center absolute pt-20 top-24">
          <br />
          <h1 className="text-2xl font-bold">BOOKING SUCCESSFUL!</h1>
          <br />
          <p className="text-red-600 text-xs">QR Expire in:01:00:00</p>
          <div className="border-4 border-yellow-500 p-0 rounded-md">
                <img className="w-24 h-24" src={qr} alt="" />
            </div>
          <br />
          <div className="flex flex-col text-xs justify-center items-center gap-5 font-semibold">
            <p>FLOOR-4th Floor</p>
            <p>POSITION-A01</p>
            <p>EXPIRE DATE-25/02/2025</p>
            <p>EXPIRE TIME-03:00 PM</p>
          </div>
          <br />
          <br />
          <div className="text-2xl font-bold text-yellow-500 flex flex-col items-center">
                <h1>License Number</h1>
                <h1>4A-5279</h1>
            </div>

        </div>
        <button onClick={handleClick} className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition absolute bottom-24">CONTINUE</button>
        <img className="max-w-xl" src={image} alt="" />
      </div>

    </>
  )
}

export default Receipt