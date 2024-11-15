import { useState } from 'react';
import Image from '../component/Help/Image';
import Info from '../component/Help/Info';
import NavBar from '../../registration/components/NavBarComponents/NavBar';
import { postRegisterCar } from '../services/api';

function RegisCar() {
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [errors, setErrors] = useState({ name: '', license: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', license: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!license.trim()) {
      newErrors.license = 'License is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {

        const requestData = {
          name: name,
          license_no: license
        };
        const response = await postRegisterCar(requestData);
        console.log(response);
        
        if (response.message === "Register Car successfully!") {
          setSuccessMessage('Car registered successfully!');
          setErrorMessage('');
          setName('');
          setLicense('');
        } else if(response.message === "Each user can only register one car.") {
          setErrorMessage("Each user can only register one car.")
          setSuccessMessage('');
        } else {
          setErrorMessage('Failed to register car.');
          setSuccessMessage('');
        }
      } catch (error) {
        console.error("Error reserving slot:", error);
        setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
        setSuccessMessage('');

      }
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex justify-center items-center pt-40'>
        <div className="bg-white min-w-96 w-3/5 pb-24 rounded-2xl shadow-2xl">
          <div className='flex flex-row justify-evenly flex-wrap'>
            <div className="flex flex-col p-1 shadow-purple-300 shadow-md max-w-72 m-10 rounded-lg gap-10 justify-center items-center">
              <Image />
              <div>
                <Info />
                <br /><br />
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className="flex flex-col justify-center items-center w-max-24">
                <h1 className="text-red-500 font-bold text-3xl">Registration</h1>
                <br />
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your Name and Surname"
                    className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

                  <input
                    type="text"
                    placeholder="Enter your Car License"
                    className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                  />
                  {errors.license && <span className="text-red-500 text-sm">{errors.license}</span>}

                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Submit
                  </button>
                </form>
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisCar;
