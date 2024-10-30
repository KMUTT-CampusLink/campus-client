import NavBar from "../../registration/components/NavBarComponents/NavBar";
import ContactList from "../components/ContactList";


const ContactPage = () => {

    const navbarHeight = '5rem'

    return(
        <div className="h-screen bg-gradient-to-r from-[#c2544d] to-[#f09107] grid">
            <NavBar/>
            <main  style={{ height: `calc(100vh - ${navbarHeight})` }} className=" mt-20 bg-white w-full rounded-t-xl h-min md:px-16 lg:px-20">
                <ContactList/>
            </main>

        </div>
    )
}

export default ContactPage;