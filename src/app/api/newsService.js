import { fetchData } from "./apiService";

export const fetchNewsData = async (getParams) => {
  const params = !getParams
    ? {
        populate: "*",
        pagination: { pageSize: 3 },
        
      }
    : getParams;

  const jsonResponse = await fetchData(
    'articles',
    {...params, sort: 'publishedAt:desc'}
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
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.thumbnail.data.attributes.url,
          }
        : null,
      publishedAt: item.attributes.publishedAt,
    };
  });
  const metaResult = jsonResponse.meta;
  return { dataResult, metaResult };
};
