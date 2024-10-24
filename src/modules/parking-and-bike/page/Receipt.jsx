import image from "../img/Receiptimage.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Qr from "../component/Receipt/Qr";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import Expqr from "../component/Receipt/Expqr";
import Licensenum from "../component/Receipt/Licensenum";
import Continuebut from "../component/Receipt/Continuebut";
import Reserinfo from "../component/Receipt/Reserinfo";
function Receipt() {
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
           <Expqr/>
            <Qr/>
          <br />
          <Reserinfo/>
          <br />
          <br />
          <Licensenum/>

        </div>
        <Continuebut/>
        <img className="max-w-xl" src={image} alt="" />
      </div>

    </>
  )
}

export default Receipt