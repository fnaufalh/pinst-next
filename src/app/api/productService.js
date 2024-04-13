import { fetchData } from "./apiService";
import { marked } from "marked";

//fetchBrandData function
export const fetchBrandData = async (getParams) => {
  const params = {
    populate: "*",
    ...getParams,
    };

  const jsonResponse = await fetchData(
    'brands',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      image: item.attributes.image.data
        ? {
            id: item.attributes.image.data.id,
            name: item.attributes.image.data.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.image.data.attributes.url,
          }
        : null,
    };
  });
  
  return dataResult;
}

//fetchOtherProductData function
export const fetchOtherProductData = async () => {
  const params = {
    populate: "*",
  };

  const jsonResponse = await fetchData(
    'other-products',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.image.data.attributes.hash,
      url:
        process.env.NEXT_PUBLIC_STRAPI_URL +
        item.attributes.image.data.attributes.url,
    }
  });
  
  return dataResult;
}

//fetchProductData function
export const fetchProductData = async (getParams) => {
  const params = {
    populate: "*",
    pagination: { pageSize: 9 },
    sort: 'publishedAt:desc',
    ...getParams,
  }

  const jsonResponse = await fetchData(
    'products',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      description: item.attributes.description ? marked(item.attributes.description) : null,
      image: item.attributes.image.data
        ? {
            id: item.attributes.image.data.id,
            name: item.attributes.image.data.attributes.hash,
            url: process.env.NEXT_PUBLIC_STRAPI_URL + item.attributes.image.data.attributes.url,
          }
        : null,
    };
  });
  const metaResult = jsonResponse.meta;
  return { dataResult, metaResult };
}

//fetchCatalogueData function
export const fetchCatalogueData = async (getParams) => {
  const params = {
    populate: "*",
    ...getParams,
  };

  const jsonResponse = await fetchData(
    'catalogues',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
    };
  });

  return dataResult;
}

//fetchSolutionData function
export const fetchSolutionData = async (getParams) => {
  const params = {
    populate: "*",
    ...getParams
  }

  const jsonResponse = await fetchData(
    'solutions',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      description: item.attributes.description,
    }
  });
  
  return dataResult;
}

//fetchCategoryData function
export const fetchCategoryData = async (getParams) => {
  const params = {
    populate: "*",
    ...getParams
  };

  const jsonResponse = await fetchData(
    'category-products',
    params
  );

  const dataResult = jsonResponse.data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      description: item.attributes.description,
    }
  });
  
  return dataResult;
}