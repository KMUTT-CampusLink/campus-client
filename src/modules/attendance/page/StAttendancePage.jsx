import NavBar from '../../registration/components/NavBarComponents/NavBar'; 
import StAttendanceComponent from "../components/StrAttendanceComponent";
import useStAttendance from "../hook/useStAttendance";

const StAttendancePage = () => {
    const stAttendance = useStAttendance();
    
    return (
        <>
           
            <NavBar />
            <StAttendanceComponent {...stAttendance} />
        </>
    );
};

export default StAttendancePage;
