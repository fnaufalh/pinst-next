"use client";
import { CardService } from "../components/card";
import { Hero } from "../components/hero";
import { useEffect, useState } from "react";
import CopyrightSection from "../components/copyrightSection";
import { fetchServicesData } from "../api/servicesService";

const Services = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchServicesData()
      .then((data) => { 
        if (isSubscribed) {
          setData(data);
        }
      }
    )
      .catch((error) => {
        console.error("Error fetching data", error);
      });

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
