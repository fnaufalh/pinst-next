"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "./button";

const ListItem = ({
  name,
  image,
  active,
  showDescription,
  description,
  clickAction,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const clickMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <div
        className={
          (active ? "bg-r300 text-b0 " : "bg-b0 ") +
          "w-full p-1five hover:bg-r300 hover:text-b0 hover:cursor-pointer no-underline flex flex-row gap-0five items-center justify-start"
        }
        onClick={() => {
          if (showDescription) {
            clickMenu();
          } else {
            clickAction();
          }
        }}
      >
        {image && (
          <div className="w-2five h-1five relative">
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_URL + image.url}
              alt={image.name}
              fill
              sizes="(min-width: 320px) 100vw"
            />
          </div>
        )}
        <div className="w-full flex flex-row items-center">{name}</div>
        {showDescription && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className={active || isHovered ? "fill-b0 " : "fill-b500 "}
          >
            <path d="M10.4999 9.99935L7.24992 6.74935C7.09714 6.59657 7.02075 6.40213 7.02075 6.16602C7.02075 5.9299 7.09714 5.73546 7.24992 5.58268C7.4027 5.4299 7.59714 5.35352 7.83325 5.35352C8.06936 5.35352 8.26381 5.4299 8.41659 5.58268L12.2499 9.41602C12.3333 9.49935 12.3924 9.58963 12.4274 9.68685C12.4624 9.78407 12.4796 9.88824 12.4791 9.99935C12.4791 10.1105 12.4616 10.2146 12.4266 10.3118C12.3916 10.4091 12.3327 10.4993 12.2499 10.5827L8.41659 14.416C8.26381 14.5688 8.06936 14.6452 7.83325 14.6452C7.59714 14.6452 7.4027 14.5688 7.24992 14.416C7.09714 14.2632 7.02075 14.0688 7.02075 13.8327C7.02075 13.5966 7.09714 13.4021 7.24992 13.2493L10.4999 9.99935Z" />
          </svg>
        )}
      </div>
      {showDescription && (
        <div
          className={
            (toggleMenu ? "inline " : "hidden ") +
            " flex flex-col gap-1five w-full p-1five border-solid border-b40 border-b-2 items-center "
          }
        >
          {description ? description : "No Descriptions"}
          <Button
            text="See Products"
            clickAction={() => clickAction()}
            fullWidth={true}
          />
        </div>
      )}
    </>
  );
};

export { ListItem };
