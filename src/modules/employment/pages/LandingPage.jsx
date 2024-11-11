import NavBar from "../../registration/components/NavBarComponents/NavBar";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
    const navigate = useNavigate();

    const handleEmployeeClick = () => {
        navigate(`/employ/employee`)
    }
    const handleStudentClick = () => {
        navigate(`/employ/student`)
    }

    return (
        <div className="min-h-screen w-full">
            <NavBar/>
            <div className="h-screen sm:pt-16 pt-20 ">
                <img src="https://media.licdn.com/dms/image/C4D12AQHMm2kwPugQ_g/article-cover_image-shrink_720_1280/0/1628230518905?e=2147483647&v=beta&t=5vwRWd3XwRZgzjMNlfSUqgGV45BX3GAkUYVdTFtc1lo"
                className="object-contain w-full h-2/5 sm:h-2/3"/>
                <div className="grid grid-cols-2 pt-5 gap-7 sm:gap-16 lg:gap-36">
                    <div className="flex justify-end">
                        <div className="transition hover:shadow-md font-georama border md:border-t md:border-r md:border-l shadow-sm shadow-orange-400 hover:shadow-orange-700 w-32 h-10 md:w-40 md:h-14 flex justify-center items-center" 
                        onClick={handleEmployeeClick}>Employees</div>
                    </div>
                    <div className="flex justify-start ">
                        <div className="transition hover:shadow-md font-georama border md:border-t md:border-r md:border-l shadow-sm shadow-orange-400 hover:shadow-orange-700 w-32 h-10 md:w-40 md:h-14 flex justify-center items-center"
                        onClick={handleStudentClick}>Students</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage