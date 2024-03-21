import React, { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const ProductFiltersContext = createContext({
  addArrayFilter: () => {},
  removeArrayFilter: () => {},
  updateSingleFilter: () => {},
});

const ProductFiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    //category sayfadan alınacak
    subcategory: [],
    brand: [],
    min: null,
    max: null,
    color: [],
    sizes: [],
  });

  //burda
  const [queryString, setQueryString] = useState(null);

  const [pageConfig, setPageConfig] = useState({
    pageSize: 5,
    pageIndex: 1,
  });

  const resetFilters = () => {
    setFilters({
      subcategory: [],
      brand: [],
      min: null,
      max: null,
      color: [],
      sizes: [],
    });
    //setPageConfig({ pageSize: 5, pageIndex: 1 });

  };

  function updateSingleFilter(name, value) {
    setFilters({ ...filters, [name]: value });
  }

  function addArrayFilter(name, value) {
    const newFilter = [...filters[name], value];
    setFilters({ ...filters, [name]: newFilter });
  }

  function removeArrayFilter(name, value) {
    const newFilter = filters[name].filter((val) => val !== value);
    setFilters({ ...filters, [name]: newFilter });
  }

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [filters]);

  /** burdan query ve routera erişebilir miyim acaba */

  function buildQueryString() {
    const searchParams = { ...filters};


    //console.log("SEARCH PARAMS", searchParams)

    const queryString = Object.keys(searchParams)
      .map((key) => {
        let value = searchParams[key];

        // Özel durumları kontrol et
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return null; // Tanımsız veya boş değerleri atla
        }

        // String değerleri işle
        if (typeof value === "string" || typeof value === "number") {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }

        // Dizi değerleri işle
        if (Array.isArray(value)) {
          return `${encodeURIComponent(key)}=${value
            .map(encodeURIComponent)
            .join(",")}`;
        }

        return null; // Diğer durumları atla
      })
      .filter((param) => param !== null)
      .join("&");

      //console.log("QUERY STRING", queryString)
      if(queryString ){
        setQueryString("&"+queryString);
      }
      else{
        setQueryString("");
      }


    //return queryString;
  }

  return (
    <ProductFiltersContext.Provider
      value={{
        filters,
        addArrayFilter,
        removeArrayFilter,
        updateSingleFilter,
        buildQueryString,
        queryString,

        
        resetFilters
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};

export default ProductFiltersProvider;
