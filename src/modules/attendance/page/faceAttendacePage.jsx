import FaceComponent from "../components/faceAttendanceComponent";
import useFace from "../hook/useFace"; 
import NavBar from '../../registration/components/NavBarComponents/NavBar'; 

const FaceAttendancePage = () => {
    const face = useFace();
    
    return (
        <>
           
            <NavBar />
            <FaceComponent {...face} />
        </>
    );
};

export default FaceAttendancePage;
