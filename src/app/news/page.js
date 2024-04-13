"use client";
import { Hero } from "@/app/components/hero";
import ListNews from "@/app/components/listNews";
import { useEffect, useState, createContext } from "react";
import CopyrightSection from "../components/copyrightSection";
import { fetchNewsData } from "../api/newsService";

export const newsContext = createContext();

const News = () => {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [newPage, setNewPage] = useState(1);

  useEffect(() => {
    let isSubscribed = true;

    const params = {
      populate: "*",
      pagination: {
        pageSize: 9,
        page: newPage,
      },
    };

    fetchNewsData(params)
      .then(({ dataResult, metaResult }) => {
        if (isSubscribed) {
          setData(dataResult);
          setMeta(metaResult);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => (isSubscribed = false);
  },
  [newPage]);

  return (
    <newsContext.Provider value={{ setNewPage, data, meta }}>
      <Hero title="News" />
      <div className="w-full flex justify-center bg-b20">
        {data && <ListNews />}
      </div>
      <CopyrightSection />
    </newsContext.Provider>
  );
};

export default News;
