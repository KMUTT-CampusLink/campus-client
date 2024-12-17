import { useState, useEffect } from 'react';
import Search from '../component/Search/Search';
import Searchresultlist from '../component/Search/SearchResultList';
import ProcessButton from '../component/Main/Navigator/ProcessButton';
import HistoryButton from '../component/Main/Navigator/HistoryButton';
import RegisButton from '../component/Main/Navigator/RegisButton';
import Buildings from '../component/Main/Buildings';
import NavBar from '../../registration/components/NavBarComponents/NavBar';
import { getParkingData } from '../services/api';
import parkingimg from '../img/parking.png'

function MainPage() {
    const [building, setBuilding] = useState([]);
    const [results, setResults] = useState([]);

    const getBuilding = async () => {
        const res = await getParkingData();
        setBuilding(res);
    };

    useEffect(() => {
        getBuilding();
    }, []);

    return (
        <>
            <NavBar />
            <div className="flex flex-col w-full h-full items-center justify-center gap-10 md:pt-32 mb-20">
                <img src={parkingimg} className="flex shadow-sm drop-shadow-sm md:w-5/12 sm:w-80 w-72 mt-24 md:mt-0 rounded-lg"></img>
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center">
                        <Search setResults={setResults} />
                    </div>
                    <Searchresultlist results={results} />
                </div>
                <div className='flex flex-row w-80 justify-around'>
                    <ProcessButton />
                    <HistoryButton />
                    <RegisButton />
                </div>
                <div className='flex flex-row justify-between sm:w-6/12 w-72'>
                    <h1 className='text-xl font-bold'>Avaliable Parking Slot</h1>
                    {/* <button className='text-xs underline text-gray-500'>See All</button> */}
                </div>
                {building && building.map((key) => (
                    <Buildings
                        key={key.id}
                        bdid={key.id}
                        bdimg={key.building_img}
                        bdname={key.name}
                        avaslot={key.parking_capacity - key.reserved_slots}
                    />
                ))}

            </div>
        </>
    )
}

export default MainPage;