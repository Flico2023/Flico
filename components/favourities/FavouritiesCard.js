/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { forwardRef } from "react";
import Button from "../UI/elements/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const FavouritiesCard = (props) => {
    const { brand, imagePath, productName, price, productID } = props.fav;
    const id = props.id;
    const queryClient = useQueryClient();

    const { mutate: deleteFav, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`http://localhost:5059/api/favourities/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['favourities']});
            toast.success('Product removed from favourities');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    });

    const handleRemoveFromFavourities = () => {
        deleteFav();
    }


    return (
        <article>
            <Link href={`/products/details/${productID}`}>
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
                    <p className=" text-2xl text-primary font-semibold">
                        <span className="text-lg mr-1">$</span>
                        {price}
                    </p>
                </div>
                <div>
                </div>
            </Link>
            <Button variant="text" styles="w-full" onClick={handleRemoveFromFavourities} disabled={isPending}>
                Remove from favourities
            </Button>
        </article>
    );
}



export default FavouritiesCard;

