// components/ExclusiveBrandsSection.js
import React from "react";
import Image from "next/image";
import Button from "./button";
import { marked } from "marked";
import { useRouter } from "next/navigation";

function ExclusiveBrandsSection({children}) {
  const router = useRouter();
  const clickAction = () => {
    return router.push("/products");
  };
  
  return (
    <section className="w-full flex flex-col justify-center gap-8 items-center">
      <div className="box-border xl:w-90 w-full px-1 sm:px-4 md:px-7five py-4 flex flex-col gap-1five lg:gap-4 justify-center items-center">
        {children && (
          <>
            <h2 className="text-white">{children.title}</h2>
            <p className="quoteDiv text-red-600 p-1five bg-b900/5 text-center m-0 relative">
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parse(children.highlightText),
                }}
              ></span>
            </p>
            <div className="flex flex-wrap justify-center gap-1five">
              {children.brandImage.map((item, index) => (
                <div
                  key={index}
                  className="min-w-7five lg:min-w-[160px] min-h-[68px] lg:min-h-[90px] relative"
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 160px) 100vw, 160px"
                  />
                </div>
              ))}
            </div>
            <Button text="See More" clickAction={() => clickAction()} />
          </>
        )}
      </div>
    </section>
  );
}

export default ExclusiveBrandsSection;
