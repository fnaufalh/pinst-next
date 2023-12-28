"use client";
import Image from "next/image";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const Hero = ({ title }) => {
  return (
    <div className="w-full flex justify-center bg-r300 pt-4five">
      <div className="box-border w-full xl:w-90 px-1 sm:px-4 md:px-7five py-1 sm:py-4 lg:py-4 flex flex-col items-start gap-0five">
        <div
          className="bg-b0"
          style={{ width: "3.75rem", height: "0.25rem" }}
        ></div>
        <div className="heading-1 text-b0">{title}</div>
      </div>
    </div>
  );
};

const HeroMain = ({ children }) => {
  let content = [];
  children.carouselImage.map((item, index) => {
    content.push(
      <div key={index} className="w-full h-hero relative">
        <Image
          fill
          key={index}
          src={process.env.NEXT_PUBLIC_STRAPI_URL + item.url}
          alt={item.name}
          sizes="(min-width: 320px) 100vh"
          className="object-cover"
          priority
          quality={100}
        />
      </div>
    );
  });

  const settings = {
    slidesToShow: 1, // This use max-width
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    arrows: false,
    dots: false,
  };
  return (
    <>
      <div className="slider-wrapper-hero h-hero w-full">
        <Slider {...settings}>{content}</Slider>
      </div>
      <div className="absolute flex items-end justify-center inset-0 bg-hero-pattern h-hero">
        <div className="absolute flex flex-row items-center gap-1 p-1five bg-b900 bg-opacity-60 bottom-1 sm:bottom-4 mx-1 sm:mx-0">
          <div className="w-4 h-4 hidden sm:block sm:relative">
            <Image
              fill
              src={process.env.NEXT_PUBLIC_STRAPI_URL + children.logo.url}
              alt={children.logo.name}
            />
          </div>
          <div className="flex flex-col justify-start gap-0five text-b0">
            <span className="font-bold text-center sm:text-left">
              {children.title}
            </span>
            <span className="text-center sm:text-left">{children.slogan}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export { Hero, HeroMain };
