"use client";
import Image from "next/image";
import { Menu } from "../components/menu";
import { useEffect, useState } from "react";

const SidebarMenu = () => {
  const [isActive, setIsActive] = useState([true, false]);

  const listenPopState = () => {
    const hashtag = window.location.hash;
    if (!hashtag || hashtag == "#recently") {
      setIsActive([true, false]);
    } else {
      setIsActive([false, true]);
    }
  };

  const listenScroll = () => {
    const { scrollY } = window;
    scrollY == 0 ? setIsActive([true, false]) : null;
  };

  useEffect(() => {
    if (window.location.hash) {
      listenPopState();
    }
  }, []);
  useEffect(() => {
    window.addEventListener("popstate", listenPopState);
    window.addEventListener("scroll", listenScroll);
    return () => {
      window.removeEventListener("popstate", listenPopState);
    };
  });

  return (
    <>
      <div className="hidden sm:flex sm:w-10 md:w-auto flex-col sticky top-6 items-start h-full">
        <Menu to="#recently" text="Recent Projects" active={isActive[0]} />
        <Menu
          to="#maintenance"
          text="Maintenance Projects"
          active={isActive[1]}
        />
      </div>
      <a
        href={isActive[0] ? "#maintenance" : "#recently"}
        className={`flex sm:hidden ${
          isActive[0] ? "items-start" : "items-end"
        } fixed h-4 bottom-1 right-1 p-0twofive bg-r300 rounded-full`}
        onClick={listenPopState}
      >
        <Image
          src={"/images/icons/icon-o-chevron-down.svg"}
          alt="chevron down"
          width={32}
          height={32}
          sizes="(min-width: 320px) 100vw"
          className={`transition transform-gpu ${
            isActive[0] ? "rotate-0" : "rotate-180"
          }`}
        />
      </a>
    </>
  );
};

export default SidebarMenu;
