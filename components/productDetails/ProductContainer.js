import { mycn } from '@/utils/mycn';
import React, { useContext, useState } from 'react'
import Button from '../UI/elements/Button';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';
import InfoAlert from '../UI/elements/InfoAlert';
import WarningAlert from '../UI/elements/WarningAlert';

export default function ProductContainer(props) {
    const { product, resultSizes } = props;
    const { productID, productName, imagePath, description, category, subcategory, brand, price, productDetail } = product;

    const [selectedSize, setSelectedSize] = useState(resultSizes.length > 0 ? resultSizes[0] : null)
    const [amount, setAmount] = useState(1)
    const { userId } = useContext(UserContext);

    const queryClient = useQueryClient();


    const { mutate: addToCart, isPending, error: submitError } = useMutation({
        mutationFn: async (body) => {
            const url = "http://localhost:5059/api/cart";
            const method = "POST";
            const response = await axios({
                url: url,
                method,
                data: body,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product added to cart");
            queryClient.invalidateQueries({ queryKey: ["carts"] });

        },
        onError: (error) => {
            console.log(error);
            toast.error("Product can not added to cart")
        },
    });

    const addCartHandler = () => {
        //!BURDA AUTH İŞLEMİ YAPILCAK
        if (!userId) { toast.error("Please login first"); return; }

        if (!selectedSize) { toast.error("Please select a size"); return; }


        const body = {
            productID,
            size: selectedSize,
            amount,
            status: "Checkout",
            userID: userId
        }



        addToCart(body);
    }


    return (
        <div className='flex justify-center items-start mt-4 gap-3'>
            <div className='w-1/2'>

                <img
                    src={imagePath}

                    alt="Product Image"
                    loading="lazy"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className='w-1/2'>
                <h1 className='text-2xl font-semibold text-gray-800'>{productName}</h1>
                <h2 className='text-xl text-gray-500 mt-1'>
                    <span className=''> {brand} </span>
                    <span className=''> - </span>
                    <span className=''> {productID}</span>
                </h2>
                <h1 className='text-3xl font-semibold my-8'>{price} TL</h1>

                {resultSizes.length > 0 ?
                    (<>
                        <div className='flex items-center justify-start gap-1 flex-wrap'>
                            {resultSizes.map((size, index) => {
                                return <button key={index} onClick={() => setSelectedSize(size)}
                                    className={mycn("py-1 px-2 rounded w-12", {
                                        'text-gray-500 border border-gray-500 ': selectedSize !== size,
                                        'text-white bg-primary border border-sky-700': selectedSize === size,
                                    })}>{size}</button>
                            })}

                        </div>

                        <div className='mt-12'>
                            <Button styles="w-full" onClick={addCartHandler} disabled={isPending}> Add to Cart</Button>
                        </div></>)
                    : <InfoAlert message="We currently do not have this product"></InfoAlert>}



                <div className='mt-8'>
                    <p className='text-gray-500 font-medium text-xl'>Details</p>
                    <p className='text-gray-800 mt-1'>{productDetail}</p>
                </div>


            </div>

        </div >
    )
}

