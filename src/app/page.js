"use client";
import ClientsSection from "./components/clientsSection";
import { HeroMain } from "./components/hero";
import ArticleSection from "./components/articleSection";
import QueryString from "qs";
import { useEffect, useState } from "react";

const Home = () => {
  const [dataHero, setDataHero] = useState(null);
  const [dataClients, setDataClients] = useState(null);
  const [dataArticles, setDataArticles] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const FetchHeroData = async () => {
      const params = () =>
        QueryString.stringify(
          {
            populate: ["hero", "logo", "carousel.image"],
          },
          {
            encodeValuesOnly: true,
          }
        );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/hero?${params()}`
      );
      const jsonResponse = await response.json();
      const data = {
        id: jsonResponse.data.id,
        title: jsonResponse.data.attributes.title,
        slogan: jsonResponse.data.attributes.slogan,
        carouselImage: jsonResponse.data.attributes.carousel.image.data
          ? jsonResponse.data.attributes.carousel.image.data.map((item) => {
              return {
                id: item.id,
                name: item.attributes.hash,
                url: item.attributes.url,
              };
            })
          : null,
        logo: {
          id: jsonResponse.data.attributes.logo.data.id,
          name: jsonResponse.data.attributes.logo.data.attributes.hash,
          url: jsonResponse.data.attributes.logo.data.attributes.url,
        },
      };

      if (isSubscribed) {
        setDataHero(data);
      }
    };

    FetchHeroData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const FetchClientData = async () => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_API}/clients?${params()}`
      );
      const jsonResponse = await response.json();
      const dataResult = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.image.data.attributes.hash,
          url: item.attributes.image.data.attributes.url,
        };
      });

      if (isSubscribed) {
        setDataClients(dataResult);
      }
    };

    FetchClientData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const FetchArticleData = async () => {
      const params = () =>
        QueryString.stringify(
          {
            populate: "*",
            pagination: { pageSize: 3 },
          },
          {
            encodeValuesOnly: true,
          }
        );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/articles?${params()}`
      );
      const jsonResponse = await response.json();
      const dataResult = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          title: item.attributes.title,
          slug: item.attributes.slug,
          summary: item.attributes.summary,
          content: item.attributes.content,
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
        setDataArticles(dataResult);
      }
    };

    FetchArticleData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="bg-b20">
      <HeroMain>{dataHero}</HeroMain>
      <ClientsSection>{dataClients}</ClientsSection>
      <ArticleSection>{dataArticles}</ArticleSection>
    </div>
  );
};

export default Home;
