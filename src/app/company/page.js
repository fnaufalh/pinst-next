// "use client";
import { Hero } from "../components/hero";
import Image from "next/image";
import fetch from "node-fetch";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";
import CopyrightSection from "../components/copyrightSection";

const fetchData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/company?${params()}`
  );
  const jsonResponse = await response.json();
  if (jsonResponse.data) {
    const processedContent = remark().processSync(
      jsonResponse.data.attributes.content
    );
    const contentHtml = processedContent.toString();
    return {
      image: jsonResponse.data.attributes.image.data.attributes,
      title: jsonResponse.data.attributes.title,
      content: contentHtml,
    };
  } else {
    return {
      image: null,
      title: null,
      content: null,
    };
  }
};

const Company = async () => {
  const data = await fetchData();
  const date = new Date();
  const thisYear = date.getFullYear();

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
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + data.image.url}
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
