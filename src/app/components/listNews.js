"use client";
import React, { useContext, useState } from "react";
import { CardNews } from "./card";
import ReactPaginate from "react-paginate";
import { newsContext } from "../news/page";
import { useRouter } from "next/navigation";

const ListNews = () => {
  const router = useRouter();
  const { setNewPage, data, meta } = useContext(newsContext);
  const handlePageClick = (event) => {
    setNewPage(event.selected + 1);
  };

  const clickAction = (slug) => {
    return router.push("news/" + slug);
  };

  const generateContent = () => {
    return data.map((item, index) => {
      return (
        <CardNews
          key={index}
          thumbnail={item.thumbnail}
          title={item.title}
          summary={item.summary}
          content={item.content}
          publishedAt={item.publishedAt}
          clickAction={() => clickAction(item.slug)}
        />
      );
    });
  };

  return (
    <>
      <div className="box-border xl:w-90 w-full xl:px-7five sm:px-4 xs:px-1 py-4 gap-1five flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1five">
          {generateContent()}
        </div>
        <ReactPaginate
          className="pagination flex flex-row justify-center m-0"
          breakLabel="..."
          nextLabel=">>"
          previousLabel="<<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={meta.pagination.pageCount}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default ListNews;
