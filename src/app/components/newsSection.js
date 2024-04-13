"use client";
import { CardNews } from "./card";
import Button from "./button";
import { useRouter } from "next/navigation";

const NewsSection = ({ children }) => {
  const router = useRouter();

  const clickActionCard = (slug) => {
    return router.push("news/" + slug);
  };

  const generateContent = () => {
    return children.map((item, index) => {
      return (
        <CardNews
          key={index}
          thumbnail={item.thumbnail}
          title={item.title}
          summary={item.summary}
          content={item.content}
          publishedAt={item.publishedAt}
          clickAction={() => clickActionCard(item.slug)}
        />
      );
    });
  };

  const clickAction = () => {
    return router.push("/news");
  };

  return (
    <section className="w-full flex justify-center gap-8 items-center">
      <div className="box-border xl:w-90 w-full flex flex-col md:px-7five sm:px-4 xs:px-1 items-center gap-1five py-4">
        {children && (
          <>
            <h2 className="heading-2">News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 gap-6">
              {generateContent()}
            </div>
            <Button text="See More" clickAction={() => clickAction()} />
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
