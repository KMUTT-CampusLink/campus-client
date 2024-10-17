import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Carverifyfail() {
  return (
    <>
    <div className='flex flex-row gap-2 mb-10 px-3 py-2.5 text-black rounded-lg shadow-2xl shadow-black'>
    <FontAwesomeIcon className='text-red-500 w-6 h-6' icon={faCircleXmark} />
      Your Car is Verified
    </div>
    </>
  )
}

export default Carverifyfail