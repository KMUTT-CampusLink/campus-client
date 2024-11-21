import NavBar from '../../registration/components/NavBarComponents/NavBar';
import Building from '../component/Main/Building';
import { useState, useEffect } from 'react';
import { getParkingData } from '../services/api.js';

function Parkingslot() {
    const [building, setBuilding] = useState([]);

    const getBuilding = async () => {
        const res = await getParkingData();
        setBuilding(res);
        console.log(res);
        
    };

    useEffect(() => {
        getBuilding();
    }, []);

    return (
        <>
            <NavBar />
            <div className="max-w-2xl mx-auto pt-20">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Available Parking Slot</h1>
                    <div className="flex justify-end">
                        <button className="flex flex-row w-6 h-6">
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

export default Parkingslot;