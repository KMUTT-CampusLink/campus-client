import { faPhone,faEnvelope,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Info() {
  return (
<>
<div className='flex flex-col gap-2 justify-start items-start'>
        <div className='flex flex-row gap-2 items-center'>
          <FontAwesomeIcon className="bg-red-500 text-white p-1.5 w-3 h-3 rounded-2xl" icon={faPhone} />
          <div className='text-sm font-semibold'> + 1 254 8547 956</div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
          <FontAwesomeIcon className=" text-red-500 p-1.5 rounded-2xl" icon={faEnvelope} /> 
          <div className='text-sm font-medium'> sachdeva@gmail.com
          </div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
          <FontAwesomeIcon className=" text-red-500 p-1.5 rounded-2xl"  icon={faLocationDot} /> 
          <div className='text-sm font-medium'> KMUTT BANGMOD
          </div>
        </div>
</div>
        
</>  )
}

export default Info