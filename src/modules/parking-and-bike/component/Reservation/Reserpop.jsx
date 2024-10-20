
import ParkingForm from './ParkingForm';
import Bdimage from './Bdimage';
import Bdname from './Bdname';
import Carverify from './Carverify';
import Bdlocate from "./Bdlocate";
import Reserbut from './Reserbut';
import Closebut from './Closebut';
function Reserpop() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
      <div className="bg-white min-w-96 w-3/5 pb-24 rounded-2xl shadow-2xl">
      <div className='w-full flex justify-end pr-4 pt-2'>
      <Closebut/> 
      </div>
        <div className='flex flex-row justify-evenly'>
            <div className='flex flex-col justify-center items-center'>
            <Bdimage/>
            <div className="w-48"><Carverify /></div>
            
            </div>
         
            <div className='flex flex-col items-start justify-evenly'>
              <div>  
                              
                  <Bdname/>
                  
                  <br />
                  <Bdlocate/>
              </div>
            <ParkingForm/>
            
            <Reserbut/>
            </div>
            
        </div>
           
        </div>

    </div>
  );
}

export default Reserpop;
