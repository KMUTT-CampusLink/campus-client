import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
function Carverify() {
  return (
    <>
    <div className='flex flex-row fixed gap-2 mb-10 px-3 py-2.5 text-black rounded-lg shadow-2xl shadow-black'>
    <FontAwesomeIcon  className='text-red-500 w-6 h-6' icon={faCircleCheck} />
     Your Car is Verified
    </div>
    </>
  )
}

export default Carverify