"use client";
import {
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "../components/hero";
import ModalTrigger from "../components/modalTrigger";
import {
  ModalDialogFilter,
  ModalDialogProductDetails,
} from "../components/modalDialog";
import ListProducts from "../components/listProducts";
import ListOtherProducts from "../components/listOtherProducts";
import CopyrightSection from "../components/copyrightSection";
import { fetchBrandData, fetchCatalogueData, fetchSolutionData, fetchCategoryData, fetchProductData, fetchOtherProductData } from "../api/productService";

export const paginationContext = createContext();
export const brandContext = createContext();
export const catalogueContext = createContext();
export const solutionContext = createContext();
export const categoryContext = createContext();
export const ModalDialogProductDetailsContext = createContext();

const Products = () => {
  const searchParams = useSearchParams();
  const [otherProducts, setOtherProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [brands, setBrands] = useState(null);
  const [catalogues, setCatalogues] = useState(null);
  const [solutions, setSolutions] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleProductDetails, setIsVisibleProductDetails] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [titleDialog, setTitleDialog] = useState(null);
  const initBrand = useMemo(() => ({ id: null, name: "All Brands", image: null }), []);
  const [brand, setBrand] = useState(initBrand);
  const initCatalogue = useMemo(() => ({
      id: null,
      name: "All Catalogues",
      image: null
    }), []);
  const [catalogue, setCatalogue] = useState(initCatalogue);
  const initSolution = useMemo(() => ({
    id: null,
    name: "All Solutions",
    image: null
  }), []);
  const [solution, setSolution] = useState(initSolution);
  const initCategory = useMemo(() => ({
    id: null,
    name: "All Categories",
    image: null
  }), []);
  const [category, setCategory] = useState(initCategory);
  const [newPage, setNewPage] = useState(1);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchBrandData()
      .then((data) => {
        if (isSubscribed) {
          setBrands(data);
          if (searchParams.has("brand") && data.length > 0) {
            setBrand(data.find((item) => item.id == searchParams.get("brand")));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    fetchOtherProductData()
      .then((data) => {
        if (isSubscribed) {
          setOtherProducts(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [searchParams]);

  useEffect(() => {
    let isSubscribed = true;

    const filters = {
      filters: {
        ...(searchParams.has("brand") && {
          brand: {
            id: searchParams.get("brand")
          },
        }),
        ...(searchParams.has("catalogue") && {
          catalogue: {
            id: searchParams.get("catalogue")
          },
        }),
        ...(searchParams.has("solution") && {
          solution: {
            id: searchParams.get("solution")
          },
        }),
        ...(searchParams.has("category") && {
          category: {
            id: searchParams.get("category")
          },
        }),
      },
    };

    fetchProductData(filters)
      .then(({ dataResult, metaResult}) => {
        if (isSubscribed) {
          setProducts(dataResult);
          setMeta(metaResult);
          setNewPage(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => (isSubscribed = false);
  }, [brand, catalogue, solution, category, searchParams]);

  useEffect(() => {
    let isSubscribed = true;
    const filters = {
      filters: {
        ...(searchParams.has("brand") && {
          brand: {
            id: searchParams.get("brand")
          },
        }),
      },
    };
    
    fetchCatalogueData(filters)
      .then((data) => {
        if (isSubscribed) {
          setCatalogues(data);
          setNewPage(1);
          if (searchParams.has("catalogue") && data.length > 0) {
            setCatalogue(data.find((item) => item.id == searchParams.get("catalogue")));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [brand, searchParams]);

  useEffect(() => {
    let isSubscribed = true;

    const filters = {
      filters: {
        ...(searchParams.has("brand") && {
          brand: {
            id: searchParams.get("brand")
          },
        }),
        ...(searchParams.has("catalogue") && {
          catalogue: {
            id: searchParams.get("catalogue")
          },
        }),
      },
    };
    
    fetchSolutionData(filters)
      .then((data) => {
        if (isSubscribed) {
          setSolutions(data);
          setNewPage(1);
          if (searchParams.has("solution") && data.length > 0) {
            setSolution(data.find((item) => item.id == searchParams.get("solution")));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [catalogue, searchParams]);

  useEffect(() => {
    let isSubscribed = true;
    
    const filters = {
      filters: {
        ...(searchParams.has("brand") && {
          brand: {
            id: searchParams.get("brand")
          },
        }),
        ...(searchParams.has("catalogue") && {
          catalogue: {
            id: searchParams.get("catalogue")
          },
        }),
        ...(searchParams.has("solution") && {
          solution: {
            id: searchParams.get("solution")
          },
        }),
      },
    };

    fetchCategoryData(filters)
      .then((data) => {
        if (isSubscribed) {
          setCategories(data);
          setNewPage(1);
          if (searchParams.has("category") && data.length > 0) {
            setCategory(data.find((item) => item.id == searchParams.get("category")));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [solution, searchParams]);

  const handleHide = () => {
    setIsVisible(false);
    document.body.style.overflow = "initial";
  };

  const handleHideProductDetails = () => {
    setIsVisibleProductDetails(false);
    document.body.style.overflow = "initial";
  };

  const clickAction = (item, title, showDesc) => {
    setShowDescription(showDesc);
    setTitleDialog(title);
    setDataDialog(item);
    setIsVisible(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <paginationContext.Provider value={{ meta, newPage, setNewPage }}>
      <brandContext.Provider value={{ brand, setBrand, initBrand }}>
        <catalogueContext.Provider
          value={{ catalogue, setCatalogue, initCatalogue, setCatalogues }}
        >
          <solutionContext.Provider
            value={{ solution, setSolution, initSolution, setSolutions }}
          >
            <categoryContext.Provider
              value={{ category, setCategory, initCategory, setCategories }}
            >
              <div className="bg-b20">
                <Hero title="Products" />
                <div className="box-border bg-b0 w-full flex flex-row overflow-auto items-center justify-start xl:justify-center">
                  <div className="xl:w-90 xl:px-7five md:px-7five sm:px-4 px-1 py-1 flex flex-row gap-1">
                    <ModalTrigger
                      value={brand}
                      clickAction={() => {
                        if (brands && brands.length > 0) {
                          clickAction(brands, "Brands", false);
                        }
                      }}
                    />
                    <ModalTrigger
                      value={catalogue}
                      clickAction={() => {
                        if (catalogues && catalogues.length > 0) {
                          clickAction(catalogues, "Catalogues", false);
                        }
                      }}
                    />
                    <ModalTrigger
                      value={solution}
                      clickAction={() => {
                        if (solutions && solutions.length > 0) {
                          clickAction(solutions, "Solutions", true);
                        }
                      }}
                    />
                    <ModalTrigger
                      value={category}
                      clickAction={() => {
                        if (categories && categories.length > 0) {
                          clickAction(categories, "Categories", true);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="bg-b20 w-full flex justify-center gap-8 items-center">
                  <div className="box-border xl:w-90 w-full flex flex-col xl:px-7five md:px-7five sm:px-4 xs:px-1 gap-1five py-4">
                    {products && (
                      <ModalDialogProductDetailsContext.Provider
                        value={{
                          isVisibleProductDetails,
                          setIsVisibleProductDetails,
                          setDataDialog,
                        }}
                      >
                        <ListProducts>{products}</ListProducts>
                      </ModalDialogProductDetailsContext.Provider>
                    )}
                    {otherProducts && (
                      <ListOtherProducts>{otherProducts}</ListOtherProducts>
                    )}
                  </div>
                </div>
              </div>
              <CopyrightSection />
              {isVisible && (
                <ModalDialogFilter
                  title={titleDialog}
                  data={dataDialog}
                  showDescription={showDescription}
                  handleHide={() => handleHide()}
                />
              )}
              {isVisibleProductDetails && (
                <ModalDialogProductDetails
                  data={dataDialog}
                  handleHide={() => handleHideProductDetails()}
                />
              )}
            </categoryContext.Provider>
          </solutionContext.Provider>
        </catalogueContext.Provider>
      </brandContext.Provider>
    </paginationContext.Provider>
  );
};
export default Products;
