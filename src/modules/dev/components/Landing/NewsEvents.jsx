import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

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

const NewsElement = ({ title, description, date }) => {
  return (
    <div className="hidden md:flex flex-col flex-1 h-full p-[1rem] gap-4">
      {/* Title */}
      <p className="font-geologica font-semibold text-lg">{title}</p>
      {/* Line */}
      <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-[#C2544D] to-[#F09107]" />
      {/* Description */}
      <p className="font-geologica text-sm">{description}</p>
      {/* Date */}
      <p className="self-end font-geologica text-sm italic">{date}</p>
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
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full flex flex-col gap-2"
        >
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/ai_news.avif" />
            <NewsElement
              title="Letting AI Go Wild"
              description="Researchers have developed a method that helps large language models (LLMs) recognize situations where they should request additional information to improve their accuracy. This breakthrough could make AI systems more reliable in handling complex queries."
              date="5 November 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/human_ai.avif" />
            <NewsElement
              title="Enhancing Remote Sensing"
              description="A new frequency-independent feature learning framework was created to improve the fusion of remote sensing images. This innovation could enhance applications in satellite imagery and environmental monitoring."
              date="12 December 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/news_ai.avif" />
            <NewsElement
              title="Pancreatic Cancer Scanning With AI"
              description="MIT researchers unveiled an AI model capable of assessing patients' risk for pancreatic cancer, potentially expanding early screening benefits to 35% of patients, a significant increase from the current 10%."
              date="20 January 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/robot_news.avif" />
            <NewsElement
              title="Robots Replacing Humans"
              description="MIT researchers developed a new model called Heterogeneous Pretrained Transformers (HPT) to train robots using multi-sensor data. This method enhances the adaptability and efficiency of robots in diverse environments."
              date="23 February 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/sit_openhouse.png" />
            <NewsElement
              title="SIT Openhouse Event"
              description="Researchers have developed a method that helps large language models (LLMs) recognize situations where they should request additional information to improve their accuracy. This breakthrough could make AI systems more reliable in handling complex queries."
              date="5 November 2024"
            />
          </SwiperSlide>
          <SwiperSlide className={swiperSlideStyle}>
            <ImageElement src="/logos/news-events/kmutt_certificate.png" />
            <NewsElement
              title="KMUTT Certificate Event"
              description="MIT researchers developed a new model called Heterogeneous Pretrained Transformers (HPT) to train robots using multi-sensor data. This method enhances the adaptability and efficiency of robots in diverse environments."
              date="23 February 2024"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewsEvents;
