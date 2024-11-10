import { useState, useEffect } from "react";

const images = [
  "/regis/newsHolder.jpg",
  "/regis/announce.png",
  "/regis/newsHolder.jpg",
  "/regis/newsHolder.jpg",
  "/regis/newsHolder.jpg",
  "/regis/newsHolder.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000; // Change slide every 3 seconds
  const imagesPerSlide = 3; // Number of images to show at once

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
      <button
        onClick={handlePrev}
        className="p-2 bg-gray-700 text-white rounded-full mr-2"
      >
        ❮
      </button>

      <div className="overflow-hidden w-full h-48">
        <div
          className="flex transition-transform space-x-4 duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / imagesPerSlide}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-1/3 h-full object-cover"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="p-2 bg-gray-700 text-white rounded-full ml-2"
      >
        ❯
      </button>
    </div>
  );
}
