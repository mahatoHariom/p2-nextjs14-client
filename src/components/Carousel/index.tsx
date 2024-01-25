"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
const Carousel = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="mySwiper h-[20rem] sm:h-[30rem] md:h-[40rem]  w-full"
    >
      <SwiperSlide>
        <Image
          src={"/bb2.jpeg"}
          // objectFit="cover" 
          fill={true} alt="dsdsdf"
          className="object-cover" 
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={"/bb1.jpeg"} 
        // objectFit="cover" 
        fill={true} alt="dsdsdf"
        className="object-cover"  />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
