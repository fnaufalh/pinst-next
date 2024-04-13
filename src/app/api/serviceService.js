import { fetchData } from "./apiService";

export const fetchServiceData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'services',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      content: item.attributes.content,
      icon: item.attributes.icon.data
        ? {
            id: item.attributes.icon.data.id,
            name: item.attributes.icon.data.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.icon.data.attributes.url,
          }
        : null,
    };
  });
  console.log(dataResult);
  return dataResult;
}