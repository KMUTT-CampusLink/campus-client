import Building from '../component/Main/Building';
import ReceiptButton from '../component/Main/Menu/ReceiptButton';
import ParkingButton from '../component/Main/Menu/ParkingButton';
import RegisButton from '../component/Main/Menu/RegisButton';
import { useState, useEffect } from 'react';
import { getParkingData } from '../services/api';
import Search from "../component/Search/Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../registration/components/NavBarComponents/NavBar';
import Searchresultlist from "../component/Search/Searchresultlist";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
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
    const slideImages = [
        {
          url:"https://sustainable.kmutt.ac.th/wp-content/uploads/2024/03/DJI_0205-copy-scaled.jpg",
          caption: ''
        },
        {
            url: "https://campus.campus-star.com/app/uploads/2020/10/lx-bu.jpg",
            caption: ''
        },
        {
          url:"https://contributor.lib.kmutt.ac.th:8443/images/contents/9c001b03-61a9-421e-a6ad-4986039ea399/1.jpeg",
          caption: ''
        },
      ];
    return (
        <>
            <Navbar />
            <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index} className='flex justify-center items-center pt-20'>
              <div style={{'backgroundImage': `url(${slideImage.url})` }} className='w-2/4 h-1/10 aspect-video min-w-96 min-h-70 bg-cover'>
                <span className="">{slideImage.caption}</span>
              </div>
              </div>
           ))}
        </Slide>
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
                <RegisButton />
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
                {building && building.map((key) => (
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