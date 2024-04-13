import { fetchData } from "./apiService";

export const fetchClientData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'clients',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.image.data.attributes.hash,
      url:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        item.attributes.image.data.attributes.url,
    };
  });

  return dataResult;
};
