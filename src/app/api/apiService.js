import axios from "axios";
import QueryString from "qs";

export const fetchData = async (slug, params = {}) => {
  try {
    const queryString = QueryString.stringify(params, {
      encodeValuesOnly: true,
    });
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/${slug}?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
