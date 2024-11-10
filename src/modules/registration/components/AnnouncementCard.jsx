import Carousel from "./Carousel";

function AnnouncementCard() {
  const images = [
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/newsHolder.jpg",
    "/regis/newsHolder.jpg",
  ];
  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">NewsCard</h2>
        <span className="text-sm text-gray-800">View More</span>
      </div>
      <div>
        <Carousel images={images} />
      </div>
    </div>
  );
}

export default AnnouncementCard;
