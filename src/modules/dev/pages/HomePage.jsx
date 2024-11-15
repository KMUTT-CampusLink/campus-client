import NavBar from "../../registration/components/NavBarComponents/NavBar";
import NewsUpdates from "../components/Landing/NewsUpdates";
import PhotoSlider from "../components/Landing/PhotoSlider";
import NewsEvents from "../components/Landing/NewsEvents";
import Announcer from "../components/Landing/Announcer";
import Footer from "../components/Landing/Footer";
import "../styles/custom_swiper.css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      {/* Main Page */}
      <div className="w-full flex flex-col items-center min-h-screen pt-[4rem] md:pt-[4.5rem] gap-[1rem] pagination scrollbar">
        <PhotoSlider />
        <NewsEvents />
        <NewsUpdates />
        <Announcer />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
