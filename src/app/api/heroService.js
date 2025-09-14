import { fetchData } from "./apiService";

export const fetchHeroData = async () => {
  const params = {
    populate: [
      "logo",
      "carousel.image",
      "partnerBrand",
    ],
    encodeValuesOnly: true,
  };

  const jsonResponse = await fetchData(
    'hero',
    params
  );

  const data = {
    id: jsonResponse.data.documentId,
    title: jsonResponse.data.title,
    slogan: jsonResponse.data.slogan,
    carouselImage: jsonResponse.data.carousel.image
      ? jsonResponse.data.carousel.image.map((item) => {
          return {
            id: item.id,
            name: item.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.url,
          };
        })
      : null,
    logo: {
      id: jsonResponse.data.logo.id,
      name: jsonResponse.data.logo.hash,
      url:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        jsonResponse.data.logo.url,
    },
    partnerLabel: jsonResponse.data.partnerLabel,
    partnerBrand: jsonResponse.data.partnerBrand
      ? jsonResponse.data.partnerBrand.map((item) => {
          return {
            id: item.id,
            name: item.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.url,
          };
        })
      : null,
  };

  return data;
};
