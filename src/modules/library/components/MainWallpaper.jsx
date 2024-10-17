import React, { useState, useEffect } from "react";

function MainWallpaper() {
  const wallpaper = [
    "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?cs=srgb&dl=pexels-ivo-rainha-527110-1290141.jpg&fm=jpg",
    "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?cs=srgb&dl=pexels-element5-1370295.jpg&fm=jpg",
    "https://media.gettyimages.com/id/1428719730/video/library-books-and-bookshelf-for-reading-learning-or-knowledge-background-public-access.jpg?s=640x640&k=20&c=ley35smAfLuy3JfBNycGmjTi8JtcNyKcbQ0Dtc7CObs=",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wallpaper.length);
    }, 5000);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [wallpaper.length]);

  // Manual slide control
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wallpaper.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wallpaper.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-w-[530px] relative w-full h-96 sm:h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Image slider */}
      <div
        className="absolute inset-0 flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {wallpaper.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>

      {/* text and overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-white text-4xl sm:text-2xl md:text-5xl lg:text-6xl font-bold">
          Welcome to Campus Library
        </h1>
        <h3 className="text-white text-md sm:text-sm md:text-xl lg:text-xl max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odio
          accusamus enim eligendi, rerum quas iure quae repellat? Sequi
          molestias inventore sint dolorem excepturi natus, repellendus magnam
          laboriosam sapiente neque!
        </h3>
        <button className="text-white font-semibold py-2 px-6 sm:px-4 sm:py-2 rounded-full shadow-lg transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-300">
          Get Started
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex space-x-2 z-10 cursor-pointer">
        {wallpaper.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-stone-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default MainWallpaper;
