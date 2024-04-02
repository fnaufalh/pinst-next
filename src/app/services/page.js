"use client";
import { CardService } from "../components/card";
import { Hero } from "../components/hero";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";
import { useEffect, useState } from "react";
import CopyrightSection from "../components/copyrightSection";

const Services = () => {
  const [data, setData] = useState(null);
  const date = new Date();
  const thisYear = date.getFullYear();

  // const generateContent = () => {
  //   return data.map((item, index) => (
  //     <CardService
  //       key={index}
  //       title={item.title}
  //       content={item.content}
  //       icon={item.icon}
  //     />
  //   ));
  // };

  useEffect(() => {
    let isSubscribed = true;

    const FetchData = async () => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_API}/services?${params()}`
      );
      const jsonResponse = await response.json();
      const processedContent = await Promise.all(
        jsonResponse.data.map((item) => {
          return remark().processSync(item.attributes.content);
        })
      );
      const dataResult = jsonResponse.data.map((item, index) => {
        return {
          id: item.id,
          title: item.attributes.title,
          content: marked.parse(processedContent[index].toString()),
          icon: {
            id: item.attributes.icon.data.id,
            name: item.attributes.icon.data.attributes.hash,
            url: item.attributes.icon.data.attributes.url,
          },
        };
      });

      if (isSubscribed) {
        setData(dataResult);
      }
    };

    FetchData().catch(console.error);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => (isSubscribed = false);
  }, []);

  return (
    <div>
      <Hero title="Services" />
      <div className="w-full flex justify-center bg-b20">
        <div className="box-border xl:w-90 w-full xl:px-7five sm:px-4 xs:px-1 sm:py-4 py-1">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-1five">
            {data &&
              data.map((item, index) => (
                <CardService
                  key={index}
                  title={item.title}
                  content={item.content}
                  icon={item.icon}
                />
              ))}
          </div>
        </div>
      </div>
      <CopyrightSection />
    </div>
  );
};

export default Services;
