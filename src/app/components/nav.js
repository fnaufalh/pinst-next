"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useContext, createContext } from "react";
import { usePathname } from "next/navigation";

const globalContext = createContext();

const NavItem = ({ text, slug, children }) => {
  const pathName = usePathname();
  const [isActive, setIsActive] = useState(null);
  const [openChild, setOpenChild] = useState();
  const [isRotate, setIsRotate] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (slug && pathName === slug) {
      setIsActive(true);
    } else if (children) {
      setIsActive(children.some((item) => pathName === item.slug));
    } else {
      setIsActive(false);
    }
  }, [slug, pathName, children]);

  const handleToggle = () => {
    setOpenChild(!openChild);
    setIsActive(!isActive);
    setIsRotate(!isRotate);
  };

  return (
    <globalContext.Provider
      value={{ pathName, isActive, setIsActive, isRotate, setIsRotate }}
    >
      <div
        className={"nav-item w-auto hover:bg-r300 hover:text-b0 no-underline "}
        onClick={handleToggle}
        ref={dropdownRef}
      >
        <div>
          <GenerateLink slug={slug} text={text} className="w-full" />
          {children && (
            <div
              className={
                "sub-nav-item flex-col justify-start absolute top-full shadow-nav"
              }
            >
              {children.map((item, index) => (
                <SubNavItem key={index} slug={item.slug} text={item.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </globalContext.Provider>
  );
};

const SubNavItem = (props) => {
  const { pathName } = useContext(globalContext);
  let isActive = false;
  if (props.slug && pathName === props.slug) {
    isActive = true;
  }
  return (
    <Link
      href={props.slug}
      className={
        "w-auto p-1five hover:bg-r300 hover:text-b0 hover:cursor-pointer " +
        (isActive ? "bg-r300 text-b0 " : "bg-b0 text-b900")
      }
      onClick={props.handleClick}
    >
      {props.text}
    </Link>
  );
};

const GenerateLink = (props) => {
  const { isActive } = useContext(globalContext);
  if (props.slug) {
    return (
      <Link
        className={
          "block p-1five hover:bg-r300 hover:text-b0 " +
          (isActive ? "bg-r300 text-b0 " : "bg-transparent ")
        }
        href={props.slug}
      >
        {props.text}
      </Link>
    );
  } else {
    return (
      <div
        className={
          "block p-1five hover:bg-r300 hover:text-b0 " +
          (isActive ? "bg-r300 text-b0 " : "bg-transparent ")
        }
      >
        {props.text}
      </div>
    );
  }
};

export { NavItem, SubNavItem };
