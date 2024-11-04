import NavBar from "../../registration/components/NavBarComponents/NavBar";
import ContactList from "../components/ContactList";
import SubmissionList from "../components/SubmissionList";


const SubmissionsPage = () => {

    const navbarHeight = '5rem'

    return(
        <div className="w-[100vw] h-screen bg-gradient-to-r from-[#c2544d] to-[#f09107] grid">
            <NavBar/>
            <main  style={{ height: `calc(100vh - ${navbarHeight})` }} className=" mt-20 bg-white w-full rounded-t-xl h-min md:px-16 lg:px-20">
                <SubmissionList/>
            </main>

        </div>
    )
}

export default SubmissionsPage;