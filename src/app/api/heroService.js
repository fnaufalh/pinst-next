import { fetchData } from "./apiService";

export const fetchHeroData = async () => {
  const params = {
    populate: [
      "hero",
      "logo",
      "carousel.image",
      "partnerLabel",
      "partnerBrands",
    ],
    encodeValuesOnly: true,
  };

  const jsonResponse = await fetchData(
    'hero',
    params
  );

  const data = {
    id: jsonResponse.data.id,
    title: jsonResponse.data.attributes.title,
    slogan: jsonResponse.data.attributes.slogan,
    carouselImage: jsonResponse.data.attributes.carousel.image.data
      ? jsonResponse.data.attributes.carousel.image.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.url,
          };
        })
      : null,
    logo: {
      id: jsonResponse.data.attributes.logo.data.id,
      name: jsonResponse.data.attributes.logo.data.attributes.hash,
      url:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        jsonResponse.data.attributes.logo.data.attributes.url,
    },
    partnerLabel: jsonResponse.data.attributes.partnerLabel,
    partnerBrands: jsonResponse.data.attributes.partnerBrands.data
      ? jsonResponse.data.attributes.partnerBrands.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.url,
          };
        })
      : null,
  };

  return data;
};
