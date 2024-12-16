import AttendanceComponent from "../components/AttendanceComponent";
import useAttendance from "../hook/useAttendance";
import NavBar from '../../registration/components/NavBarComponents/NavBar'; 

const AttendancePage = () => {
    const attendance = useAttendance();
    
    return (
        <>
            <NavBar />
            <AttendanceComponent {...attendance} />
        </>
    );
};

export default AttendancePage;
