"use client";
import Image from "next/image";

const DetailNews = ({ children }) => {
  const formatDate = (string) => {
    var options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  return (
    <>
      <div className="w-full flex justify-center bg-b20">
        {children &&
          children.map((item, index) => {
            return (
              <div
                key={index}
                className="box-border w-full xl:w-90 px-1 sm:px-4 md:px-7five py-1 sm:py-4 flex flex-col items-center sm:items-start gap-1five"
              >
                <div className="w-full heading-1">{item.title}</div>
                <div className="w-full caption-1">
                  {"Published at " + formatDate(item.publishedAt)}
                </div>
                {item.thumbnail && (
                  <div className="w-full h-15 sm:h-30 relative">
                    <Image
                      fill
                      src={
                        process.env.NEXT_PUBLIC_STRAPI_URL + item.thumbnail.url
                      }
                      alt={item.thumbnail.name}
                      sizes="(min-width: 320px) 100vw"
                      className="object-contain aspect-auto"
                      priority={true}
                    />
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DetailNews;
