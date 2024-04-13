"use client";
import { Hero } from "../components/hero";
import SidebarMenu from "../components/sidebarMenu";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
import CopyrightSection from "../components/copyrightSection";
import { fetchMaintenanceProjectData, fetchRecentProjectData } from "../api/projectService";

const Projects = () => {
  const [maintenanceProjectData, setMaintenanceProjectData] = useState(null);
  const [recentProjectData, setRecentProjectData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchMaintenanceProjectData()
      .then((data) => {
        if (isSubscribed) {
          setMaintenanceProjectData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    fetchRecentProjectData()
      .then((data) => {
        if (isSubscribed) {
          setRecentProjectData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    return () => (isSubscribed = false);
  }, []);

  const generateContentRecently = () => {
    return recentProjectData.map((item, index) => (
      <div key={index}>
        <div>{HTMLReactParser(item.title)}</div>
        <div>{HTMLReactParser(item.content)}</div>
      </div>
    ));
  };
  const generateContentMaintenance = () => {
    return maintenanceProjectData.data.map((item, index) => (
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
                {recentProjectData &&
                  recentProjectData.map((item, index) => (
                    <div key={index}>
                      <div>{HTMLReactParser(item.title)}</div>
                      <div>{HTMLReactParser(item.content)}</div>
                    </div>
                  ))}
              </div>
              <div
                className="flex flex-col gap-1five p-2five bg-b0"
                id="maintenance"
              >
                <div className="heading-4">Maintenance Projects</div>
                {maintenanceProjectData &&
                  maintenanceProjectData.map((item, index) => (
                    <div key={index} className="flex flex-row gap-1five">
                      <div className="min-w-6twofive max-w-6twofive">
                        {HTMLReactParser(
                          item.startDate +
                            " - " +
                            item.endDate
                        )}
                      </div>
                      <div>{HTMLReactParser(item.content)}</div>
                    </div>
                  ))}
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
