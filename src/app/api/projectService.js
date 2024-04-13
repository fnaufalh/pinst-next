import { fetchData } from "./apiService";
import { marked } from "marked";

export const fetchRecentProjectData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'recent-projects',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      content: marked(item.attributes.content),
    };
  });
  console.log('Recent' , dataResult);
  return dataResult;
}

export const fetchMaintenanceProjectData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'maintenance-projects',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      content: item.attributes.content,
      startDate: item.attributes.startDate,
      endDate: item.attributes.endDate,
    };
  });
  console.log('Maintenance' , dataResult);
  return dataResult;
}