import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

const swiperSlideStyle = "flex items-center justify-center w-full h-full";

const ImageElement = ({ src }) => {
  return (
    <img className="block w-[100%] h-[100%] object-cover" src={src} alt="" />
  );
};

const PhotoSlider = () => {
  return (
    <div className="w-full max-w-7xl h-[15rem] sm:h-[20rem] md:h-[28rem] relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        centerInsufficientSlides={true}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        <SwiperSlide className={swiperSlideStyle}>
          <ImageElement src="/logos/photo-slider/kmutt_building.jpg" />
        </SwiperSlide>
        <SwiperSlide className={swiperSlideStyle}>
          <ImageElement src="/logos/photo-slider/kmutt_lx.jpg" />
        </SwiperSlide>
        <SwiperSlide className={swiperSlideStyle}>
          <ImageElement src="/logos/photo-slider/kmutt_night_view.jpg" />
        </SwiperSlide>
        <SwiperSlide className={swiperSlideStyle}>
          <ImageElement src="/logos/photo-slider/kmutt_football_stadium.jpg" />
        </SwiperSlide>
        <SwiperSlide className={swiperSlideStyle}>
          <ImageElement src="/logos/photo-slider/kmutt_lake.jpg" />
        </SwiperSlide>
      </Swiper>

      {/* Text and Overlay */}
      {/* <div className="flex items-center justify-center absolute z-10 top-0 right-0 bottom-0 left-0 mx-auto my-auto w-fit h-fit bg-black/40 p-[1rem]">
        <span className="text-white font-geologica text-2xl tracking-[0.2rem] font-semibold">
          ADVANCE YOUR CAREER
        </span>
      </div> */}
    </div>
  );
};

export default PhotoSlider;
