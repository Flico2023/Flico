/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { forwardRef } from "react";

const SingleProductCard = forwardRef((props, ref) => {
  const { brand, imagePath, productName, price, productID} = props.product;
  //console.log(props.product)

  return (
    <Link href={`/products/details/${productID}`}>
      <article ref={ref}>
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={imagePath}

            alt="Product Image"
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <h4 className="line-clamp-2 text-ellipsis overflow-hidden text-wrap h-[50px]">
            <span className="inline font-semibold">{brand}</span> {productName}
          </h4>
          <p className="mt-4 text-2xl text-primary font-semibold">
            <span className="text-lg mr-1">$</span>
            {price}
          </p>
        </div>
      </article>
    </Link>
  );
})

SingleProductCard.displayName = "SingleProductCard";
export default SingleProductCard;

