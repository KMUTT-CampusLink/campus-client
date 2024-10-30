import { useState, useEffect } from "react";
import "../css/carouselhelper.css";
import BangModImage from '../assets/bangmodCarousel.jpg'
import BangkhuntienImage from '../assets/bangkhuntienCarousel.jpg'
import RatchaburiImage from '../assets/ratchaburiCarousel.jpg'

const CampusCarousel = () => {
  const [campus, setCampus] = useState("Bangmod");

  const [activeIndex, setActiveIndex] = useState(0);

  const campusList =[
    {
        name: "Bangmod",
        img_link :  BangModImage,
    },
    {
        name: "Bangkuntein",
        img_link : BangkhuntienImage,
    },
    {
        name : "Ratchaburi",
        img_link : RatchaburiImage
    }
  ]

  useEffect(() => {
    const currentHash = window.location.hash;

    if (currentHash) {
      const campusName = decodeURIComponent(currentHash.replace("#", ""));
      const campusIndex = campusList.findIndex(
        (campus) => campus.name === campusName
      );
      if (campusIndex !== -1) {
        setActiveIndex(campusIndex);
      }
    }
  }, []);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-wrapper w-full h-full flex">
      <div className="h-max mt-10 md:mt-28">
        <h1 className="text-center text-3xl md:text-6xl font-extrabold text-[#864E41]">
          {campusList[activeIndex].name}
        </h1>

        <div className="w-4/6 flex mx-auto mt-12 mb-4">
          <div className="carousel w-full h-max mx-auto">
            <div id="Bangmod" className="carousel-item w-full aspect-[5/3] rounded-lg overflow-hidden">
              <img 
                src={campusList[activeIndex].img_link}
                className="w-full h-full"
              />
            </div>
            <div id="Ladkrabang" className="carousel-item w-full aspect-[5/3] rounded-lg overflow-hidden">
              <img
                src={campusList[activeIndex].img_link}
                className="w-full h-full"
              />
            </div>
            <div
              id="North Bangkok"
              className="carousel-item w-full aspect-[5/3] rounded-lg overflow-hidden"
            >
              <img
                src={campusList[activeIndex].img_link}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center gap-3 md:gap-6 py-2">
        <a
          onClick={() => handleButtonClick(0)} href="#Bangmod"
          className={`rounded-full text-base md:text-2xl font-extrabold ${
            activeIndex === 0 ? 'text-gray-500 scale-75' : 'text-black'
          }`}
        >
          •
        </a>
        <a
          onClick={() => handleButtonClick(1)} href="#Ladkrabang"
          className={`rounded-full text-base md:text-2xl font-extrabold ${
            activeIndex === 1 ? 'text-gray-500 scale-75' : 'text-black'
          }`}
        >
          •
        </a>
        <a
          onClick={() => handleButtonClick(2)} href="#North Bangkok"
          className={`rounded-full text-base md:text-2xl font-extrabold ${
            activeIndex === 2 ? 'text-gray-500 scale-75' : 'text-black'
          }`}
        >
          •
        </a>
        </div>

        <div className="go-to-button mt-10 md:mt-20 md:mb-12 text-white">
          <a href={`/map/${campusList[activeIndex].name}`} className="flex w-max md:w-[25%] text-center p-1 px-2 md:p-3 mx-auto bg-[#864E41] rounded-xl">
            <p className="text-center text-sm md:text-base flex mx-auto">Go to {campusList[activeIndex].name}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CampusCarousel;
