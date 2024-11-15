import { useParams } from "react-router-dom";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import MainCampusDetailBox from "../components/MainCampusDetailBox";

const Campus = () => {

    const { campusName } = useParams();
    
    return(
        <div className="h-screen bg-gradient-to-r from-[#c2544d] to-[#f09107] grid">
            <NavBar/>
            <main className=" mt-20 bg-white w-[100vw] rounded-t-xl h-min px-8 md:px-16 lg:px-20">
                <MainCampusDetailBox campusNameProp ={campusName}/>
            </main>
        </div>
    );
}

export default Campus;