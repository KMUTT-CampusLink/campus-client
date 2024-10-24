import Building from '../component/Main/Building';
import Helpbut from '../component/Main/Helpbut';
import Parkingbut from '../component/Main/Parkingbut';
import Receiptbut from '../component/Main/Receiptbut';
import Search from '../component/Search/Search';
import Seeallbut from '../component/Main/Seeallbut';
import Uniimage from '../component/Main/Uniimage';
import bd from '../img/lx.png';
import NavBar from '../../registration/components/NavBarComponents/NavBar';
import Searchresult from '../component/Search/Searchresultlist';
import { useState } from 'react';

const parkingData = [
    {
        id: 1,
        bdimage: bd,
        bdname: 'LX building',
        avaslot: '3'
    },
    {
        id: 2,
        bdimage: bd,
        bdname: 'President building',
        avaslot: '4'
    },
    {
        id: 3,
        bdimage: bd,
        bdname: 'LX building',
        avaslot: '1'
    },
    {
        id: 4,
        bdimage: bd,
        bdname: 'LX building',
        avaslot: '6'
    }
];

function MainPage() {
    const [results, setResults] = useState([]);

    return (
        <>
                <NavBar/>
                <div className='pt-24'>
                    <div className="flex flex-row justify-center">

                        <Uniimage />
                    </div>
                    <br />
                    <br />
                    <div className='flex flex-col justify-center items-center'>
                    <div className="flex flex-row justify-center">
                        <Search setResults={setResults}/>  
                    </div>
                        <Searchresult results={results}/>
                    </div>
                    
                    <br />
                    <br />
                    <div className="flex flex-row gap-20 justify-center">
                        <Receiptbut />
                        <Parkingbut />
                        <Helpbut />

                    </div>
                    <br />
                    <br />
                    <div className="max-w-2xl mx-auto">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-bold">Available Parking Slot</h1>
                            <div className="flex justify-end">
                                <Seeallbut classname="w-6 h-6" />
                            </div>
                        </div>


                        {parkingData.map((item) => (
                            <Building
                                key={item.id}
                                bdimage={item.bdimage}
                                bdname={item.bdname}
                                avaslot={item.avaslot}
                            />
                        ))}
                    </div>
                </div>


            </>
        );
    }

    export default MainPage;
