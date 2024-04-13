"use client";
import ClientsSection from "./components/clientsSection";
import { HeroMain } from "./components/hero";
import NewsSection from "./components/newsSection";
import FooterSection from "./components/footerSection";
import ExclusiveBrandsSection from "./components/exclusiveBrandsSection";
import { useEffect, useState } from "react";
import { fetchHeroData } from "../app/api/heroService.js";
import { fetchClientData } from "../app/api/clientService.js";
import { fetchNewsData } from "../app/api/newsService.js";
import { fetchExclusiveBrandsData } from "../app/api/exclusiveBrandsService.js";

const Home = () => {
  const [dataHero, setDataHero] = useState(null);
  const [dataClients, setDataClients] = useState(null);
  const [dataNews, setDataNews] = useState(null);
  const [dataExclusiveBrands, setDataExclusiveBrands] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchHeroData()
      .then((data) => {
        if (isSubscribed) {
          setDataHero(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    fetchClientData()
      .then((data) => {
        if (isSubscribed) {
          setDataClients(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    fetchNewsData()
      .then((data) => {
        if (isSubscribed) {
          setDataNews(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => (isSubscribed = false);
  }, []);

  // create useeffect for fetch exclusive brands
  useEffect(() => {
    let isSubscribed = true;

    fetchExclusiveBrandsData()
      .then((data) => {
        if (isSubscribed) {
          setDataExclusiveBrands(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="bg-b20">
      <HeroMain>{dataHero}</HeroMain>
      <ClientsSection>{dataClients}</ClientsSection>
      <ExclusiveBrandsSection>{dataExclusiveBrands}</ExclusiveBrandsSection>
      <NewsSection>{dataNews}</NewsSection>
      <FooterSection />
    </div>
  );
};

export default Home;
