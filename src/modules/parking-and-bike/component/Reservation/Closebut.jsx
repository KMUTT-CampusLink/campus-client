import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
function Closebut() {
  return (
     <>
     <button>
     <FontAwesomeIcon className='w-6 h-6' icon={faCircleXmark} />
     </button>
     </>
)
}

export default Closebut