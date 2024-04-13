import { fetchData } from "./apiService";

export const fetchTeamData = async () => {
  const params = {
    populate: [
      "team",
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
      name: item.attributes.name,
      leader: {
        id: item.attributes.leader.data.id,
        name: item.attributes.leader.data.attributes.name,
        email: item.attributes.leader.data.attributes.email,
        position: item.attributes.leader.data.attributes.position.data.attributes.name,
        avatar: item.attributes.leader.data.attributes.avatar.data
          ? {
              id: item.attributes.leader.data.attributes.avatar.data.id,
              name: item.attributes.leader.data.attributes.avatar.data.attributes.hash,
              url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.leader.data.attributes.avatar.data.attributes.url,
            }
          : null,
      },
      division: item.attributes.division.data
        ? item.attributes.division.data.map((item) => {
            return {
              id: item.id,
              name: item.attributes.name,
              employee: item.attributes.employee.data
                ? item.attributes.employee.data.map((item) => {
                    return {
                      id: item.id,
                      name: item.attributes.name,
                      email: item.attributes.email,
                      position: item.attributes.position.data.attributes.name,
                    };
                  })
                : null,
            };
          })
        : null,
      employee: item.attributes.employee.data
        ? item.attributes.employee.data.map((item) => {
            return {
              id: item.id,
              name: item.attributes.name,
              email: item.attributes.email,
              position: item.attributes.position.data.attributes.name,
            };
          })
        : null,
    };
  });
  
  return dataResult;
}