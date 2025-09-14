import { fetchData } from "./apiService";

export const fetchClientData = async () => {
  const params = {
    populate: [
      "image",
    ],
    encodeValuesOnly: true,
  };

  const jsonResponse = await fetchData(
    'clients',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.image.hash,
      url:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        item.image.url,
    };
  });

  return dataResult;
};
