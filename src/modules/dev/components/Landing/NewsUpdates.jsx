import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

const swiperSlideStyle = "h-auto";

const ImageElement = ({ src }) => {
  return (
    <img
      className="w-full h-[8rem] sm:h-[10rem] lg:h-[12rem] object-cover object-top"
      src={src}
      alt=""
    />
  );
};

const SwiperElement = ({ src, title, description, date }) => {
  return (
    <div className="w-fit h-fit">
      <ImageElement src={src} />
      <div className="flex flex-col p-[1rem] gap-2">
        <p className="font-geologica font-semibold text-sm">
          {title || "Some Event Name"}
        </p>
        <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
        <p className="font-geologica text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi atque
          nihil suscipit deleniti totam est aspernatur, labore consectetur vitae
          omnis tenetur, aliquid at ut itaque, libero laudantium ducimus
          recusandae. Itaque.
        </p>
        <p className="self-end font-geologica text-sm italic">
          {date ? date : "20 JANUARY 2024"}
        </p>
      </div>
    </div>
  );
};

const NewsUpdates = () => {
  return (
    <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-4 sm:gap-6 navigation-update">
      {/* Title */}
      <div className="w-[90%] h-fit flex flex-col itemse-center justify-start">
        <p className="font-geologica font-bold text-[20px] px-[1rem]">
          News Updates
        </p>
        <div className="w-[12.5rem] h-[1.5px] rounded-full bg-gradient-to-t from-[#C2544D] to-[#F09107]" />
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
            <SwiperElement
              src="/logos/news-events/algorithm_news.webp"
              title="Logical Awakening"
              date="23 FEBRUARY 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/earth_news.webp"
              title="Digital Earth"
              date="23 AUGUST 2027"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/llm_news.webp"
              title="Replacing Humans"
              date="30 FEBRUARY 2022"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/physics_news.webp"
              title="Computers in Physics"
              date="31 JANUARY 2023"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/quantum_news.webp"
              title="Quantum Computing"
              date="26 DECEMBER 2019"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/scary_news.webp"
              title="Scary AI"
              date="30 FEBRUARY 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/kmutt_certificate.png"
              title="Wai Kru Ceremony"
              date="18 SEPTEMBER 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <SwiperElement
              src="/logos/news-events/sit_openhouse.png"
              title="SIT Open House"
              date="11 NOVEMBER 2024"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewsUpdates;
