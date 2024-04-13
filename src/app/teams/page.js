'use client';
import { Hero } from "../components/hero";
import ContentTeams from "../components/contentTeams";
import CopyrightSection from "../components/copyrightSection";
import { fetchTeamData } from "../api/teamService";
import { useEffect, useState } from "react";

const Teams = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchTeamData()
      .then((data) => {
        if (isSubscribed) {
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    return () => (isSubscribed = false);
  }, []);

    return (
      <>
        <Hero title="Teams" />
        {data && <ContentTeams>{data}</ContentTeams>}
        <CopyrightSection />
      </>
    );
};

export default Teams;
