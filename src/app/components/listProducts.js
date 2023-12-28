import { CardProduct } from "./card";
import {
  ModalDialogProductDetailsContext,
  paginationContext,
} from "../products/page";
import { useContext } from "react";
import ReactPaginate from "react-paginate";

const ListProducts = ({ children }) => {
  const { setIsVisibleProductDetails, setDataDialog } = useContext(
    ModalDialogProductDetailsContext
  );
  const { meta, newPage, setNewPage } = useContext(paginationContext);

  const handlePageClick = (event) => {
    setNewPage(event.selected + 1);
  };

  const clickAction = (item) => {
    setDataDialog(item);
    setIsVisibleProductDetails(true);
    document.body.style.overflow = "hidden";
  };

  const generateContent = () => {
    return children.map((item, index) => (
      <CardProduct
        key={index}
        image={item.image}
        name={item.name}
        clickAction={() => clickAction(item)}
      />
    ));
  };

  const generatePagination = () => {
    return (
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
        forcePage={newPage - 1}
      />
    );
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1five">
        {generateContent()}
      </div>
      {generatePagination()}
    </>
  );
};

export default ListProducts;
