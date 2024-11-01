import NavBar from '../../registration/components/NavBarComponents/NavBar'
import Building from '../component/Main/Building';
import { useState, useEffect } from 'react';
import Axios from "axios";
function Parkingslot() {
    const [building, setBuilding] = useState([]); /* */

    const getBuilding = async () => {
        const res = await Axios.get("http://localhost:3000/api/parking/getParking");
        setBuilding(res.data);
    }

    useEffect(() => {
        getBuilding()
    }, []);

    return (
        <>
        <NavBar></NavBar>
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
                        id={key.id}
                        bdimg={key.building_img}
                        bdname={key.name}
                        avaslot={key.capacity}
                    />
                ))}
            </div>
        </>
    )
    
}

export default Parkingslot