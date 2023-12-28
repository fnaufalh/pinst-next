import { Hero } from "../components/hero";
import ContentTeams from "../components/contentTeams";
import QueryString from "qs";

const FetchData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: [
          "team",
          "leader",
          "leader.position",
          "leader.avatar",
          "divisions",
          "divisions.employees",
          "divisions.employees.position",
          "employees.position",
        ],
      },
      {
        encodeValuesOnly: true,
      }
    );

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/teams?${params()}`
  );
  if (!data) {
    throw new Error("Failed to fetch data");
  } else {
    return data.json();
  }
};

const ReformatData = ({ data }) => {
  let result = [];
  data.map((item) => {
    result.push({
      id: item.id,
      name: item.attributes.name,
      leader: {
        id: item.attributes.leader.data.id,
        name: item.attributes.leader.data.attributes.name,
        email: item.attributes.leader.data.attributes.email,
        position:
          item.attributes.leader.data.attributes.position.data.attributes.name,
        avatar: item.attributes.leader.data.attributes.avatar.data
          ? {
              id: item.attributes.leader.data.attributes.avatar.data.id,
              name: item.attributes.leader.data.attributes.avatar.data
                .attributes.hash,
              url: item.attributes.leader.data.attributes.avatar.data.attributes
                .url,
            }
          : null,
      },
      divisions: item.attributes.divisions.data
        ? item.attributes.divisions.data.map((item) => {
            return {
              id: item.id,
              name: item.attributes.name,
              employees: item.attributes.employees.data
                ? item.attributes.employees.data.map((item) => {
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
      employees: item.attributes.employees.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.name,
          email: item.attributes.email,
          position: item.attributes.position.data.attributes.name,
        };
      }),
    });
  });
  return result;
};

const Teams = async () => {
  const fetchData = await FetchData();
  const data = ReformatData(fetchData);

  return (
    <>
      <Hero title="Teams" />
      <ContentTeams>{data}</ContentTeams>
    </>
  );
};

export default Teams;
