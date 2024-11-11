import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

const swiperSlideStyle = "h-[8rem] sm:h-[10rem] lg:h-[12rem]";

const ImageElement = ({ src }) => {
  return (
    <img className="w-full h-full object-cover object-top" src={src} alt="" />
  );
};

const Announcer = () => {
  return (
    <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-4 sm:gap-6">
      {/* Title */}
      <div className="w-[90%] h-fit flex flex-col itemse-center justify-start">
        <p className="font-geologica font-bold text-[20px] px-[1rem]">
          Announcer
        </p>
        <div className="w-[9.5rem] h-[1.5px] rounded-full bg-gradient-to-t from-[#C2544D] to-[#F09107]" />
      </div>

      {/* Slider */}
      <div className="w-[90%] flex items-center justify-center">
        <Swiper
          modules={[Navigation, Scrollbar]}
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          scrollbar={{
            hide: true,
          }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/ai_news.avif" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/algorithm_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/human_ai.avif" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/earth_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/news_ai.avif" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/llm_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/robot_news.avif" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/physics_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/quantum_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/scary_news.webp" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/kmutt_certificate.png" />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/sit_openhouse.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Announcer;
