import { CardService } from "../components/card";
import { Hero } from "../components/hero";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";

const fetchData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/services?${params()}`
  );
  const jsonResponse = await response.json();
  const processedContent = await Promise.all(
    jsonResponse.data.map((item) => {
      return remark().processSync(item.attributes.content);
    })
  );
  return jsonResponse.data.map((item, index) => {
    return {
      id: item.id,
      title: item.attributes.title,
      content: marked.parse(processedContent[index].toString()),
    };
  });
};

const Services = async () => {
  const data = await fetchData();

  const generateContent = () => {
    return data.map((item, index) => (
      <CardService key={index} title={item.title} content={item.content} />
    ));
  };
  return (
    <div>
      <Hero title="Services" />
      <div className="w-full flex justify-center bg-b20">
        <div className="box-border xl:w-90 w-full xl:px-7five sm:px-4 xs:px-1 sm:py-4 py-1">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-1five">
            {generateContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
