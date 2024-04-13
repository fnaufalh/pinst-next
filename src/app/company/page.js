"use client";
import { Hero } from "../components/hero";
import Image from "next/image";
import { marked } from "marked";
import CopyrightSection from "../components/copyrightSection";
import { fetchCompanyData } from "../api/companyService";
import { useEffect, useState } from "react";

const Company = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchCompanyData().then((data) => {
      if (isSubscribed) {
        setData(data);
      }
    }
    ).catch((error) => {
      console.error("Error fetching data", error);
    });

    return () => (isSubscribed = false);
  }
  , []);

  return (
    <>
      <Hero title="Company" />
      {data && (
        <div className="w-full flex justify-center bg-b20">
          <div className="box-border w-full xl:w-90 px-1 sm:px-4 md:px-7five py-1 sm:py-4 flex flex-col sm:flex-row items-center sm:items-start gap-1five">
            {data.image && (
              <div className="w-7five sm:w-20 h-7five sm:h-20 relative">
                <Image
                  height={282}
                  width={282}
                  src={data.image.url}
                  alt={data.image.name}
                />
              </div>
            )}
            <div className="flex flex-col gap-1five w-full">
              {data.title && (
                <span className="heading-2 text-center sm:text-left">
                  {data.title}
                </span>
              )}
              {data.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(data.content),
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}
      <CopyrightSection />
    </>
  );
};

export default Company;
