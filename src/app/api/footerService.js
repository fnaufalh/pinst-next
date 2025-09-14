import { fetchData, postData } from "./apiService";

export const fetchFooterData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'about',
    params
  );
  
  const dataResult = {
    id: jsonResponse.data.documentId,
    title: jsonResponse.data.title,
    address: jsonResponse.data.address,
    websiteLink: jsonResponse.data.websiteLink,
    websiteName: jsonResponse.data.websiteName,
    email: jsonResponse.data.email,
    phone: jsonResponse.data.phone,
  };
  
  return dataResult;

};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await postData("inquiries", { data: inquiryData });
    return response;
  } catch (error) {
    console.error("Error submitting inquiry", error);
    throw error;
  }
};
