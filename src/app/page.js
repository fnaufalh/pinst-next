import ClientsSection from "./components/clientsSection";
import { HeroMain } from "./components/hero";
import ArticleSection from "./components/articleSection";
import QueryString from "qs";

const FetchHeroData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: ["hero", "logo", "carousel.image"],
      },
      {
        encodeValuesOnly: true,
      }
    );

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/hero?${params()}`
  );

  if (!data) {
    throw new Error("Failed to fetch hero data");
  } else {
    return data.json();
  }
};

const FetchClientData = async () => {
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
    `${process.env.NEXT_PUBLIC_STRAPI_API}/clients?${params()}`
  );

  if (!data) {
    throw new Error("Failed to fetch data");
  } else {
    return data.json();
  }
};

const FetchArticleData = async () => {
  const params = () =>
    QueryString.stringify(
      {
        populate: "*",
        pagination: { pageSize: 3 },
      },
      {
        encodeValuesOnly: true,
      }
    );

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/articles?${params()}`
  );

  if (!data) {
    throw new Error("Failed to fetch data");
  } else {
    return data.json();
  }
};

const ReformatHeroData = ({ data }) => {
  let result = {
    id: data.id,
    title: data.attributes.title,
    slogan: data.attributes.slogan,
    carouselImage: data.attributes.carousel.image.data
      ? data.attributes.carousel.image.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.hash,
            url: item.attributes.url,
          };
        })
      : null,
    logo: {
      id: data.attributes.logo.data.id,
      name: data.attributes.logo.data.attributes.hash,
      url: data.attributes.logo.data.attributes.url,
    },
  };
  return result;
};

const ReformatClientData = ({ data }) => {
  let result = data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.image.data.attributes.hash,
      url: item.attributes.image.data.attributes.url,
    };
  });
  return result;
};

const ReformatArticleData = ({ data }) => {
  let result = data.map((item) => {
    return {
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      summary: item.attributes.summary,
      content: item.attributes.content,
      thumbnail: item.attributes.thumbnail.data
        ? {
            id: item.attributes.thumbnail.data.id,
            name: item.attributes.thumbnail.data.attributes.hash,
            url: item.attributes.thumbnail.data.attributes.url,
          }
        : null,
      publishedAt: item.attributes.publishedAt,
    };
  });
  return result;
};

const Home = async () => {
  const fetchHero = await FetchHeroData();
  const dataHero = ReformatHeroData(fetchHero);
  const fetchClient = await FetchClientData();
  const dataClient = ReformatClientData(fetchClient);
  const fetchArticle = await FetchArticleData();
  const dataArticle = ReformatArticleData(fetchArticle);
  return (
    <div className="bg-b20">
      <HeroMain>{dataHero}</HeroMain>
      <ClientsSection>{dataClient}</ClientsSection>
      <ArticleSection>{dataArticle}</ArticleSection>
    </div>
  );
};

export default Home;
