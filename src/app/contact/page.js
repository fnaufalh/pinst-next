"use client";
import { Hero } from "../components/hero";
import FooterSection from "../components/footerSection";
import QueryString from "qs";
import { useEffect, useState } from "react";

const Contact = () => {
  const [dataFooter, setDataFooter] = useState(null);

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

  return (
    <>
      <Hero title="Contact" />
      <FooterSection>{dataFooter}</FooterSection>
    </>
  );
};

export default Contact;
