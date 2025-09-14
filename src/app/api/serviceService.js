import { marked } from "marked";
import { fetchData } from "./apiService";

export const fetchServiceData = async () => {
  const params = {
    populate: [
      "icon",
    ]
  };

  const jsonResponse = await fetchData(
    'services',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      content: marked(item.content),
      icon: item.icon
        ? {
            id: item.icon.id,
            name: item.icon.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.icon.url,
          }
        : null,
    };
  });
  
  return dataResult;
}