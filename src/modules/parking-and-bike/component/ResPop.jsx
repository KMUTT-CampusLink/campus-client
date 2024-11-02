import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function ResPop({ img, name, onClose }) {
    const closeRespop = () => {
        if (onClose) {
            onClose(); // Calls the parent's handleClose to hide ResPop and overlay
        }
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
            <div className="bg-white min-w-96 w-3/5 pb-24 rounded-2xl shadow-2xl">
                <div className='w-full flex justify-end pr-4 pt-2'>
                    <button onClick={closeRespop}>
                        <FontAwesomeIcon className='w-6 h-6' icon={faCircleXmark} />
                    </button>
                </div>
                <div className='flex flex-row justify-evenly'>
                    <div className='flex flex-col justify-center items-center'>
                     <img className='mt-10 w-64 h-64' src={img} alt="" />
                        <div className="w-48">
                            <div className='flex flex-row fixed gap-2 mb-10 px-3 py-2.5 text-black rounded-lg shadow-2xl shadow-black'>
                                <FontAwesomeIcon className=' w-6 h-6' icon={faCircleCheck} />
                                Your Car is Verified
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-start justify-evenly'>
                        <div>
                            <div className="text-2xl font-bold">{name}</div>
                            <br />
                            <div className="font-medium">
                                Located beside the library
                            </div>
                        </div>
                        <form>
                            <div className="flex flex-col gap-6 ">
                                <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
                                    <option value="">1st Floor (24/30)</option>
                                    <option value="">2nd Floor (24/30)</option>
                                    <option value="">3rd Floor (30/30)</option>
                                    <option value="">4th Floor (15/15)</option>
                                </select>
                                <select className="py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2">
                                    <option value="">POSITION</option>
                                    <option value="">A01</option>
                                    <option value="">A02</option>
                                    <option value="">A03</option>
                                    <option value="">B01</option>
                                </select>
                                <input className='py-3 px-4 rounded-lg drop-shadow-2xl shadow-black p-2' type="time" name="" id="" />
                            </div>
                        </form>

                        <button className="bg-red-500 text-white px-12 py-2 rounded-lg hover:bg-red-600 transition">
                            RESERVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResPop;
