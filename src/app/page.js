"use client";
import ClientsSection from "./components/clientsSection";
import { HeroMain } from "./components/hero";
import NewsSection from "./components/newsSection";
import FooterSection from "./components/footerSection";
import QueryString from "qs";
import { useEffect, useState } from "react";
import AboutSection from "./components/aboutSection";

const Home = () => {
  const [dataHero, setDataHero] = useState(null);
  const [dataFooter, setDataFooter] = useState(null);
  const [dataClients, setDataClients] = useState(null);
  const [dataNews, setDataNews] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const FetchFooterData = async () => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_API}/about?${params()}`
      );
      const jsonResponse = await response.json();
      const data = {
        id: jsonResponse.data.id,
        title: jsonResponse.data.attributes.title,
        address: jsonResponse.data.attributes.address,
        websiteLink: jsonResponse.data.attributes.websiteLink,
        websiteName: jsonResponse.data.attributes.websiteName,
        email: jsonResponse.data.attributes.email,
        phone: jsonResponse.data.attributes.phone,
      };

      if (isSubscribed) {
        setDataFooter(data);
      }
    };

    FetchFooterData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

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

    const FetchNewsData = async () => {
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
        setDataNews(dataResult);
      }
    };

    FetchNewsData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="bg-b20">
      <HeroMain>{dataHero}</HeroMain>
      <ClientsSection>{dataClients}</ClientsSection>
      <AboutSection />
      <NewsSection>{dataNews}</NewsSection>
      <FooterSection>{dataFooter}</FooterSection>
    </div>
  );
};

export default Home;
