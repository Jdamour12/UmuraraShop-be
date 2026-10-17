import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../App.css"

const HomeSlider = () => {
  return (
    <div className="homeSlider py-4">
        <Swiper spaceBetween={20} slidesPerView={1.2} centeredSlides={true} navigation={true} modules={[Navigation]} className="sliderHome">
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
                <img
              src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792265798/Gemini_Generated_Image_alkbjualkbjualkb_gv6273.jpg"
              alt="Big Sale"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792265799/Gemini_Generated_Image_o4ijvdo4ijvdo4ij_n7ugzi.jpg"
              alt="Big Sale"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792265798/Gemini_Generated_Image_bsoqz6bsoqz6bsoq_zvztra.jpg"
              alt="Big Sale"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792265796/Gemini_Generated_Image_keql7qkeql7qkeql_thtqgv.jpg"
              alt="Big Sale"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dlolgwt7z/image/upload/v1792265796/Gemini_Generated_Image_1deisj1deisj1dei_youwb4.jpg"
              alt="Big Sale"
            />
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  );
};

export default HomeSlider;
