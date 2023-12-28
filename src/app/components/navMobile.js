"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useContext, createContext } from "react";
import { usePathname } from "next/navigation";
import { burgerMenuContext } from "./header";

const globalContext = createContext();

const NavMobile = ({ isActive, menuId, text, slug, children }) => {
  const pathName = usePathname();
  const { setBurgerIsActive, setCurrentBurgerMenu, currentBurgerMenu } =
    useContext(burgerMenuContext);
  const [openChild, setOpenChild] = useState();
  const [isRotate, setIsRotate] = useState(false);
  const dropdownRef = useRef();

  const handleToggle = () => {
    setOpenChild(!openChild);
    setCurrentBurgerMenu(menuId);
    setIsRotate(!isRotate);
  };

  const handleClickLink = () => {
    setBurgerIsActive(false);
  };

  useEffect(() => {
    if (isActive && currentBurgerMenu) {
      setOpenChild(true);
    } else {
      setOpenChild(false);
    }
  }, [setOpenChild, isActive, currentBurgerMenu]);

  return (
    <globalContext.Provider
      value={{
        pathName,
        isActive,
        isRotate,
        setIsRotate,
        menuId,
        openChild,
        currentBurgerMenu,
      }}
    >
      <div
        className={"nav-item w-auto hover:bg-r300 hover:text-b0 no-underline "}
        onClick={handleToggle}
        ref={dropdownRef}
      >
        <div>
          <GenerateLink
            slug={slug}
            text={text}
            isRotate={isRotate}
            handleClickLink={() => handleClickLink()}
          />
          {children && (
            <div
              className={
                (openChild ? "flex " : "hidden ") + "flex-col justify-start"
              }
            >
              {children.map((item, index) => (
                <SubNavItem
                  key={index}
                  slug={item.slug}
                  text={item.name}
                  isActive={pathName == item.slug}
                  handleClickLink={() => handleClickLink()}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </globalContext.Provider>
  );
};

const SubNavItem = (props) => {
  return (
    <Link
      href={props.slug}
      className={
        "w-full pl-2five pr-1 py-1five hover:bg-r300 hover:text-b0 hover:cursor-pointer " +
        (props.isActive ? "bg-r300 text-b0 " : "bg-b0 text-b900")
      }
      onClick={props.handleClickLink}
    >
      {props.text}
    </Link>
  );
};

const GenerateLink = (props) => {
  const { isActive, menuId, openChild, currentBurgerMenu } =
    useContext(globalContext);

  const generateChevron = () => {
    return (
      <div
        className={
          "transform flex justify-center items-center " +
          (openChild ? "rotate-180" : "rotate-0")
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.74935 10.7493L12.9993 7.49935C13.1521 7.34657 13.3466 7.27018 13.5827 7.27018C13.8188 7.27018 14.0132 7.34657 14.166 7.49935C14.3188 7.65213 14.3952 7.84657 14.3952 8.08268C14.3952 8.31879 14.3188 8.51324 14.166 8.66602L10.3327 12.4993C10.2493 12.5827 10.1591 12.6416 10.0618 12.676C9.96463 12.7105 9.86046 12.728 9.74935 12.7285C9.63824 12.7285 9.53407 12.711 9.43685 12.676C9.33963 12.641 9.24935 12.5821 9.16602 12.4993L5.33268 8.66602C5.1799 8.51324 5.10352 8.31879 5.10352 8.08268C5.10352 7.84657 5.1799 7.65213 5.33268 7.49935C5.48546 7.34657 5.6799 7.27018 5.91602 7.27018C6.15213 7.27018 6.34657 7.34657 6.49935 7.49935L9.74935 10.7493Z"
            fill={isActive || currentBurgerMenu == menuId ? "#fff" : "#5c5555"}
          />
        </svg>
      </div>
    );
  };

  if (props.slug) {
    return (
      <Link
        href={props.slug}
        className={
          (isActive ? "bg-r300 text-b0 " : "bg-transparent ") +
          "w-full flex flex-row py-1five px-1"
        }
        onClick={props.handleClickLink}
      >
        {props.text}
      </Link>
    );
  } else {
    return (
      <div
        className={
          (isActive ? "bg-r300 text-b0 " : "bg-transparent ") +
          "flex flex-row gap-1 py-1five px-1 hover:bg-r300 hover:text-b0"
        }
      >
        <div className="w-full">{props.text}</div>
        {generateChevron()}
      </div>
    );
  }
};

export default NavMobile;
