
import Image from '../component/Help/Image';
import Info from '../component/Help/Info';
import Form from '../component/Help/form';
import NavBar from '../../registration/components/NavBarComponents/NavBar';
function Help() {
  return (
    <>
    <NavBar></NavBar>
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50  min-h-screen pt-10 ">
      <div className="bg-white min-w-96 w-3/5 pb-24 rounded-2xl shadow-2xl">
      <div className='flex flex-row justify-evenly flex-wrap '>
        <div className="flex flex-col p-1 shadow-purple-300 shadow-md max-w-72 m-10 rounded-lg gap-10 justify-center items-center">
            <Image/> 
            <div>
              <Info/>
              <br /><br />
            </div>

          </div>
          <div className='flex flex-col justify-center items-center'>
            <Form/>
            
          </div>
      </div>
       
        </div>    
      </div>
    </>
    
  );
}

export default Help;
