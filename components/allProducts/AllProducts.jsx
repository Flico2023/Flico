import Image from "next/image";
import React from "react";
import SingleProductCard from "./SingleProductCard";

export default function AllProducts(props) {
  const { products } = props;
  //console.log(products);
  return (
    <main className="grid grid-cols-3 gap-4">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <SingleProductCard key={product.productID} product={product} />
        ))}
    </main>
  );
}
