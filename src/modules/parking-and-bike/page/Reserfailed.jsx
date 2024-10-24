import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from '../../registration/components/NavBarComponents/NavBar'
function Reserfailed() {
  return (
    <>
     <NavBar/>
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-between items-center gap-9 border-2 px-24 py-20 rounded-2xl">
            <div>
                
            </div>
            <FontAwesomeIcon className="w-16 h-16 text-red-500" icon="fa-regular fa-face-frown" />
            
            <p className="text-red-500">ERROR!</p>
            <p>Sorry! Car Reservation failed.</p>
            <button className="bg-red-500 w-48 h-12 mx-24 text-white rounded-2xl">TRY AGAIN</button>
        </div>
        
    </div>
    </>
  )
}

export default Reserfailed