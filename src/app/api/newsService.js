import { fetchData } from "./apiService";

export const fetchNewsData = async () => {
  const params = {
    populate: "*",
    pagination: { pageSize: 3 },
  };

  const jsonResponse = await fetchData(
    'articles',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      summary: item.attributes.summary,
      content: item.attributes.content,
      thumbnail: item.attributes.thumbnail.data
        ? {
            id: item.attributes.thumbnail.data.id,
            name: item.attributes.thumbnail.data.attributes.hash,
            url: item.attributes.thumbnail.data.attributes.url,
          }
        : null,
      publishedAt: item.attributes.publishedAt,
    };
  });

  return dataResult;
};
