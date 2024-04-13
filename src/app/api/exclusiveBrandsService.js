import { fetchData } from "./apiService";

export const fetchExclusiveBrandsData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'exclusive-brand',
    params
  );

  const dataResult = {
    id: jsonResponse.data.id,
    title: jsonResponse.data.attributes.title,
    highlightText: jsonResponse.data.attributes.highlightText,
    brandImages: jsonResponse.data.attributes.brandImages.data
      ? jsonResponse.data.attributes.brandImages.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.url,
          };
        })
      : null,
  };

  return dataResult;
};
