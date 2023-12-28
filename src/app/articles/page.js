"use client";
import { Hero } from "@/app/components/hero";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";
import ListArticles from "../components/listArticles";
import { useEffect, useState, createContext } from "react";

export const articleContext = createContext();

const Articles = () => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [newPage, setNewPage] = useState(1);

  useEffect(() => {
    let isSubscribed = true;

    const FetchData = async () => {
      const params = () =>
        QueryString.stringify(
          {
            populate: "*",
            pagination: {
              pageSize: 9,
              page: newPage,
            },
          },
          {
            encodeValuesOnly: true,
          }
        );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/articles?${params()}`
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
          slug: item.attributes.slug,
          summary: item.attributes.summary,
          content: marked.parse(processedContent[index].toString()),
          thumbnail: item.attributes.thumbnail.data
            ? {
                id: item.attributes.thumbnail.data.id,
                name: item.attributes.thumbnail.data.attributes.hash,
                url: item.attributes.thumbnail.data.attributes.url,
              }
            : null,
          publishedAt: item.attributes.publishedAt,
        };
      });

      if (isSubscribed) {
        setData(dataResult);
        setMeta(jsonResponse.meta);
      }
    };

    FetchData().catch(console.error);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => (isSubscribed = false);
  }, [newPage]);

  return (
    <articleContext.Provider value={{ setNewPage, data, meta }}>
      <Hero title="Articles" />
      <div className="w-full flex justify-center bg-b20">
        {data && <ListArticles />}
      </div>
    </articleContext.Provider>
  );
};

export default Articles;
