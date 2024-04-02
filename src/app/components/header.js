"use client";
import { useState } from "react";
import { NavItem } from "./nav";
import NavMobile from "./navMobile";
import { useEffect, createContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const burgerMenuContext = createContext();

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [burgerIsActive, setBurgerIsActive] = useState(false);
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(null);
  const [currentBurgerMenu, setCurrentBurgerMenu] = useState(null);
  const [dataHeader, setDataHeader] = useState([
    {
      id: 1,
      name: "Home",
      slug: "/",
      children: null,
    },
    {
      id: 2,
      name: "Solutions",
      slug: null,
      children: [
        {
          id: 1,
          name: "Products",
          slug: "/products",
          children: null,
        },
        {
          id: 2,
          name: "Projects",
          slug: "/projects",
          children: null,
        },
        {
          id: 3,
          name: "Services",
          slug: "/services",
          children: null,
        },
      ],
    },
    {
      id: 3,
      name: "News",
      slug: "/news",
      children: null,
    },
    {
      id: 4,
      name: "About",
      slug: null,
      children: [
        {
          id: "1",
          name: "Company",
          slug: "/company",
          children: null,
        },
        {
          id: "2",
          name: "Teams",
          slug: "/teams",
          children: null,
        },
        {
          id: "3",
          name: "Contact",
          slug: "/contact",
          children: null,
        },
      ],
    },
  ]);
  const pathName = usePathname();
  const listenScroll = () => {
    const { scrollY } = window;
    scrollY > 10 ? setScrolled(true) : setScrolled(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScroll);
    return () => window.removeEventListener("scroll", listenScroll);
  });

  useEffect(() => {
    if (burgerIsActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [burgerIsActive]);

  useEffect(() => {
    dataHeader.map((item, index) => {
      if (item.slug && pathName === item.slug) {
        setActiveBurgerMenu(item.id);
        setCurrentBurgerMenu(item.id);
      } else if (item.children) {
        if (item.children.some((item) => pathName === item.slug)) {
          setActiveBurgerMenu(item.id);
          setCurrentBurgerMenu(item.id);
        }
      }
    });
  }, [dataHeader, pathName, activeBurgerMenu]);

  return (
    <burgerMenuContext.Provider
      value={{
        setBurgerIsActive,
        currentBurgerMenu,
        setCurrentBurgerMenu,
      }}
    >
      <div
        id="header"
        className={
          "fixed w-full -top-px flex flex-col gal-1 justify-center items-center z-30 text-b0" +
          (pathName !== "/" || scrolled || burgerIsActive
            ? " bg-b0 shadow-nav text-b900"
            : "")
        }
      >
        <div className="box-border xl:w-90 w-full md:px-7five sm:px-4 xs:px-1 py-1 sm:py-0 flex flex-row justify-between items-center">
          <Link href={"/"} className="h-8 w-auto relative">
            <svg
              width="88"
              height="32"
              viewBox="0 0 88 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8 11.04C20.8 9.53779 19.5822 8.32 18.08 8.32H13.248V13.76H14.08V17.088H13.2477V24.512H8.95972V4.928H19.2C22.5579 4.928 25.28 7.65011 25.28 11.008C25.28 14.3659 22.5579 17.088 19.2 17.088H18.368V13.7449C19.7348 13.6011 20.8 12.4449 20.8 11.04Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-r300 "
                      : "fill-b0 "
                    : "fill-r300 "
                }
              />
              <path
                d="M18.048 9.28H14.4V26.88H18.048V9.28Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-r300 "
                      : "fill-b0 "
                    : "fill-r300 "
                }
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 30.272C23.8822 30.272 30.272 23.8822 30.272 16C30.272 8.11779 23.8822 1.728 16 1.728C8.11779 1.728 1.728 8.11779 1.728 16C1.728 23.8822 8.11779 30.272 16 30.272ZM16 29.76C23.5994 29.76 29.76 23.5994 29.76 16C29.76 8.40056 23.5994 2.24 16 2.24C8.40056 2.24 2.24 8.40056 2.24 16C2.24 23.5994 8.40056 29.76 16 29.76Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-r300 "
                      : "fill-b0 "
                    : "fill-r300 "
                }
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 30.976C24.271 30.976 30.976 24.271 30.976 16C30.976 7.72898 24.271 1.024 16 1.024C7.72898 1.024 1.024 7.72898 1.024 16C1.024 24.271 7.72898 30.976 16 30.976Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-r300 "
                      : "fill-b0 "
                    : "fill-r300 "
                }
              />
              <path
                d="M41.0114 22V10.3636H45.6023C46.4848 10.3636 47.2367 10.5322 47.858 10.8693C48.4792 11.2027 48.9527 11.6667 49.2784 12.2614C49.608 12.8523 49.7727 13.5341 49.7727 14.3068C49.7727 15.0795 49.6061 15.7614 49.2727 16.3523C48.9394 16.9432 48.4564 17.4034 47.8239 17.733C47.1951 18.0625 46.4337 18.2273 45.5398 18.2273H42.6136V16.2557H45.142C45.6155 16.2557 46.0057 16.1742 46.3125 16.0114C46.6231 15.8447 46.8542 15.6155 47.0057 15.3239C47.161 15.0284 47.2386 14.6894 47.2386 14.3068C47.2386 13.9205 47.161 13.5833 47.0057 13.2955C46.8542 13.0038 46.6231 12.7784 46.3125 12.6193C46.0019 12.4564 45.608 12.375 45.1307 12.375H43.4716V22H41.0114ZM53.831 10.3636V22H51.3707V10.3636H53.831ZM65.5881 10.3636V22H63.4631L58.4006 14.6761H58.3153V22H55.8551V10.3636H58.0142L63.0369 17.6818H63.1392V10.3636H65.5881ZM73.9332 13.7102C73.8878 13.2519 73.6927 12.8958 73.348 12.642C73.0033 12.3883 72.5355 12.2614 71.9446 12.2614C71.5431 12.2614 71.2041 12.3182 70.9276 12.4318C70.651 12.5417 70.4389 12.6951 70.2912 12.892C70.1473 13.089 70.0753 13.3125 70.0753 13.5625C70.0677 13.7708 70.1113 13.9527 70.206 14.108C70.3045 14.2633 70.4389 14.3977 70.6094 14.5114C70.7798 14.6212 70.9768 14.7178 71.2003 14.8011C71.4238 14.8807 71.6624 14.9489 71.9162 15.0057L72.9616 15.2557C73.4692 15.3693 73.9351 15.5208 74.3594 15.7102C74.7836 15.8996 75.151 16.1326 75.4616 16.4091C75.7723 16.6856 76.0128 17.0114 76.1832 17.3864C76.3575 17.7614 76.4465 18.1913 76.4503 18.6761C76.4465 19.3883 76.2647 20.0057 75.9048 20.5284C75.5488 21.0473 75.0336 21.4508 74.3594 21.7386C73.6889 22.0227 72.8802 22.1648 71.9332 22.1648C70.9938 22.1648 70.1757 22.0208 69.4787 21.733C68.7855 21.4451 68.2438 21.0189 67.8537 20.4545C67.4673 19.8864 67.2647 19.1837 67.2457 18.3466H69.6264C69.6529 18.7367 69.7647 19.0625 69.9616 19.3239C70.1624 19.5814 70.4295 19.7765 70.7628 19.9091C71.0999 20.0379 71.4806 20.1023 71.9048 20.1023C72.3215 20.1023 72.6832 20.0417 72.9901 19.9205C73.3007 19.7992 73.5412 19.6307 73.7116 19.4148C73.8821 19.1989 73.9673 18.9508 73.9673 18.6705C73.9673 18.4091 73.8897 18.1894 73.7344 18.0114C73.5829 17.8333 73.3594 17.6818 73.0639 17.5568C72.7723 17.4318 72.4143 17.3182 71.9901 17.2159L70.723 16.8977C69.742 16.6591 68.9673 16.286 68.3991 15.7784C67.831 15.2708 67.5488 14.5871 67.5526 13.7273C67.5488 13.0227 67.7363 12.4072 68.1151 11.8807C68.4976 11.3542 69.0223 10.9432 69.6889 10.6477C70.3556 10.3523 71.1132 10.2045 71.9616 10.2045C72.8253 10.2045 73.5791 10.3523 74.223 10.6477C74.8707 10.9432 75.3745 11.3542 75.7344 11.8807C76.0942 12.4072 76.2798 13.017 76.2912 13.7102H73.9332ZM77.6619 12.392V10.3636H87.2188V12.392H83.6562V22H81.2244V12.392H77.6619Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-r300 "
                      : "fill-b0 "
                    : "fill-r300 "
                }
              />
            </svg>
          </Link>
          <div className="hidden sm:flex flex-row">
            {dataHeader &&
              dataHeader.map((item, index) => {
                return (
                  <NavItem
                    key={index}
                    scroll={scrolled}
                    slug={item.slug}
                    text={item.name}
                  >
                    {item.children}
                  </NavItem>
                );
              })}
          </div>
          <div className="flex sm:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setBurgerIsActive(!burgerIsActive)}
            >
              <path
                d="M3.33334 15C3.09723 15 2.89917 14.92 2.73917 14.76C2.57917 14.6 2.49945 14.4022 2.5 14.1667C2.5 13.9306 2.58 13.7325 2.74 13.5725C2.9 13.4125 3.09778 13.3328 3.33334 13.3333H16.6667C16.9028 13.3333 17.1008 13.4133 17.2608 13.5733C17.4208 13.7333 17.5006 13.9311 17.5 14.1667C17.5 14.4028 17.42 14.6008 17.26 14.7608C17.1 14.9208 16.9022 15.0006 16.6667 15H3.33334ZM3.33334 10.8333C3.09723 10.8333 2.89917 10.7533 2.73917 10.5933C2.57917 10.4333 2.49945 10.2356 2.5 10C2.5 9.76389 2.58 9.56584 2.74 9.40584C2.9 9.24584 3.09778 9.16611 3.33334 9.16667H16.6667C16.9028 9.16667 17.1008 9.24667 17.2608 9.40667C17.4208 9.56667 17.5006 9.76445 17.5 10C17.5 10.2361 17.42 10.4342 17.26 10.5942C17.1 10.7542 16.9022 10.8339 16.6667 10.8333H3.33334ZM3.33334 6.66667C3.09723 6.66667 2.89917 6.58667 2.73917 6.42667C2.57917 6.26667 2.49945 6.06889 2.5 5.83334C2.5 5.59723 2.58 5.39917 2.74 5.23917C2.9 5.07917 3.09778 4.99945 3.33334 5H16.6667C16.9028 5 17.1008 5.08 17.2608 5.24C17.4208 5.4 17.5006 5.59778 17.5 5.83334C17.5 6.06945 17.42 6.2675 17.26 6.4275C17.1 6.5875 16.9022 6.66723 16.6667 6.66667H3.33334Z"
                fill="white"
                className={
                  pathName == "/"
                    ? scrolled || burgerIsActive
                      ? "fill-b500 "
                      : "fill-b0 "
                    : "fill-b500 "
                }
              />
            </svg>
          </div>
        </div>
        {burgerIsActive && (
          <div className="flex flex-col gap-0 bg-b0 h-screen sm:hidden w-full overflow-auto">
            {dataHeader &&
              burgerIsActive &&
              activeBurgerMenu &&
              dataHeader.map((item, index) => {
                return (
                  <NavMobile
                    key={index}
                    isActive={
                      (item.id == activeBurgerMenu &&
                        currentBurgerMenu == item.id) ||
                      currentBurgerMenu == item.id
                    }
                    menuId={item.id}
                    slug={item.slug}
                    text={item.name}
                  >
                    {item.children}
                  </NavMobile>
                );
              })}
          </div>
        )}
      </div>
    </burgerMenuContext.Provider>
  );
}
export default Header;
