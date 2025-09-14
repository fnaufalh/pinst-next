import { fetchData } from "./apiService";

export const fetchCompanyData = async () => {
  const params = {
    populate: [
      "image",
    ]
  };

  const jsonResponse = await fetchData(
    'company',
    params
  );

  const dataResult = {
    id: jsonResponse.data.documentId,
    title: jsonResponse.data.title,
    content: jsonResponse.data.content,
    image: jsonResponse.data.image
      ? {
          id: jsonResponse.data.image.id,
          name: jsonResponse.data.image.hash,
          url: process.env.NEXT_PUBLIC_STRAPI_URL + jsonResponse.data.image.url,
        }
      : null,
  };

  return dataResult;
}