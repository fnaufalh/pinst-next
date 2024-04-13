"use client";
import {
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
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
  const [newPage, setNewPage] = useState(searchParams.get("page") || 1);
  const [meta, setMeta] = useState(null);

  const [brandParam, setBrandParam] = useState(searchParams.get("brand"));
  const [catalogueParam, setCatalogueParam] = useState(
    searchParams.get("catalogue")
  );
  const [solutionParam, setSolutionParam] = useState(
    searchParams.get("solution")
  );
  const [categoryParam, setCategoryParam] = useState(
    searchParams.get("category")
  );
  const [pageParam, setPageParam] = useState(searchParams.get("page"));

  useEffect(() => {
    setBrandParam(searchParams.get("brand"));
    setCatalogueParam(searchParams.get("catalogue"));
    setSolutionParam(searchParams.get("solution"));
    setCategoryParam(searchParams.get("category"));
    setPageParam(searchParams.get("page"));
  }, [searchParams]);

  useEffect(() => {
    let isSubscribed = true;

    fetchBrandData()
      .then((data) => {
        if (isSubscribed) {
          setBrands(data);
          if (brandParam && data.length > 0) {
            setBrand(data.find((item) => item.id == brandParam));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [brandParam]);

  useEffect(() => {
    let isSubscribed = true;

    const filters = {
      filters: {
        ...(brandParam
          ? {
              brand: {
                id: brandParam,
              },
              ...(catalogueParam
                ? {
                    catalogue: {
                      id: catalogueParam,
                    },
                    ...(solutionParam
                      ? {
                          solution: {
                            id: solutionParam,
                          },
                          ...(categoryParam
                            ? {
                                categoryProduct: {
                                  id: categoryParam,
                                },
                              }
                            : null),
                        }
                      : null),
                  }
                : null),
            }
          : null),
      },
      ...(pageParam && {
        pagination: { page: pageParam, pageSize: 9 },
      }),
    };

    fetchProductData(filters)
      .then(({ dataResult, metaResult}) => {
        if (isSubscribed) {
          setProducts(dataResult);
          setMeta(metaResult);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => (isSubscribed = false);
  }, [searchParams, brandParam, catalogueParam, solutionParam, categoryParam, pageParam]);

  useEffect(() => {
    let isSubscribed = true;
    const filters = {
      filters: {
        ...(brandParam && {
          brand: {
            id: brandParam,
          },
        }),
      },
    };
    
    fetchCatalogueData(filters)
      .then((data) => {
        if (isSubscribed) {
          setCatalogues(data);
          if (catalogueParam && data.length > 0) {
            setCatalogue(data.find((item) => item.id == catalogueParam));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [catalogueParam, brandParam]);

  useEffect(() => {
    let isSubscribed = true;

    const filters = {
      filters: {
        ...(brandParam && {
          brand: {
            id: brandParam,
          },
          ...(catalogueParam && {
            catalogue: {
              id: catalogueParam,
            },
          }),
        }),
      },
    };
    
    fetchSolutionData(filters)
      .then((data) => {
        if (isSubscribed) {
          setSolutions(data);
          if (solutionParam && data.length > 0) {
            setSolution(data.find((item) => item.id == solutionParam));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [catalogueParam, brandParam, solutionParam]);

  useEffect(() => {
    let isSubscribed = true;
    
    const filters = {
      filters: {
        ...(brandParam && {
          brand: {
            id: brandParam,
          },
          ...(catalogueParam && {
            catalogue: {
              id: catalogueParam,
            },
            ...(solutionParam && {
              solution: {
                id: solutionParam,
              },
            }),
          }),
        }),
      },
    };

    fetchCategoryData(filters)
      .then((data) => {
        if (isSubscribed) {
          setCategories(data);
          if (categoryParam && data.length > 0) {
            setCategory(data.find((item) => item.id == categoryParam));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    
    return () => (isSubscribed = false);
  }, [solutionParam, catalogueParam, brandParam, categoryParam]);

  useEffect(() => {
    let isSubscribed = true;

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
  }, []);

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
                        if (brand.id && catalogues.length > 0) {
                          clickAction(catalogues, "Catalogues", false);
                        }
                      }}
                    />
                    <ModalTrigger
                      value={solution}
                      clickAction={() => {
                        if (catalogue.id && solutions.length > 0) {
                          clickAction(solutions, "Solutions", true);
                        }
                      }}
                    />
                    <ModalTrigger
                      value={category}
                      clickAction={() => {
                        if (solution.id && categories.length > 0) {
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
