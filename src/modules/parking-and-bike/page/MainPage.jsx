import Building from '../component/Main/Building';
import ReceiptButton from '../component/Main/Menu/ReceiptButton';
import ParkingButton from '../component/Main/Menu/ParkingButton';
import HelpButton from '../component/Main/Menu/HelpButton';
import uniImg from '../img/kmutt-cover.png';
import { useState, useEffect } from 'react';
import { getParkingData } from '../services/api';
import Search from "../component/Search/Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../registration/components/NavBarComponents/NavBar';
import Searchresultlist from "../component/Search/Searchresultlist";

function MainPage() {
    const [building, setBuilding] = useState([]);

    const getBuilding = async () => {
        const res = await getParkingData();
        setBuilding(res);
    };

    useEffect(() => {
        getBuilding();
    }, []);

    const [results, setResults] = useState([]);

    return (
        <>
            <Navbar />
            <div className="flex flex-row justify-center pt-24">
                <img className="w-2/4 h-1/10 aspect-video min-w-96 min-h-70" src={uniImg} alt="" />
            </div>
            <br />
            <br />
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                    <Search setResults={setResults} />
                </div>
                <Searchresultlist results={results} />
            </div>
            <br />
            <br />
            <div className="flex flex-row gap-20 justify-center">
                <ReceiptButton />
                <ParkingButton />
                <HelpButton />
            </div>
            <br />
            <br />
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Available Parking Slot</h1>
                    <div className="flex justify-end">
                        <button className="flex flex-row w-6 h-6">
                            <p className="underline underline-offset-1">See All</p>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                    </div>
                </div>
                {building.map((key) => (
                    <Building
                        key={key.id}
                        bdid={key.id}
                        bdimg={key.building_img}
                        bdname={key.name}
                        avaslot={key.reserved_slots}
                        maxslot={key.parking_capacity}
                    />
                ))}
            </div>
        </>
    );
}

export default MainPage;