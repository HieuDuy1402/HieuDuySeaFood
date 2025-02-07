"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

export default function Carousel({
  slides = [
    { img: "banner.jpg", title: "Chào mừng đến với Hiếu Duy SeaFood", subtitle: "Ưu đãi tốt nhất dành riêng cho bạn", buttonText: "Xem Ngay", link: "/shop" },
    { img: "banner1.jpg", title: "Bộ sưu tập nổi bật", subtitle: "Lựa chọn hấp dẫn", buttonText: "Xem Ngay", link: "/shop" },
    { img: "banner2.jpg", title: "Hàng mới mỗi tuần", subtitle: "Hàng mới về mỗi tuần tha hồ lựa chọn", buttonText: "Xem Ngay", link: "/shop" },
    { img: "banner3.jpg", title: "Ưu đãi độc quyền", subtitle: "Đừng bỏ lỡ ưu đãi của chúng tôi", buttonText: "Xem Ngay", link: "/shop" },
    { img: "banner4.jpg", title: "Khuyến mại giảm giá", subtitle: "Giảm giá lên đến 50%", buttonText: "Xem Ngay", link: "/shop" },
  ],
}) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    afterChange: (index) => setCurrent(index),
  };

  const goToSlide = (index) => {
    setCurrent(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="overflow-hidden relative">
      <SlickSlider {...settings} ref={sliderRef}>
        {Array.isArray(slides) &&
          slides.map((slide, index) => (
            <div key={index} className="relative">
              <img
                src={slide.img}
                alt={`slide-${index}`}
                className="w-full h-80 object-cover rounded-b-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="text-xl mt-2">{slide.subtitle}</p>
                <a
                  href={slide.link}
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          ))}
      </SlickSlider>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-4 flex justify-center gap-3 w-full z-10">
        {Array.isArray(slides) &&
          slides.map((s, i) => (
            <div
              key={"circle" + i}
              onClick={() => goToSlide(i)}
              className={`rounded-full w-4 h-4 cursor-pointer ${
                i === current ? "bg-blue-500" : "bg-gray-500"
              }`}
            ></div>
          ))}
      </div>
    </div>
  );
}
