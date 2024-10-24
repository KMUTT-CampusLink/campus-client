import Building from "../component/Main/Building"
import bd from '../img/lx.png';
import NavBar from '../../registration/components/NavBarComponents/NavBar'
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
function Parkingslot() {
  return (
    <>
    <NavBar></NavBar>
    <div className="max-w-2xl pt-20 mx-auto">
  
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-bold">Available Parking Slot</h1>
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
  )
}

export default Parkingslot