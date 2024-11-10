import Carousel from "./Carousel";

function NewsCard() {
  const images = [
    "/regis/newsHolder.jpg",
    "/regis/newsHolder.jpg",
    "/regis/newsHolder.jpg",
    "/regis/newsHolder.jpg",
    "/regis/newsHolder.jpg",
  ];
  return (
    <div className="my-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">News & Updates</h2>
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

export default NewsCard;
