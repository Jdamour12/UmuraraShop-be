import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider w-full px-5">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792277108/ulami-watch-1311821_1920_em2xyq.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>
        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792276675/nanadua11-iphone-4773552_1920_dnvnpj.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792277108/ulami-watch-1311821_1920_em2xyq.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792276675/nanadua11-iphone-4773552_1920_dnvnpj.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792276675/nanadua11-iphone-4773552_1920_dnvnpj.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792277108/ulami-watch-1311821_1920_em2xyq.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792277108/ulami-watch-1311821_1920_em2xyq.jpg" alt="Tablet Phone" className="w-60px] transition-all" />
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792276675/nanadua11-iphone-4773552_1920_dnvnpj.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

          <SwiperSlide>
            <Link to="/">
            <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                <img src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792276675/nanadua11-iphone-4773552_1920_dnvnpj.jpg" alt="Tablet Phone" className="w-60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
            </div>
            </Link>
        </SwiperSlide>

        </Swiper>
    </div>
  );
};

export default HomeCatSlider;
