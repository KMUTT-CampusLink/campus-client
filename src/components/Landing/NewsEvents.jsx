import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

const swiperSlideStyle =
  "w-full h-[15rem] md:h-[20rem] lg:h-[25rem] flex items-center justify-center";

const ImageElement = ({ src }) => {
  return (
    <img
      className="w-full md:w-[60%] h-full object-cover object-top"
      src={src}
      alt=""
    />
  );
};

const NewsElement = () => {
  return (
    <div className="hidden md:flex flex-col flex-1 h-full p-[1rem] gap-4">
      {/* Title */}
      <p className="font-geologica font-semibold text-lg">Some Event Name</p>
      {/* Line */}
      <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
      {/* Description */}
      <p className="font-geologica text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        officia, necessitatibus repellat ducimus architecto maiores omnis
        quaerat laboriosam beatae ab fugit eum nam at. Numquam ullam voluptate
        dignissimos esse quam!
      </p>
      {/* Date */}
      <p className="self-end font-geologica text-sm italic">20 JANUARY 2024</p>
    </div>
  );
};

const NewsEvents = () => {
  return (
    <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-4 sm:gap-6">
      {/* Title */}
      <div className="w-fit h-fit flex flex-col items-center justify-center">
        <p className="font-geologica font-bold text-[20px]">News & Events</p>
        <div className="w-[20rem] h-[1.5px] rounded-full bg-gradient-to-t from-[#C2544D] to-[#F09107]" />
      </div>

      {/* Slider */}
      <div className="w-[90%] bg-[#F8F8F8] drop-shadow-md flex items-start justify-center">
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          loop={true}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full flex flex-col gap-2"
        >
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/kmutt_certificate.png" />
            <NewsElement />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/sit_openhouse.png" />
            <NewsElement />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/kmutt_certificate.png" />
            <NewsElement />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewsEvents;
