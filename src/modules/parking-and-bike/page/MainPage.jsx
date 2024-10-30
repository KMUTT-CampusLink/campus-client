import Building from '../component/Main/Building';
import Helpbut from '../component/Main/Helpbut';
import Parkingbut from '../component/Main/Parkingbut';
import Receiptbut from '../component/Main/Receiptbut';
import Search from '../component/Main/Search';
import Seeallbut from '../component/Main/Seeallbut';
import Uniimage from '../component/Main/Uniimage';
import bd from '../img/lx.png';

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

console.log(parkingData);

function MainPage() {
    return (
        <>
            <div className="flex flex-row justify-center">
               <Uniimage/>
            </div>
            <br />
            <br />
            <div className="flex flex-row justify-center">
                <Search />
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

        </>
    );
}

export default MainPage;
