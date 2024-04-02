// components/ExclusiveBrandsSection.js
import React from "react";
import Image from "next/image";
import Button from "./button";
import { useRouter } from "next/navigation";

function AboutSection() {
  const router = useRouter();
  const clickAction = () => {
    return router.push("/products");
  };

  return (
    <section className="px-1 py-4 sm:p-4 flex flex-col gap-1five lg:gap-4 justify-center items-center">
      <h2 className="text-white">Our Exclusive Brands</h2>
      <p className="quoteDiv text-red-600 p-1five bg-b900/5 text-center m-0 relative">
        <span className="text-r300 font-bold">
          A Leading Distributor and Sole Agent
        </span>
        <br />
        for Durag, Envea, and AAI, specializing in cutting-edge environmental
        and combustion instrumentation.
      </p>
      <div className="flex flex-wrap justify-center gap-1five">
        <div className="min-w-7five lg:min-w-[160px] min-h-[68px] lg:min-h-[90px] relative">
          <Image
            src={`/images/brands/logo-envea-exclusive.png`}
            alt="Envea"
            fill
          />
        </div>
        <div className="min-w-7five lg:min-w-[160px] min-h-[68px] lg:min-h-[90px] relative">
          <Image
            src={`/images/brands/logo-durag-exclusive.png`}
            alt="Durag"
            fill
          />
        </div>
        <div className="min-w-7five lg:min-w-[160px] min-h-[68px] lg:min-h-[90px] relative">
          <Image src={`/images/brands/logo-aai-exclusive.png`} alt="AAI" fill />
        </div>
      </div>
      <Button text="See More" clickAction={clickAction}></Button>
    </section>
  );
}

export default AboutSection;
