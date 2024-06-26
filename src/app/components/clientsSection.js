"use client";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ClientsSection = ({ children }) => {
  let content = [];
  if (children) {
    children.map((item, index) => {
      content.push(
        <div
          key={index}
          className="min-w-4 min-h-4 w-4 h-4 relative flex justify-center filter grayscale hover:grayscale-0 transition ease-in"
        >
          <Image
            fill
            sizes="(max-width: 160px) 100vw, 160px"
            src={item.url}
            alt={item.name}
          />
        </div>
      );
    });
  }
  const settings = {
    className: "slider variable-width",
    infinite: true,
    slidesToShow: 10, // This use max-width
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
        },
      },
    ],
  };
  return (
    <div className="slider-wrapper bg-b0 py-4">
      <Slider {...settings}>{content}</Slider>
    </div>
  );
};

export default ClientsSection;
