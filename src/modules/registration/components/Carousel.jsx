import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000; // Change slide every 5 seconds
  const spaceBetweenImages = 5;

  // Detect the number of images per slide based on screen size
  const getImagesPerSlide = () => (window.innerWidth < 640 ? 2 : 3);
  const [imagesPerSlide, setImagesPerSlide] = useState(getImagesPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setImagesPerSlide(getImagesPerSlide());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageWidthPercentage = 100 / imagesPerSlide;

  // Adjust the current index to move one image at a time
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Set up auto-slide using useEffect
  useEffect(() => {
    const interval = setInterval(handleNext, delay);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full flex items-center">
      {/* Navigation Buttons Outside */}
      <button onClick={handlePrev} className="p-2 text-black mr-2">
        ❮
      </button>

      <div className="overflow-hidden w-full h-24 md:h-32 lg:h-48">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${
              currentIndex * (imageWidthPercentage + spaceBetweenImages)
            }%)`,
            gap: `${spaceBetweenImages}%`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="object-cover object-left h-full"
              style={{ width: `${imageWidthPercentage}%` }}
            />
          ))}
        </div>
      </div>

      <button onClick={handleNext} className="p-2 text-black ml-2">
        ❯
      </button>
    </div>
  );
}
// PropTypes validation
Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
