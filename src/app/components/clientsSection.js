"use client";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ClientsSection = ({ children }) => {
  let content = [];
  children.map((item, index) => {
    content.push(
      <div
        key={index}
        className="flex justify-center filter grayscale hover:grayscale-0 transition ease-in"
      >
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + item.url}
          alt={item.name}
          width={64}
          height={64}
          className="min-w-4 min-h-4"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
    );
  });
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
