"use client";
import Image from "next/image";
import Overlay from "./overlay";
import { CardTeamModalHorizontal, CardTeamModalPortrait } from "./card";
import { ListItem } from "./listItem";
import {
  brandContext,
  catalogueContext,
  solutionContext,
  categoryContext,
} from "../products/page";
import { useContext } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const ModalDialog = ({ title, data, handleHide }) => {
  const generateDivisions = () => {
    return (
      <div className="w-full pt-1five">
        {data.division.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-1five">
              <div className="heading-4 flex flex-row gap-1 items-center">
                {item.name}
                <span className="w-full border-t border-b40 border-solid flex"></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                {item.employee.map((item, index) => {
                  return <CardTeamModalPortrait key={index} team={item} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Overlay />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="inset-x-1 md:inset-x-auto inset-y-1 sm:inset-y-4 p-1 sm:p-1five gap-1five w-auto md:w-50 z-50 bg-b0 flex flex-col fixed h-auto">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="heading-4 w-full">{title}</span>
            <Image
              height={20}
              width={20}
              src="/images/icons/icon-close.svg"
              alt="close"
              onClick={handleHide}
              sizes="(min-width: 320px) 100vw"
              className="h-1twofive w-1twofive cursor-pointer"
            />
          </div>
          <div className="flex flex-row justify-center gap-1five items-center">
            <div className="min-h-6twofive min-w-6twofive relative">
              <Image
                fill
                src={
                  data.leader.avatar.url
                }
                alt={data.leader.avatar.name}
                className="rounded-full h-1twofive w-1twofive"
                sizes="(min-width: 320px) 100vw"
              />
            </div>
            <div className="flex flex-col gap-0">
              <span className="caption-1">{data.leader.position}</span>
              <span className="heading-4">{data.leader.name}</span>
              <span className="caption-1">{data.leader.email}</span>
            </div>
          </div>
          <div className="overflow-auto">
            {process.env.NEXT_PUBLIC_UI_DIALOG_AVATAR === "true" && (
              <div className="flex flex-col gap-1 pb-1">
                {data.employee.map((item, index) => {
                  return <CardTeamModalHorizontal key={index} team={item} />;
                })}
              </div>
            )}
            {process.env.NEXT_PUBLIC_UI_DIALOG_AVATAR === "false" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pb-1">
                {data.employee.map((item, index) => {
                  return <CardTeamModalPortrait key={index} team={item} />;
                })}
              </div>
            )}
            {data.division && generateDivisions()}
          </div>
        </div>
      </div>
    </>
  );
};

const ModalDialogFilter = ({ title, data, showDescription, handleHide }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const { brand, setBrand, initBrand } = useContext(brandContext);
  const { catalogue, setCatalogue, initCatalogue, setCatalogues } =
    useContext(catalogueContext);
  const { solution, setSolution, initSolution, setSolutions } =
    useContext(solutionContext);
  const { category, setCategory, initCategory, setCategories } =
    useContext(categoryContext);

  const clickAction = (item) => {
    switch (title) {
      case "Brands":
        if (brand.name === item.name) {
          return;
        } else {
          setCatalogue(initCatalogue);
          setCatalogues(null);
          setSolution(initSolution);
          setSolutions(null);
          setCategory(initCategory);
          setCategories(null);
          setBrand(item);
          if (item.id === null) {
            newSearchParams.delete("brand");
          } else {
            newSearchParams.set("brand", item.id);
          }
          newSearchParams.delete("catalogue");
          newSearchParams.delete("solution"); 
          newSearchParams.delete("category");
          newSearchParams.delete("page");
          router.replace(pathname + "?" + newSearchParams.toString());
        }
        break;
      case "Catalogues":
        if (catalogue.name === item.name) {
          return;
        } else {
          setSolution(initSolution);
          setSolutions(null);
          setCategory(initCategory);
          setCategories(null);
          setCatalogue(item);
          if (item.id === null) {
            newSearchParams.delete("catalogue");
          } else {
            newSearchParams.set("catalogue", item.id);
          }
          newSearchParams.delete("solution");
          newSearchParams.delete("category");
          newSearchParams.delete("page");
          router.push(pathname + "?" + newSearchParams.toString());
        }
        break;
      case "Solutions":
        if (solution.name === item.name) {
          return;
        } else {
          setCategory(initCategory);
          setCategories(null);
          setSolution(item);
          if (item.id === null) {
            newSearchParams.delete("solution");
          } else {
            newSearchParams.set("solution", item.id);
          }
          newSearchParams.delete("category");
          newSearchParams.delete("page");
          router.push(pathname + "?" + newSearchParams.toString());
        }
        break;
      case "Categories":
        setCategory(item);
        if (item.id === null) {
          newSearchParams.delete("category");
        } else {
          newSearchParams.set("category", item.id);
        }
        newSearchParams.delete("page");
        router.push(pathname + "?" + newSearchParams.toString());
        break;
      default:
        break;
    }
    handleHide();
  };

  const isActive = (item) => {
    switch (title) {
      case "Brands":
        return brand.name === item ? true : false;
      case "Catalogues":
        return catalogue.name === item ? true : false;
      case "Solutions":
        return solution.name === item ? true : false;
      case "Categories":
        return category.name === item ? true : false;
      default:
        break;
    }
  };

  const generateContent = () => {
    let firstItem = null;
    switch (title) {
      case "Brands":
        firstItem = (
          <ListItem
            name={"All Brands"}
            active={brand.name === "All Brands" ? true : false}
            showDescription={showDescription}
            clickAction={() => clickAction(initBrand)}
          />
        );
        break;
      case "Catalogues":
        firstItem = (
          <ListItem
            name={"All Catalogues"}
            active={catalogue.name === "All Catalogues" ? true : false}
            showDescription={showDescription}
            clickAction={() => clickAction(initCatalogue)}
          />
        );
        break;
      case "Solutions":
        firstItem = (
          <ListItem
            name={"All Solutions"}
            active={solution.name === "All Solutions" ? true : false}
            showDescription={showDescription}
            clickAction={() => clickAction(initSolution)}
          />
        );
        break;
      case "Categories":
        firstItem = (
          <ListItem
            name={"All Categories"}
            active={category.name === "All Categories" ? true : false}
            showDescription={showDescription}
            clickAction={() => clickAction(initCategory)}
          />
        );
        break;
      default:
        break;
    }

    return (
      <>
        {firstItem}
        {data.map((item, index) => {
          return (
            <ListItem
              key={index}
              name={item.name}
              image={item.image}
              active={isActive(item.name)}
              showDescription={showDescription}
              description={item.description}
              clickAction={() => clickAction(item)}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      <Overlay />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="top-4 bottom-4 w-full sm:w-50 z-50 bg-b0 flex flex-col fixed">
          <div className="flex flex-row justify-between w-full p-1five">
            <span className="heading-4 w-full">{title}</span>
            <Image
              height={20}
              width={20}
              src="/images/icons/icon-close.svg"
              alt="close"
              onClick={handleHide}
              sizes="(min-width: 320px) 100vw"
              className="h-1twofive w-1twofive cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-start gap-0 items-start overflow-auto">
            {generateContent()}
          </div>
        </div>
      </div>
    </>
  );
};

const ModalDialogProductDetails = ({ data, handleHide }) => {
  return (
    <>
      <Overlay />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="inset-x-1 md:inset-x-auto inset-y-1 sm:inset-y-4 p-1 sm:p-1five gap-1five w-auto md:w-50 z-50 bg-b0 flex flex-col fixed h-auto">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="heading-4 w-full">Product Details</span>
            <Image
              height={20}
              width={20}
              src="/images/icons/icon-close.svg"
              alt="close"
              onClick={handleHide}
              sizes="(min-width: 320px) 100vw"
              className="h-1twofive w-1twofive cursor-pointer"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-start gap-1five items-center pb-1five border-solid border-b40 border-b-2">
            <div className="min-w-15 min-h-7five relative">
              <Image
                fill
                src={data.image.url}
                alt={data.image.name}
                sizes="(min-width: 320px) 100vw"
              />
            </div>
            <div className="flex flex-row gap-0 heading-4">{data.name}</div>
          </div>
          <div
            className={
              (data.description
                ? "justify-start items-start "
                : "justify-center items-center ") +
                  "flex h-full overflow-auto p-t-1five"
            }
            dangerouslySetInnerHTML={{
              __html: data.description ? data.description : "No Descriptions",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export { ModalDialog, ModalDialogFilter, ModalDialogProductDetails };
