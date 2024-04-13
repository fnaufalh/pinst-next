import { CardOtherProduct } from "./card";

const ListOtherProducts = ({ children }) => {
  const generateContent = () => {
    return children.map((item, index) => (
      <CardOtherProduct
        key={index}
        src={item.url}
        name={item.name}
      />
    ));
  };
  return (
    <div className="bg-b0 p-1 sm:p-4 flex flex-col gap-1five">
      {children && (
        <>
          <div className="heading-4">Other Products</div>
          <div className="flex gap-1five self-stretch flex-wrap justify-center">
            {generateContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default ListOtherProducts;
