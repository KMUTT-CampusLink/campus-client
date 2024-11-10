import { useState, useEffect } from "react";
const images = ["/regis/Event.png", "/regis/Event.png", "/regis/Event.png"];

function EventCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000; // Change slide every 3 seconds

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Set up auto-slide using useEffect
  useEffect(() => {
    const interval = setInterval(handleNext, delay);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div>
      {" "}
      <h2 className="font-bold text-2xl text-center pt-4">News & Events</h2>
      <div className="divider mx-auto mt-0 w-1/2"></div>
      <div className="relative w-full h-48 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="h-full min-w-full object-cover object-left"
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          ❯
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
