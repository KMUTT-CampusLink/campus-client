import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Seeallbut() {
    return (
        <>
            <button className="flex flex-row">
             <p className="underline underline-offset-1">See All</p>
             <FontAwesomeIcon icon={faCaretDown} />                         </button>
        </>
    )
    
}
export default Seeallbut;