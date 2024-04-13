import { fetchData } from "./apiService";

export const fetchFooterData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'about',
    params
  );

  const dataResult = {
    id: jsonResponse.data.id,
    title: jsonResponse.data.attributes.title,
    address: jsonResponse.data.attributes.address,
    websiteLink: jsonResponse.data.attributes.websiteLink,
    websiteName: jsonResponse.data.attributes.websiteName,
    email: jsonResponse.data.attributes.email,
    phone: jsonResponse.data.attributes.phone,
  };

  return dataResult;

}