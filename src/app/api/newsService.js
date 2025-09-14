import { fetchData } from "./apiService";

export const fetchNewsData = async (getParams) => {
  const params = !getParams
    ? {
        populate: [
          "thumbnail",
        ],
        pagination: { pageSize: 3 },
        encodeValuesOnly: true,
      }
    : getParams;

  const jsonResponse = await fetchData(
    'articles',
    {...params, sort: 'publishedAt:desc'}
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      thumbnail: item.thumbnail
        ? {
            id: item.thumbnail.id,
            name: item.thumbnail.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.thumbnail.url,
          }
        : null,
      publishedAt: item.publishedAt,
    };
  });
  const metaResult = jsonResponse.meta;
  return { dataResult, metaResult };
};
