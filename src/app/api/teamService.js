import { fetchData } from "./apiService";

export const fetchTeamData = async () => {
  const params = {
    populate: [
      // "*",
      // "team",
      "leader",
      "leader.position",
      "leader.avatar",
      "division",
      "division.employee",
      "division.employee.position",
      "employee.position",
    ],
  };

  const jsonResponse = await fetchData(
    'teams',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      leader: {
        id: item.leader.id,
        name: item.leader.name,
        email: item.leader.email,
        position: item.leader.position.name,
        avatar: item.leader.avatar
          ? {
              id: item.leader.avatar.id,
              name: item.leader.avatar.hash,
              url: process.env.NEXT_PUBLIC_STRAPI_URL + item.leader.avatar.url,
            }
          : null,
      },
      division: item.division
        ? item.division.map((item) => {
            return {
              id: item.id,
              name: item.name,
              employee: item.employee
                ? item.employee.map((item) => {
                    return {
                      id: item.id,
                      name: item.name,
                      email: item.email,
                      position: item.position.name,
                    };
                  })
                : null,
            };
          })
        : null,
      employee: item.employee
        ? item.employee.map((item) => {
            return {
              id: item.id,
              name: item.name,
              email: item.email,
              position: item.position.name,
            };
          })
        : null,
    };
  });
  
  return dataResult;
}