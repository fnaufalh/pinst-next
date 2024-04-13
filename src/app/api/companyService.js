import { fetchData } from "./apiService";

export const fetchCompanyData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'company',
    params
  );

  const dataResult = {
    id: jsonResponse.data.id,
    title: jsonResponse.data.attributes.title,
    content: jsonResponse.data.attributes.content,
    image: jsonResponse.data.attributes.image.data
      ? {
          id: jsonResponse.data.attributes.image.data.id,
          name: jsonResponse.data.attributes.image.data.attributes.hash,
          url: process.env.NEXT_PUBLIC_STRAPI_URL + jsonResponse.data.attributes.image.data.attributes.url,
        }
      : null,
  };

  return dataResult;
}