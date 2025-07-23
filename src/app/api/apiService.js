import axios from "axios";
import QueryString from "qs";

export const fetchData = async (slug, params = {}) => {
  try {
    const queryString = QueryString.stringify(params, {
      encodeValuesOnly: true,
    });
    const token = process.env.STRAPI_API_TOKEN;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/${slug}?${queryString}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
