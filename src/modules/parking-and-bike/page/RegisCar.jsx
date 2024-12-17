import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegisterCar } from "../services/api";

function RegisCar() {
  const [brand, setBrand] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [confirmLicenseNo, setConfirmLicenseNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkError = () => {
    if (licenseNo !== confirmLicenseNo) {
      setError('License numbers do not match');
      return false;
    } else if (licenseNo === '' || confirmLicenseNo === '' || brand === '') {
      setError('Please fill in all fields');
      return false;
    } else {
      return true;
    }
  }

  const handleRegister = async () => {
    if (checkError()) {
      try {
        const requestData = {
          name: brand,
          license_no: licenseNo
        };

        const response = await postRegisterCar(requestData);

        

        if (response.message === "Register Car successfully!") {
          alert('Car registered successfully!');
          navigate('/parking');
        } else if (response.message === "Each user can only register one car.") {
          setError("Each user can only register one car.");
        }
      } catch (error) {
        console.error('Error registering car:', error);
        setError('Failed to register car. Please try again.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full h-full items-center justify-center pt-24 mb-20 gap-4">
        <div className="flex flex-col justify-center items-center w-80 sm:w-96 shadow-md rounded-2xl py-8 px-4 gap-10">
          <div className="bg-red-500 px-4 py-3 rounded-full">
            <FontAwesomeIcon className="w-8 h-8 text-white" icon={faCar} />
          </div>
          <h1 className="text-xl font-bold">Register Your Vehicle</h1>
          <div className="flex flex-col gap-7">
            <input onChange={(e) => setBrand(e.target.value)} className="w-72 py-1 border-b border-gray-300" type="text" placeholder="   Vehicle Brand" />
            <input onChange={(e) => setLicenseNo(e.target.value)} className="w-72 py-1 border-b border-gray-300" type="text" placeholder="   License No" />
            <input onChange={(e) => setConfirmLicenseNo(e.target.value)} className="w-72 py-1 border-b border-gray-300" type="text" placeholder="   Confirm License No" />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button onClick={handleRegister} className="px-14 py-2 bg-red-500 shadow-md drop-shadow-md rounded-md text-white font-light text-sm hover:bg-red-600 active:bg-red-700">Register</button>
          </div>
        </div>
        <p className="mx-6 text-xs">By registering you agree to <span className="text-red-500">Terms & Conditions</span> and <span className="text-red-500">Privacy Policy</span>.</p>
      </div>
    </>
  )
}

export default RegisCar;