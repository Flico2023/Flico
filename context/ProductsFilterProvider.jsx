import React, { createContext, useState } from "react";

export const ProductFiltersContext = createContext({
  addArrayFilter: () => {},
  removeArrayFilter: () => {},
  updateSingleFilter: () => {},
});

const initialFilters = {
  subcategory: "",
  brand: [],
  min: null,
  max: null,
  color: [],
  sizes: [],
};

const ProductFiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilters);

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

  /** burdan query ve routera erişebilir miyim acaba */

  function buildQueryString() {
    const queryString = Object.keys(filters)
      .map((key) => {
        let value = filters[key];

        // Özel durumları kontrol et
        if (value === null || value === undefined || value === "") {
          return null; // Tanımsız veya boş değerleri atla
        }

        // String değerleri işle
        if (typeof value === "string") {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }

        // Dizi değerleri işle
        if (Array.isArray(value) && value.length > 0) {
          return `${encodeURIComponent(key)}=${value
            .map(encodeURIComponent)
            .join(",")}`;
        }

        // Sayısal değerleri işle
        if (typeof value === "number") {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }

        return null; // Diğer durumları atla
      })
      .filter((param) => param !== null)
      .join("&");
    console.log("queryString",queryString);
    return queryString;
  }

  return (
    <ProductFiltersContext.Provider
      value={{ filters, addArrayFilter, removeArrayFilter, updateSingleFilter,buildQueryString }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};

export default ProductFiltersProvider;
