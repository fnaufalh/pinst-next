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
  if (children) {
    children.carouselImage.map((item, index) => {
      content.push(
        <div key={index} className="w-full h-hero relative">
          <Image
            fill
            key={index}
            src={item.url}
            alt={item.name}
            sizes="(min-width: 320px) 100vh"
            className="object-cover"
            priority
            quality={100}
          />
        </div>
      );
    });
  }

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
      {children && (
        <div className="absolute flex items-end justify-center inset-0 bg-hero-pattern h-hero">
          <div className="w-full flex justify-center bg-b900 bg-opacity-60 bottom-0 mx-0">
            <div className="box-border xl:w-90 w-full md:px-7five sm:px-4 p-1 sm:py-1five flex flex-col sm:flex-row items-center">
              <div className="flex flex-row gap-0five sm:gap-1 w-full">
                {children && (
                  <div className="w-4 h-4 hidden sm:block sm:relative">
                    <Image
                      fill
                      src={children.logo.url}
                      alt={children.logo.name}
                    />
                  </div>
                )}
                {children && (
                  <div className="flex flex-col justify-start sm:justify-center text-b0 border-b-[1px] border-b0 border-solid sm:border-none w-full pb-1 sm:pb-0">
                    <span className="font-bold text-center sm:text-left">
                      {children.title}
                    </span>
                    <span className="caption-1 text-center sm:text-left">
                      {children.slogan}
                    </span>
                  </div>
                )}
              </div>
              {children && (
                <div className="flex flex-col lg:flex-row justify-start sm:justify-end text-b0 w-full pt-1 sm:pt-0 lg:gap-2 gap-0five">
                  <span className="text-center justify-center sm:justify-end sm:text-right caption-1 flex items-end">
                    {children.partnerLabel}
                  </span>
                  <div className="flex flex-wrap justify-center items-end md:justify-end gap-1five">
                    {children.partnerBrands.map((brand, index) => (
                      <div
                        key={index}
                        className="min-w-[49px] sm:min-w-[75px] min-h-[28px] sm:min-h-[43px] relative"
                      >
                        <Image
                          src={brand.url}
                          alt={brand.name}
                          fill
                          sizes="(max-width: 160px) 100vw, 160px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Hero, HeroMain };
