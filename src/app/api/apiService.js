import axios from "axios";
import QueryString from "qs";

export const fetchData = async (slug, params = {}) => {
  try {
    const queryString = QueryString.stringify(params, {
      encodeValuesOnly: true,
    });
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    // Use the token if it exists, otherwise use an empty object
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

export const postData = async (slug, data) => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/${slug}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};
