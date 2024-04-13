"use client";
import { Hero } from "@/app/components/hero";
import DetailNews from "@/app/components/detailNews";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CopyrightSection from "../../components/copyrightSection";
import { fetchNewsData } from "../../api/newsService";

const Page = () => {
  const [data, setData] = useState(null);
  const search = useParams();

  useEffect(() => {
    let isSubscribed = true;

    const params = {
      populate: "*",
      filters: {
        slug: search.slug,
      },
    };

    fetchNewsData(params)
      .then(({ dataResult }) => {
        if (isSubscribed) {
          setData(dataResult);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => (isSubscribed = false);
  }, [search]);

  return (
    <>
      <Hero title="News" />
      <div className="w-full flex justify-center bg-b20">
        {data && <DetailNews>{data}</DetailNews>}
      </div>
      <CopyrightSection />
    </>
  );
};

export default Page;
