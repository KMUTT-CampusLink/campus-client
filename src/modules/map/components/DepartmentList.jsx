import axios from 'axios';

const DepartmentList = ({dataProp, openModalProp}) =>{

    const modalTrigger = (details) =>{
        openModalProp(details);
    }


  const SouthZoneList = dataProp
  .filter((building) => building.zone.includes("S"))
  .sort((a, b) => {
    const numA = parseInt(a.zone.slice(1)); 
    const numB = parseInt(b.zone.slice(1)); 
    return numA - numB; 
  });

const NorthZoneList = dataProp
  .filter((building) => building.zone.includes("N"))
  .sort((a, b) => {
    const numA = parseInt(a.zone.slice(1)); 
    const numB = parseInt(b.zone.slice(1)); 
    return numA - numB; 
  });




    return(
        <div className="grid md:grid-cols-2 md:gap-4 gap-y-4 text-[8px] md:text-xs h-max mx-auto">
        {/* South Zone Block */}
        <div className="flex flex-col w-[100%] border-2 rounded-xl px-8 pb-4 h-max">
            <h1 className="text-center font-semibold m-2 mt-4">South Zone</h1>
    
            <div className="flex-grow h-max">
            {
                    NorthZoneList.map((building, index) => (
                        <div 
                            key={building.id} 
                            onClick={() => modalTrigger(building)} 
                            className='flex my-3 border-2 bg-gray-400/20 rounded-full h-8 cursor-pointer ring-1 ring-gray-300 hover:ring-2 hover:ring-yellow-400 hover:shadow-lg transition-all'
                        >
                            <span className='bg-[#DCC625] w-[12%] md:w-[18%] lg:w-[10%] xl:w-[6%] text-center flex  rounded-full'><div className='flex h-min m-auto text-white md:text-[0.6rem] lg:text-'>{building.zone}</div></span>
                            <span className='text-[0.45rem] w-full align-middle flex pl-2 pr-1 my-auto leading-3'>{building.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    
        {/* North Zone Block */}
        <div className="flex flex-col w-[100%] border-2 rounded-xl px-8 pb-4">
            <h1 className="text-center font-semibold m-2 mt-4">North Zone</h1>
    
            <div className="flex-grow ">
                
                {
                    SouthZoneList.map((building, index) => (
                        <div 
                            key={building.id} 
                            onClick={() => modalTrigger(building)} 
                            className='flex my-3 border-2 bg-gray-400/20 rounded-full h-8 cursor-pointer ring-1 ring-gray-300 hover:ring-2 hover:ring-yellow-400 hover:shadow-lg transition-all'
                        >
                            <span className='bg-[#FF4612] w-[12%] md:w-[18%] lg:w-[10%] xl:w-[6%] text-center flex  rounded-full'><div className='flex h-min m-auto text-white md:text-[0.6rem] lg:text-'>{building.zone}</div></span>
                            <span className='text-[0.45rem] w-full align-middle flex pl-2 pr-1 my-auto leading-3'>{building.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    

    
    )
}

export default DepartmentList;