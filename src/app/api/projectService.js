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
      title: item.title,
      content: marked(item.content),
    };
  });
  
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
      content: item.content,
      startDate: item.startDate,
      endDate: item.endDate,
    };
  });
  
  return dataResult;
}