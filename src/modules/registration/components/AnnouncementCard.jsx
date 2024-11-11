import Carousel from "./Carousel";

function AnnouncementCard() {
  const images = [
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
    "/regis/announce.png",
  ];
  return (
    <div className="my-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Announcements</h2>
        <span className="text-sm text-gray-500 hover:text-black hover:cursor-pointer">
          View More
        </span>
      </div>
      <div className="divider m-0 mb-4 w-1/2 lg:w-1/5"></div>
      <div>
        <Carousel images={images} />
      </div>
    </div>
  );
}

export default AnnouncementCard;
