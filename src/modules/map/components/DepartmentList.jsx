import axios from 'axios';

const DepartmentList = ({dataProp, openModalProp}) =>{

    const modalTrigger = (details) =>{
        openModalProp(details);
    }

  console.log(dataProp)

  const SouthZoneList = dataProp.filter((building) => building.zone == "South");
  const NorthZoneList = dataProp.filter((building) => building.zone == "North");



    return(
        <div className="grid md:grid-cols-2 md:gap-4 gap-y-4 text-[8px] md:text-xs h-max">
            <div className="grid w-[100%] mr-auto my-auto h-full border-2 rounded-xl px-8 pb-4">
                    <h1 className="text-center font-semibold m-2 mt-4">South Zone</h1>

                    {
                        NorthZoneList.map((building, index)=>(
                            <div key={building.id} onClick={() => modalTrigger(building)} className='flex align-top m-1 border-2 bg-gray-400/20 rounded-full h-max cursor-pointer'>
                                <span className='p-1 bg-red-400 h-max rounded-full align-middle align-self-center mr-2'>N{index+1}</span>
                                <span className='p-1 mx-auto pr-10'>{building.name}</span>
                            </div>
                        ))
                    }

            </div>
            <div className="grid w-[100%] ml-auto border-2 rounded-xl px-8 pb-4">
                    <h1 className="text-center font-semibold m-2 mt-4">North Zone</h1>

                    {
                        SouthZoneList.map((building, index)=>(
                            <div key={building.id} onClick={() => modalTrigger(building)} className='flex align-middle items-center m-1 border-2 bg-gray-400/20 rounded-full h-max cursor-pointer'>
                                <span className='p-1 bg-yellow-400 h-max rounded-full align-middle align-self-center mr-2'>N{index+1}</span>
                                <span className='p-1 mx-auto pr-10'>{building.name}</span>
                            </div>
                        ))
                    }
            </div>
        </div>
    )
}

export default DepartmentList;