"use client";
import { createContext, useEffect, useState } from "react";
import { Hero } from "../components/hero";
import ModalTrigger from "../components/modalTrigger";
import {
  ModalDialogFilter,
  ModalDialogProductDetails,
} from "../components/modalDialog";
import ListProducts from "../components/listProducts";
import ListOtherProducts from "../components/listOtherProducts";
import QueryString from "qs";
import { remark } from "remark";
import { marked } from "marked";

export const paginationContext = createContext();
export const brandContext = createContext();
export const catalogueContext = createContext();
export const solutionContext = createContext();
export const categoryContext = createContext();
export const ModalDialogProductDetailsContext = createContext();

const Products = () => {
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
  const initBrand = { id: null, name: "All Brands" };
  const [brand, setBrand] = useState(initBrand);
  const initCatalogue = { id: null, name: "All Catalogues" };
  const [catalogue, setCatalogue] = useState(initCatalogue);
  const initSolution = { id: null, name: "All Solutions" };
  const [solution, setSolution] = useState(initSolution);
  const initCategory = { id: null, name: "All Categories" };
  const [category, setCategory] = useState(initCategory);
  const [newPage, setNewPage] = useState(1);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      const params = () =>
        QueryString.stringify({ populate: "*" }, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/brands?${params()}`
      );

      const jsonResponse = await response.json();
      const dataMapping = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.name,
          image: {
            id: item.attributes.image.data.id,
            url: item.attributes.image.data.attributes.url,
            name: item.attributes.image.data.attributes.hash,
          },
        };
      });
      setBrands(dataMapping);
    };

    const fetchOtherProductData = async () => {
      const params = () =>
        QueryString.stringify({ populate: "*" }, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/other-products?${params()}`
      );

      const jsonResponse = await response.json();
      const dataMapping = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.image.data.attributes.hash,
          url: item.attributes.image.data.attributes.url,
        };
      });
      setOtherProducts(dataMapping);
    };

    fetchBrandData();
    fetchOtherProductData();
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const fetchProductData = async () => {
      const query = {
        populate: "*",
        pagination: { pageSize: 9, page: newPage },
      };

      if (brand.id) {
        if (catalogue.id) {
          if (solution.id) {
            if (category.id) {
              query.filters = {
                category_product: { id: { $eq: category.id } },
              };
            } else {
              query.filters = {
                solution: { id: { $eq: solution.id } },
              };
            }
          } else {
            query.filters = {
              catalogue: { id: { $eq: catalogue.id } },
            };
          }
        } else {
          query.filters = {
            brand: { id: { $eq: brand.id } },
          };
        }
      }

      const params = () =>
        QueryString.stringify(query, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/products?${params()}`
      );

      const jsonResponse = await response.json();

      const processedContent = await Promise.all(
        jsonResponse.data.map((item) => {
          return remark().processSync(item.attributes.description);
        })
      );

      const dataMapping = jsonResponse.data.map((item, index) => {
        return {
          id: item.id,
          name: item.attributes.name,
          description: marked.parse(processedContent[index].toString()),
          image: {
            name: item.attributes.image.data.attributes.hash,
            url: item.attributes.image.data.attributes.url,
          },
        };
      });
      if (isSubscribed) {
        setProducts(dataMapping);
        setMeta(jsonResponse.meta);
      }
    };
    fetchProductData().catch(console.error);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return () => (isSubscribed = false);
  }, [brand, catalogue, solution, category, newPage]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchCatalogueData = async () => {
      const query = {
        populate: "*",
      };

      if (brand.id) {
        query.filters = {
          brand: { id: { $eq: brand.id } },
        };
      }
      const params = () =>
        QueryString.stringify(query, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/catalogues?${params()}`
      );

      const jsonResponse = await response.json();
      const dataMapping = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.name,
        };
      });
      if (isSubscribed) {
        setCatalogues(dataMapping);
        setNewPage(1);
      }
    };
    if (brand.id) {
      fetchCatalogueData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [brand]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchSolutionData = async () => {
      const query = {
        populate: "*",
      };

      if (catalogue.id) {
        query.filters = {
          catalogue: { id: { $eq: catalogue.id } },
        };
      }
      const params = () =>
        QueryString.stringify(query, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/solutions?${params()}`
      );

      const jsonResponse = await response.json();
      const dataMapping = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
        };
      });
      if (isSubscribed) {
        setSolutions(dataMapping);
        setNewPage(1);
      }
    };
    if (catalogue.id) {
      fetchSolutionData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [catalogue]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchCategoryData = async () => {
      const query = {
        populate: "*",
      };

      if (solution.id) {
        query.filters = {
          solution: { id: { $eq: solution.id } },
        };
      }
      const params = () =>
        QueryString.stringify(query, { encodeValuesOnly: true });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/category-products?${params()}`
      );

      const jsonResponse = await response.json();
      const dataMapping = jsonResponse.data.map((item) => {
        return {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
        };
      });
      if (isSubscribed) {
        setCategories(dataMapping);
        setNewPage(1);
      }
    };
    if (solution.id) {
      fetchCategoryData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [solution]);

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
                      clickAction={() => clickAction(brands, "Brands", false)}
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
                          clickAction(categories, "Categories", category, true);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="bg-b20 w-full flex justify-center gap-8 items-center">
                  <div className="box-border xl:w-90 w-full flex flex-col xl:px-7five md:px-7five sm:px-4 xs:px-1 gap-1five py-1">
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
