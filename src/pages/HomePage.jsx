import NavBar from "../modules/registration/components/NavBarComponents/NavBar";
import PhotoSlider from "../components/Landing/PhotoSlider";
import NewsEvents from "../components/Landing/NewsEvents";
import NewsUpdates from "../components/Landing/NewsUpdates";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import "swiper/css";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      {/* Main Page */}
      <div className="w-full flex flex-col items-center min-h-screen pt-[4rem] md:pt-[4.5rem] gap-[1rem]">
        <PhotoSlider />
        <NewsEvents />
        <NewsUpdates />
      </div>
    </div>
  );
};

export default HomePage;
