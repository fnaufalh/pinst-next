import { Hero } from "../components/hero";
import SidebarMenu from "../components/sidebarMenu";
import HTMLReactParser from "html-react-parser";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";
import CopyrightSection from "../components/copyrightSection";

const FetchMtProject = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/maintenance-projects?${params()}`
  );
  if (!data) {
    throw new Error("Failed to fetch maintenance project data");
  } else {
    return data.json();
  }
};

const FetchRecentProject = async () => {
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
    `${process.env.NEXT_PUBLIC_STRAPI_API}/recent-projects?${params()}`
  );
  const jsonResponse = await response.json();
  const processedContent = await Promise.all(
    jsonResponse.data.map((item) => {
      return remark().processSync(item.attributes.content);
    })
  );
  const data = await jsonResponse.data.map((item, index) => {
    return {
      id: item.id,
      title: item.attributes.title,
      content: marked.parse(processedContent[index].toString()),
    };
  });
  if (!data) {
    throw new Error("Failed to fetch recent project data");
  } else {
    return data;
  }
};

const Projects = async () => {
  const mtProject = await FetchMtProject();
  const recentProject = await FetchRecentProject();

  const date = new Date();
  const thisYear = date.getFullYear();

  const generateContentRecently = () => {
    return recentProject.map((item, index) => (
      <div key={index}>
        <div>{HTMLReactParser(item.title)}</div>
        <div>{HTMLReactParser(item.content)}</div>
      </div>
    ));
  };
  const generateContentMaintenance = () => {
    return mtProject.data.map((item, index) => (
      <div key={index} className="flex flex-row gap-1five">
        <div className="min-w-6twofive max-w-6twofive">
          {HTMLReactParser(
            item.attributes.start_date + " - " + item.attributes.finish_date
          )}
        </div>
        <div>{HTMLReactParser(item.attributes.content)}</div>
      </div>
    ));
  };
  return (
    <div>
      <Hero title="Projects" />
      <div className="w-full flex flex-row gap-1five justify-center bg-b20">
        <div className="box-border xl:w-90 w-full xl:px-7five sm:px-4 xs:px-1 sm:py-4 py-1">
          <div className="flex flex-row gap-1five">
            <div className="flex flex-col gap-1five">
              <div
                className="flex flex-col gap-1five p-2five bg-b0"
                id="recently"
              >
                <div className="heading-4">Recent Projects</div>
                {generateContentRecently()}
              </div>
              <div
                className="flex flex-col gap-1five p-2five bg-b0"
                id="maintenance"
              >
                <div className="heading-4">Maintenance Projects</div>
                {generateContentMaintenance()}
              </div>
            </div>
            <SidebarMenu />
          </div>
        </div>
      </div>
      <CopyrightSection />
    </div>
  );
};

export default Projects;
