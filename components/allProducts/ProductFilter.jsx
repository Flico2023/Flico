import { productConfig } from "@/data/productConfig";
import { useRouter } from "next/router";
import React, { useContext, useReducer, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import Button from "../UI/elements/Button";
import { ProductFiltersContext } from "@/context/ProductsFilterProvider";

const initialTabState = {
  subcategories: false,
  brands: true,
  colors: true,
  sizes: true,
  price: true,
};

function tabReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TAB":
      return { ...state, [action.payload]: !state[action.payload] };
    default:
      return state;
  }
}

export default function ProductFilter() {
  const [tabState, dispatch] = useReducer(tabReducer, initialTabState);
  const [price, setPrice] = useState({minPrice:"",maxPrice:""});


  const ProductFilterCtx = useContext(ProductFiltersContext);


    const {query} = useRouter()
    const category = query.category;

    function onArrayFilterChangeHandler(e) {
        const {name, value, checked} = e.target
        if(checked){
          ProductFilterCtx.addArrayFilter(name,value);
        }
        else if(!checked){
          ProductFilterCtx.removeArrayFilter(name,value);
        }
    }

    function onPriceChangeHandler(e){
      const {name, value} = e.target;
      setPrice(() => ({...price, [name]:value}))

    }

    function onPriceButtonClickHandler(){
     
      const minPrice = +price.minPrice;
      const maxPrice = +price.maxPrice;
//! BURAYI MAX VE MIN OLARAK DÜZELT
      ProductFilterCtx.updateSingleFilter("min",minPrice);
      ProductFilterCtx.updateSingleFilter("max",maxPrice);

    }

  return (
    <section className="p-4 border max-h-[85vh] overflow-y-scroll">
      
      <div className="border-b py-1 ">
        {/** SUBACTEGORY */}
        <div className="flex-between ">
            <h4 className="text-xl font-semibold">Products</h4>
            <button
              className="center p-2"
              onClick={() => {
                dispatch({ type: "TOGGLE_TAB", payload: "subcategories" });
              }}
            >
              {tabState.subcategories ? (
                <TiArrowSortedUp className="text-2xl" />
              ) : (
                <TiArrowSortedDown className="text-2xl" />
              )}
            </button>
          </div>
            {tabState.subcategories && (
                <div className="max-h-[20vh] overflow-y-scroll">
                {productConfig.subcategories.map((subcategory) => (
                    <div key={subcategory.value} className="flex flex-start gap-2">
                        <input
                        type="checkbox"
                        name="subcategory"
                        value={subcategory.value}
                        id={subcategory.value}
                        className="w-5 h-5"
                        onChange={onArrayFilterChangeHandler}
                        />
                        <label htmlFor={subcategory.value} className="text-lg">
                        {subcategory.label}
                        </label>
                    </div>
                    ))}
                </div>
            )}
        
      </div>

        <div className="border-b py-1">
          {/* BRANDS */}
          <div className="flex-between">
            <h4 className="text-xl font-semibold">Brands</h4>
            <button
              className="center p-2"
              onClick={() => {
                dispatch({ type: "TOGGLE_TAB", payload: "brands" });
              }}
            >
              {tabState.brands ? (
                <TiArrowSortedUp className="text-2xl" />
              ) : (
                <TiArrowSortedDown className="text-2xl" />
              )}
            </button>
          </div>
          {tabState.brands && (
            <div className="max-h-[20vh] overflow-y-scroll">
              {productConfig.brands.map((brand) => (
                <div key={brand.value} className="flex flex-start gap-2">
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand.value}
                    id={brand.value}
                    className="w-5 h-5"
                    onChange={onArrayFilterChangeHandler}
                  />
                  <label htmlFor={brand.value} className="text-lg">
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-b py-1">
          {/* COLORS */}
          <div className="flex-between">
            <h4 className="text-xl font-semibold">Colors</h4>
            <button
              className="center p-2"
              onClick={() => {
                dispatch({ type: "TOGGLE_TAB", payload: "colors" });
              }}
            >
              {tabState.colors ? (
                <TiArrowSortedUp className="text-2xl" />
              ) : (
                <TiArrowSortedDown className="text-2xl" />
              )}
            </button>
          </div>
          {tabState.colors && (
            <div className="max-h-[20vh] overflow-y-scroll">
              {productConfig.colors.map((color) => (
                <div key={color.value} className="flex flex-start gap-2">
                  <input
                    type="checkbox"
                    name="color"
                    value={color.value}
                    id={color.value}
                    className="w-5 h-5"
                    onChange={onArrayFilterChangeHandler}
                  />
                  <label htmlFor={color.value} className="text-lg">{color.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-b py-1">

          <div className="flex-between">
            <h4 className="text-xl font-semibold">Sizes</h4>
            <button
              className="center p-2"
              onClick={() => {
                dispatch({ type: "TOGGLE_TAB", payload: "sizes" });
              }}
            >
              {tabState.sizes ? (
                <TiArrowSortedUp className="text-2xl" />
              ) : (
                <TiArrowSortedDown className="text-2xl" />
              )}
            </button>
          </div>
          {tabState.sizes && (
            <div className="max-h-[20vh] overflow-y-scroll">
              {productConfig.sizes.map((size) => (
                <div key={size.value} className="flex flex-start gap-2">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size.value}
                    id={size.value}
                    className="w-5 h-5"
                    onChange={onArrayFilterChangeHandler}
                  />
                  <label htmlFor={size.value} className="text-lg">{size.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="py-1">
          <div className="flex-between">
            <h4 className="text-xl font-semibold">Price</h4>
            <button
              className="center p-2"
              onClick={() => {
                dispatch({ type: "TOGGLE_TAB", payload: "price" });
              }}
            >
              {tabState.price ? (
                <TiArrowSortedUp className="text-2xl" />
              ) : (
                <TiArrowSortedDown className="text-2xl" />
              )}
            </button>
          </div>
          {tabState.price && (
            <div>
              <div className="flex-between">
                <input
                  type="number"
                  placeholder="Min"
                  className="rounded p-1 w-[40%] border focus:outline-none"
                  name="minPrice"
                  value={price.minPrice}
                  onChange={onPriceChangeHandler}
                />
                
                <input
                  type="number"
                  placeholder="Max"
                  className="rounded p-1 w-[40%] border focus:outline-none"
                  name="maxPrice"
                  value={price.maxPrice}
                  onChange={onPriceChangeHandler}
                />

                <Button styles="center p-2 bg-sky-700 rounded text-white item-stretch" 
                onClick={onPriceButtonClickHandler}>
                <FaSearch />
                </Button>
              </div>
            </div>
          )}
        </div>
      
    </section>
  );
}
