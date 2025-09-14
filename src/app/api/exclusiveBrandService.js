import { fetchData } from "./apiService";

export const fetchExclusiveBrandsData = async () => {
  const params = {
    populate: [
      "brandImage",
    ],
    encodeValuesOnly: true,
  };

  const jsonResponse = await fetchData(
    'exclusive-brand',
    params
  );

  const dataResult = {
    id: jsonResponse.data.documentId,
    title: jsonResponse.data.title,
    highlightText: jsonResponse.data.highlightText,
    brandImage: jsonResponse.data.brandImage
      ? jsonResponse.data.brandImage.map((item) => {
          return {
            id: item.id,
            name: item.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.url,
          };
        })
      : null,
  };

  return dataResult;
};
